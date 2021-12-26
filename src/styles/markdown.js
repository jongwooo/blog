import styled from "styled-components"
import { theme } from "./theme"

const StyledMarkdown = styled.div`
    & {
        font-size: 1rem;
        color: ${theme.colors.grey.$900};
        line-height: 1.6;
        word-break: break-word;
        overflow: hidden;
        margin-bottom: ${theme.sizes.$8};
    }

    & p {
        margin: 0.75rem 0.3rem;
    }

    & h1,
    & h2,
    & h3,
    & h4,
    & h5,
    & h6 {
        font-weight: ${theme.fonts.weight.bold};
    }

    & h1,
    & h2 {
        font-size: 1.25rem;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }

    & h3,
    & h4,
    & h5,
    & h6 {
        font-size: ${theme.fonts.size.base};
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }

    @media (max-width: ${theme.sizes.container}) {
        & h1,
        & h2 {
            font-size: ${theme.fonts.size.xl};
        }

        & h3,
        & h4,
        & h5,
        & h6 {
            font-size: ${theme.fonts.size.lg};
        }
    }

    & a {
        text-decoration: none;
        color: ${theme.colors.green.$500};
    }

    & a:hover {
        text-decoration: underline;
    }

    & strong {
        font-weight: ${theme.fonts.weight.bold};
    }

    & em {
        font-style: italic;
    }

    & ul,
    & ol {
        margin: 0.3rem 0.3rem 0.3rem 2rem;
    }

    & li > p,
    & li > ul,
    & li > ol {
        margin-bottom: 0;
    }

    & ol {
        list-style-type: decimal;
    }

    & ul {
        list-style-type: disc;
    }

    & blockquote {
        padding: 0.5rem;
        background-color: ${theme.colors.grey.$100};
        margin: 0.5rem 0.3rem;
        border-left: 4px solid ${theme.colors.green.$500};
    }

    & blockquote > p {
        margin: 0.5rem;
    }

    & blockquote > h1,
    & blockquote > h2,
    & blockquote > h3,
    & blockquote > h4,
    & blockquote > h5 {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    & td,
    & th {
        padding: 0.25rem 0.5rem;
        border-width: 1px;
        border-color: ${theme.colors.green.$500};
    }

    & tr:nth-of-type(even) {
        background-color: ${theme.colors.grey.$100};
    }

    & th {
        background-color: ${theme.colors.grey.$100};
    }

    & table {
        display: block;
        max-width: fit-content;
        margin: 0 auto;
        overflow-x: auto;
        white-space: nowrap;
    }

    & code[class*="language-"],
    & pre[class*="language-"] {
        display: block;
        padding: ${theme.sizes.$6};
        white-space: pre;
        -webkit-overflow-scrolling: touch;
        overflow-x: scroll;
        max-width: 100%;
        min-width: 100px;
        background-color: ${theme.colors.grey.$100};
    }

    & p > code,
    & li > code {
        padding: 0.1rem 0.25rem;
        border-radius: 0.25rem;
        color: ${theme.colors.green.$500};
        background-color: ${theme.colors.grey.$100};
        white-space: pre-line;
    }

    & img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 100%;
    }

    & hr {
        border: none;
        border-bottom: 1px solid ${theme.colors.grey.$300};
    }
`

export default StyledMarkdown
