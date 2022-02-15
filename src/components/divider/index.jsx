import styled from "@emotion/styled"
import { theme } from "../../styles/theme"

const Divider = styled.hr`
    width: 75%;
    margin: ${theme.sizes.$7} auto;
    height: 0;
    border: 0;
    border-top: thin solid ${theme.colors.greyOpacity.$400};
`

export default Divider
