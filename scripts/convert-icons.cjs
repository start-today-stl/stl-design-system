const fs = require('fs')
const path = require('path')

const iconsDir = path.join(__dirname, '../src/icons')
const icons32Dir = path.join(__dirname, '../src/icons/32x32')
const outputDir = path.join(__dirname, '../src/icons/components')

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Get all SVG files from 24x24 (root)
const svgFiles24 = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'))

// Get all SVG files from 32x32
const svgFiles32 = fs.existsSync(icons32Dir)
  ? fs.readdirSync(icons32Dir).filter(f => f.endsWith('.svg'))
  : []

// Convert filename to component name
function toComponentName(filename) {
  return filename
    .replace('.svg', '')
    .replace(/-/g, '_')
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
    + 'Icon'
}

// Extract paths from SVG content
function extractPaths(svgContent) {
  const pathMatches = svgContent.match(/<path[^>]+>/g) || []
  return pathMatches.map(p => {
    return p.replace(/fill="[^"]*"/, 'fill="currentColor"')
  }).join('\n        ')
}

// Check if it's a Main icon (100x100 fixed size)
function isMainIcon(filename) {
  return filename.startsWith('Main_')
}

// Convert SVG to React component with dual size support
function convertSvgToComponent(svgContent, svg32Content, componentName, isMain = false) {
  const paths = extractPaths(svgContent)
  const paths32 = svg32Content ? extractPaths(svg32Content) : null

  // Main 아이콘: 100x100 고정
  if (isMain) {
    return `import type { IconProps } from '../types'

// 메인 화면 전용 아이콘 (100x100 고정)
export function ${componentName}({ size = 100, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      ${paths}
    </svg>
  )
}
`
  }

  if (paths32) {
    // Dual size component
    return `import type { IconProps } from '../types'

export function ${componentName}({ size = 24, className, ...props }: IconProps) {
  // 24 이하: 24x24 아이콘 사용, 24 초과: 32x32 아이콘 사용
  const useSmall = size <= 24

  if (useSmall) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        ${paths}
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      ${paths32}
    </svg>
  )
}
`
  } else {
    // Single size component (24x24 only)
    return `import type { IconProps } from '../types'

export function ${componentName}({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      ${paths}
    </svg>
  )
}
`
  }
}

// Build a map of 32x32 files by normalized name
const svg32Map = {}
svgFiles32.forEach(file => {
  const baseName = file.replace('.svg', '').toLowerCase().replace(/-/g, '_')
  svg32Map[baseName] = file
})

// Process each 24x24 SVG file
const iconExports = []

let mainIconCount = 0

svgFiles24.forEach(file => {
  const svgPath = path.join(iconsDir, file)
  const svgContent = fs.readFileSync(svgPath, 'utf-8')
  const componentName = toComponentName(file)
  const isMain = isMainIcon(file)

  if (isMain) {
    // Main 아이콘: 100x100 고정
    const componentContent = convertSvgToComponent(svgContent, null, componentName, true)
    const outputPath = path.join(outputDir, `${componentName}.tsx`)

    fs.writeFileSync(outputPath, componentContent)
    iconExports.push(`export { ${componentName} } from './components/${componentName}'`)
    mainIconCount++
    console.log(`✓ ${file} → ${componentName}.tsx (100x100 fixed)`)
  } else {
    // 일반 아이콘: 24x24 + 32x32
    const baseName = file.replace('.svg', '').toLowerCase().replace(/-/g, '_')
    const matching32File = svg32Map[baseName]

    let svg32Content = null
    if (matching32File) {
      const svg32Path = path.join(icons32Dir, matching32File)
      svg32Content = fs.readFileSync(svg32Path, 'utf-8')
    }

    const componentContent = convertSvgToComponent(svgContent, svg32Content, componentName, false)
    const outputPath = path.join(outputDir, `${componentName}.tsx`)

    fs.writeFileSync(outputPath, componentContent)
    iconExports.push(`export { ${componentName} } from './components/${componentName}'`)

    const sizeInfo = svg32Content ? '24+32' : '24 only'
    console.log(`✓ ${file} → ${componentName}.tsx (${sizeInfo})`)
  }
})

// Create index.ts
const indexContent = `// Auto-generated icon exports
export type { IconProps } from './types'

${iconExports.join('\n')}
`

fs.writeFileSync(path.join(iconsDir, 'index.ts'), indexContent)
console.log('\n✓ Updated index.ts')
console.log(`\nConverted ${svgFiles24.length} icons!`)
console.log(`  - Main icons (100x100): ${mainIconCount}`)
console.log(`  - With 32x32 variant: ${Object.keys(svg32Map).length}`)
console.log(`  - 24x24 only: ${svgFiles24.length - Object.keys(svg32Map).length - mainIconCount}`)
