import { createGlobalStyle } from "styled-components"
import { reset } from "styled-reset"

import { theme } from "./theme"

const GlobalStyles = createGlobalStyle` 
    ${reset}
    
    body {
      font-family: ${theme.fonts.family};
      background-color: ${theme.colors.white};
    }

    * ::selection {
      background: ${theme.colors.green.$400};
      color: #fff;
    }
`

export default GlobalStyles
