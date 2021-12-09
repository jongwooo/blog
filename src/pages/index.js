import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../layout"
import Seo from "../components/seo"

const LatestPostListQuery = graphql`
    query LatestPostListQuery {
        allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
            edges {
                node {
                    excerpt(truncate: true, pruneLength: 200)
                    frontmatter {
                        date(formatString: "YYYY-MM-DD HH:mm:ss")
                        title
                        description
                        path
                    }
                    id
                }
            }
        }
    }
`

const IndexPage = () => {
    const data = useStaticQuery(LatestPostListQuery)

    return (
        <Layout>
            <Seo title="Home" />
            <ul>
                {data["allMarkdownRemark"].edges.map(({ node }) => (
                    <li key={node.id}>
                        <h2>
                            <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
                        </h2>
                        <h3>{node.frontmatter.date}</h3>
                        <p>{node.frontmatter.description}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export default IndexPage
