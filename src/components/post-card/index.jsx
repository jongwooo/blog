import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";

import { lightTheme } from "../../styles/theme";

const PostCardWrapper = styled.div`
    padding: 3% 0;
    line-height: 1.6;
    word-break: keep-all;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
`;

const PostCardTitle = styled(Link)`
    overflow: hidden;
    font-size: 1.125rem;
    font-weight: 700;
    text-decoration: none;
    transition: color 0.3s ease;
    color: ${lightTheme.fontColor};

    &:hover {
        color: ${lightTheme.primaryColor};
    }
`;

const PostCardDate = styled.p`
    color: ${lightTheme.mutedFontColor};
    margin-top: 4px;
`;

const PostCardExcerpt = styled.p`
    color: ${lightTheme.fontColor};
    margin-top: 8px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

const PostCard = ({ post }) => {
    const { slug, title, excerpt, date } = post;

    return (
        <PostCardWrapper>
            <PostCardTitle to={slug}>{title}</PostCardTitle>
            <PostCardDate>{date}</PostCardDate>
            <PostCardExcerpt>{excerpt}</PostCardExcerpt>
        </PostCardWrapper>
    );
};

export default PostCard;
