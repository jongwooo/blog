import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Post from "../models/post"
import Layout from "../layout"
import PostCard from "../components/post-card"
import Seo from "../components/seo"

const LatestPostListQuery = graphql`
    query LatestPostListQuery {
        allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
            edges {
                node {
                    id
                    frontmatter {
                        date(formatString: "YYYY년 MM월 DD일")
                        title
                        description
                    }
                    fields {
                        slug
                    }
                }
            }
        }

        site {
            siteMetadata {
                title
                description
            }
        }
    }
`

const IndexPage = () => {
    const data = useStaticQuery(LatestPostListQuery)

    const posts = data.allMarkdownRemark.edges.map(({ node }) => new Post(node))
    const defaultTitle = data.site.siteMetadata.title

    return (
        <Layout>
            <Seo title={defaultTitle} />
            <ul>
                {posts.map(post => (
                    <PostCard post={post} />
                ))}
            </ul>
        </Layout>
    )
}

export default IndexPage
