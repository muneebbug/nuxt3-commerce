import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'


const MyTheme = {
    colors: {
        primary: '#baf67c',
        foreground: {
            DEFAULT: "#28282A",
            dark: "#fff",
        },
        background: {
            DEFAULT: "#f1f1f1",
            dark: colors.gray[900],
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
                5: '5px',
                10: '10px',
                20: '20px',
            }
        },
    },
}
