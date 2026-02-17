import type { Preview } from '@storybook/react-vite'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Components', 'Patterns', 'Layout', 'Dashboard', '*'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f4f6f8' },
        { name: 'dark', value: '#1b2026' },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light'
      const isDark = theme === 'dark'

      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', isDark)

        // Storybook docs 캔버스 배경색 설정
        const docsStory = document.querySelector('.docs-story') as HTMLElement
        if (docsStory) {
          docsStory.style.backgroundColor = isDark ? '#1b2026' : '#f4f6f8'
        }

        // Storybook 메인 캔버스 배경색 설정
        const sbMain = document.querySelector('.sb-show-main') as HTMLElement
        if (sbMain) {
          sbMain.style.backgroundColor = isDark ? '#1b2026' : '#f4f6f8'
        }
      }

      return Story()
    },
  ],
}

export default preview
