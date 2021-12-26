import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Post from "../models/post"
import Layout from "../layout"
import PostCard from "../components/post-card"
import Seo from "../components/seo"
import ProfileCard from "../components/profile-card"

const pageQuery = graphql`
    query pageQuery {
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
            }
        }
    }
`

const IndexPage = () => {
    const data = useStaticQuery(pageQuery)

    const posts = data.allMarkdownRemark.edges.map(({ node }) => new Post(node))
    const defaultTitle = data.site.siteMetadata.title

    return (
        <Layout>
            <Seo title={defaultTitle} />
            <ProfileCard />
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </Layout>
    )
}

export default IndexPage