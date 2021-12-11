import * as React from "react"
import { graphql } from "gatsby"

import Post from "../models/post"
import Layout from "../layout"
import Seo from "../components/seo"
import PostNavigator from "../components/post-navigator"

const PostTemplate = ({ data }) => {
    const currentPost = new Post(data.current)
    const previousPost = data.previous && new Post(data.previous)
    const nextPost = data.next && new Post(data.next)

    return (
        <Layout>
            <Seo title={currentPost?.title} description={currentPost?.description} />
            <h2>{currentPost.title}</h2>
            <p>{currentPost.date}</p>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: currentPost.html }} />
            <PostNavigator previousPost={previousPost} nextPost={nextPost} />
        </Layout>
    )
}

export default PostTemplate

export const pageQuery = graphql`
    query ($slug: String, $previousSlug: String, $nextSlug: String) {
        current: markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            frontmatter {
                date(formatString: "YYYY년 MM월 DD일")
                title
                description
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
