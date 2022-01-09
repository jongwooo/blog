import * as React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Post from "../models/post"
import Layout from "../layout"
import Seo from "../components/seo"
import PostHeader from "../components/post-header"
import PostNavigator from "../components/post-navigator"
import ProfileCard from "../components/profile-card"
import Utterances from "../components/utterances"
import useSiteMetaData from "../hooks/useSiteMetaData"
import StyledMarkdown from "../styles/markdown"
import { theme } from "../styles/theme"

const Divider = styled.hr`
    width: 75%;
    margin: ${theme.sizes.$7} auto;
    height: 0;
    border: 0;
    border-top: thin solid ${theme.colors.greyOpacity.$400};
`

const PostTemplate = ({ data }) => {
    const currentPost = new Post(data.current)
    const previousPost = data.previous && new Post(data.previous)
    const nextPost = data.next && new Post(data.next)

    const { repo } = useSiteMetaData()

    return (
        <Layout>
            <Seo title={currentPost?.title} description={currentPost?.excerpt} />
            <PostHeader title={currentPost?.title} date={currentPost?.date} />
            <StyledMarkdown dangerouslySetInnerHTML={{ __html: currentPost.html }} />
            <Divider />
            <ProfileCard />
            <PostNavigator previousPost={previousPost} nextPost={nextPost} />
            <Utterances repo={repo} />
        </Layout>
    )
}

export default PostTemplate

export const pageQuery = graphql`
    query ($slug: String, $previousSlug: String, $nextSlug: String) {
        current: markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            excerpt(pruneLength: 200, truncate: true)
            frontmatter {
                date(formatString: "YYYY년 MM월 DD일")
                title
            }
            fields {
                slug
            }
        }
        previous: markdownRemark(fields: { slug: { eq: $previousSlug } }) {
            id
            frontmatter {
                title
            }
            fields {
                slug
            }
        }
        next: markdownRemark(fields: { slug: { eq: $nextSlug } }) {
            id
            frontmatter {
                title
            }
            fields {
                slug
            }
        }
    }
`
