import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";

import { theme } from "../../styles/theme";

const PostCardWrapper = styled.div`
    padding: 3% 0;
    margin-top: 3%;
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
    color: ${theme.colors.grey.$900};

    &:hover {
        color: ${theme.colors.green.$700};
    }
`;

const PostCardDescription = styled.p`
    color: ${theme.colors.grey.$700};
    margin-top: 4px;
`;

const PostCardDate = styled.p`
    color: ${theme.colors.grey.$500};
    margin-top: 8px;
`;

const PostCard = ({ post }) => {
    const { slug, title, description, date } = post;

    return (
        <PostCardWrapper>
            <PostCardTitle to={slug}>{title}</PostCardTitle>
            <PostCardDescription>{description}</PostCardDescription>
            <PostCardDate>{date}</PostCardDate>
        </PostCardWrapper>
    );
};

export default PostCard;
