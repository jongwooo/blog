import styled from "@emotion/styled";
import { lightTheme } from "../../styles/theme";

const Divider = styled.hr`
    width: 75%;
    margin: 32px auto;
    height: 0;
    border: 0;
    border-top: thin solid ${lightTheme.borderColor};
`;

export default Divider;
