import { createGlobalStyle } from "styled-components"
import { reset } from "styled-reset"

import { theme } from "./theme"

const GlobalStyles = createGlobalStyle` 
    ${reset}
    
    body {
      font-family: ${theme.fonts.family};
    }

    * ::selection {
      background: ${theme.colors.green.$400};
      color: ${theme.colors.white};
    }
`

export default GlobalStyles
