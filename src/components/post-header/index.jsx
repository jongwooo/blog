import * as React from "react";
import styled from "@emotion/styled";

import { lightTheme } from "../../styles/theme";

const PostHeaderWrapper = styled.div`
    padding: 24px 0;
    width: 100%;
`;

const PostHeaderTitle = styled.h1`
    margin-bottom: 16px;
    color: ${lightTheme.fontColor};
    font-size: 2rem;
    font-weight: 700;
    word-break: keep-all;
`;

const PostHeaderDate = styled.p`
    color: ${lightTheme.mutedFontColor};
    font-size: 1rem;
    font-weight: 400;
`;

const PostHeader = ({ title, date }) => {
    return (
        <PostHeaderWrapper>
            <PostHeaderTitle>{title}</PostHeaderTitle>
            <PostHeaderDate>{date}</PostHeaderDate>
        </PostHeaderWrapper>
    );
};

export default PostHeader;
