import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'


const MyTheme = {
    colors: {
        primary: '#baf67c',
        foreground: {
            DEFAULT: "#28282A",
            dark: "#fff",
            200: "rgba(40, 40, 42, 0.2)",
        },
        background: {
            DEFAULT: "#ffffff",
            dark: colors.gray[900],
            secondary: 'rgba(241, 241, 241, 1)',
        }
    },
}

export default <Partial<Config>>{
    darkMode: 'class',
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './composables/**/*.{js,ts}',
        './plugins/**/*.{js,ts}',
        './App.{js,ts,vue}',
        './app.{js,ts,vue}',
        './Error.{js,ts,vue}',
        './error.{js,ts,vue}',
    ],
    theme: {
        extend: {
            colors: MyTheme.colors,
            fontFamily: {
                sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
                body: ['DM Sans', ...defaultTheme.fontFamily.sans],
                heading: ['Oswald', ...defaultTheme.fontFamily.sans],

            },
            borderRadius: {
                small: '5px',
                medium: '10px',
                large: '20px',
            },
            spacing: {
                'horizontal': '3rem',
                'vertical': '3rem',
                'mobile-horizontal': '1.5rem',
                'mobile-vertical': '1.5rem',
            },
        },
    },
}
