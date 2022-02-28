import { css } from "@emotion/react"
import emotionReset from "emotion-reset"

import { theme } from "./theme"

const reset = css`
    ${emotionReset}

    html {
      width: 100%;
      height: 100%;
    }

    body {
        font-family: ${theme.fonts.family};
    }
`

export default reset
