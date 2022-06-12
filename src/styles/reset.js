import { css } from "@emotion/react"
import { theme } from "./theme"
import emotionReset from "emotion-reset"

const reset = css`
    ${emotionReset}

    html {
        width: 100%;
        height: 100%;
    }

    body {
        background-color: ${theme.colors.white};
        font-family: -apple-system, BlinkMacSystemFont, Bazier Square, Noto Sans KR, Segoe UI, Apple SD Gothic Neo,
            Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
            Noto Color Emoji;
    }
`

export default reset
