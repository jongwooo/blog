import { createGlobalStyle } from "styled-components"
import { reset } from "styled-reset"

import { theme } from "./theme"

const GlobalStyles = createGlobalStyle` 
    ${reset}
    
    body {
      font-family: ${theme.fonts.family};
      background-color: white;
    }
`

export default GlobalStyles
