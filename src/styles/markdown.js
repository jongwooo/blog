import styled from "@emotion/styled";
import { lightTheme } from "./theme";

const StyledMarkdown = styled.div`
    & {
        font-size: 1.125rem;
        color: ${lightTheme.fontColor};
        line-height: 1.7;
        overflow: hidden;
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
        font-weight: 700;
        margin-top: 1.75rem;
        margin-bottom: 1rem;
    }

    & h1,
    & h2 {
        font-size: 1.5rem;
    }

    & h3,
    & h4,
    & h5,
    & h6 {
        font-size: 1.25rem;
    }

    @media (max-width: 700px) {
        & {
            font-size: 1rem;
        }

        & h1,
        & h2,
        & h3,
        & h4,
        & h5,
        & h6 {
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
        }

        & h1,
        & h2 {
            font-size: 1.25rem;
        }

        & h3,
        & h4,
        & h5,
        & h6 {
            font-size: 1.125rem;
        }
    }

    & a {
        text-decoration: none;
        color: ${lightTheme.primaryColor};
    }

    & a:hover {
        text-decoration: underline;
    }

    & strong {
        font-weight: 700;
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
        padding: 0 0.5rem;
        color: ${lightTheme.mutedFontColor};
        margin: 0 0.3rem;
        border-left: 4px solid ${lightTheme.borderColor};
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
        border-color: ${lightTheme.primaryColor};
    }

    & table {
        display: block;
        max-width: fit-content;
        margin: 0 auto;
        overflow-x: auto;
        white-space: nowrap;
    }

    & img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 100%;
    }

    & figcaption {
        color: ${lightTheme.mutedFontColor};
        font-size: 0.875rem;
        text-align: center;
    }

    & hr {
        width: 75%;
        margin: 32px auto;
        height: 0;
        border: 0;
        border-top: thin solid ${lightTheme.borderColor};
    }
`;

export default StyledMarkdown;
