import React from "react"
import Layout from "../layout"
import Seo from "../components/seo"

const PostTemplate = React.memo(props => {
    const { title, date, html } = props["pageContext"]
    return (
        <Layout>
            <Seo title={title} />
            <h2>{title}</h2>
            <h4>{date}</h4>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </Layout>
    )
})

PostTemplate.displayName = "PostTemplate"

export default PostTemplate
