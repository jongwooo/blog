import * as React from "react";
import { VscGithubInverted } from "react-icons/vsc";
import styled from "@emotion/styled";

import { lightTheme } from "../../styles/theme";
import useSiteMetaData from "../../hooks/useSiteMetaData";

const ProfileCardWrapper = styled.div`
    padding: 16px 0;
    line-height: 1.4;
`;

const Author = styled.h1`
    font-size: 1rem;
    font-weight: 700;
    color: ${lightTheme.primaryColor};
    margin-bottom: 16px;
`;

const Greetings = styled.p`
    margin: 0 0 16px;
    color: ${lightTheme.fontColor};
    word-break: keep-all;
    overflow-wrap: break-word;
`;

const SocialLink = styled.a`
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    color: ${lightTheme.primaryColor};
    text-decoration: none;

    > svg {
        margin: 0 8px 0 0;
    }

    &:hover {
        text-decoration: underline;
    }
`;

const ProfileCard = () => {
    const { author, greetings, githubUrl } = useSiteMetaData();

    return (
        <ProfileCardWrapper>
            <Author>{author}</Author>
            <Greetings>{greetings}</Greetings>
            {githubUrl && (
                <SocialLink href={githubUrl}>
                    <VscGithubInverted />
                    깃허브
                </SocialLink>
            )}
        </ProfileCardWrapper>
    );
};

export default ProfileCard;
