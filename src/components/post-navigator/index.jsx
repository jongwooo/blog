import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";

import { lightTheme } from "../../styles/theme";

const PostNavWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 32px 0;
`;

const PostNav = styled(Link)`
    flex: 0 0 calc(50% - 0.5rem);
    padding: 16px;
    box-sizing: border-box;
    text-decoration: none;
    line-height: 1.4;
    border-radius: 1px;

    &:hover {
        background-color: ${lightTheme.postCardColor};
    }
`;

const PreviousCard = styled(PostNav)`
    margin-right: auto;
`;

const NextCard = styled(PostNav)`
    margin-left: auto;
    text-align: right;
`;

const Label = styled.span`
    font-size: 0.875rem;
    color: ${lightTheme.mutedFontColor};
`;

const PostTitle = styled.p`
    font-weight: 700;
    color: ${lightTheme.fontColor};
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;

const PostNavigator = ({ previousPost, nextPost }) => {
    return (
        <PostNavWrapper>
            {previousPost && (
                <PreviousCard to={previousPost.slug}>
                    <Label>이전 글</Label>
                    <PostTitle>{previousPost.title}</PostTitle>
                </PreviousCard>
            )}
            {nextPost && (
                <NextCard to={nextPost.slug}>
                    <Label>다음 글</Label>
                    <PostTitle>{nextPost.title}</PostTitle>
                </NextCard>
            )}
        </PostNavWrapper>
    );
};

export default PostNavigator;
