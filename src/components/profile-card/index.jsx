import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { VscGithubInverted } from "react-icons/vsc"
import styled from "styled-components"
import { theme } from "../../styles/theme"

const ProfileCardWrapper = styled.div`
    padding: ${theme.sizes.$5} 0;
    line-height: 1.4;
`

const Author = styled.h1`
    font-size: ${theme.fonts.size.sm};
    font-weight: ${theme.fonts.weight.bold};
    color: ${theme.colors.green.$700};
    margin-bottom: ${theme.sizes.$5};
`

const Description = styled.p`
    margin: 0 0 ${theme.sizes.$5};
    color: ${theme.colors.grey.$900};
    word-break: keep-all;
    overflow-wrap: break-word;
`

const SocialLink = styled.a`
    font-size: ${theme.fonts.size.sm};
    display: inline-flex;
    align-items: center;
    color: ${theme.colors.green.$700};
    text-decoration: none;

    > svg {
        margin: 0 ${theme.sizes.$4} 0 0;
    }

    & :hover {
        text-decoration: underline;
    }
`

const ProfileCard = () => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        author
                        description
                        githubUrl
                    }
                }
            }
        `,
    )

    return (
        <ProfileCardWrapper>
            <Author>{site.siteMetadata.author}</Author>
            <Description>{site.siteMetadata.description}</Description>
            {site.siteMetadata.githubUrl && (
                <SocialLink href={site.siteMetadata.githubUrl}>
                    <VscGithubInverted />
                    깃허브
                </SocialLink>
            )}
        </ProfileCardWrapper>
    )
}

export default ProfileCard
