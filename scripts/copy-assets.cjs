const fs = require('fs')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

// 복사할 디렉토리 생성
const stylesDir = path.join(distDir, 'styles')
const fontsDir = path.join(distDir, 'assets', 'fonts')

fs.mkdirSync(stylesDir, { recursive: true })
fs.mkdirSync(fontsDir, { recursive: true })

// CSS 복사
fs.copyFileSync(
  path.join(rootDir, 'src', 'styles', 'globals.css'),
  path.join(stylesDir, 'globals.css')
)
console.log('✓ Copied globals.css')

fs.copyFileSync(
  path.join(rootDir, 'src', 'styles', 'tokens.css'),
  path.join(stylesDir, 'tokens.css')
)
console.log('✓ Copied tokens.css')

// 폰트 복사
fs.copyFileSync(
  path.join(rootDir, 'src', 'assets', 'fonts', 'STLgothicR.woff2'),
  path.join(fontsDir, 'STLgothicR.woff2')
)
console.log('✓ Copied STLgothicR.woff2')

console.log('✓ Assets copied to dist/')
