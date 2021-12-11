import * as React from "react"
import { Link } from "gatsby"

const PostCard = ({ post }) => {
    return (
        <li key={post.id}>
            <h2>
                <Link to={post.slug}>{post.title}</Link>
            </h2>
            <p>{post.date}</p>
            <p>{post.excerpt}</p>
            <hr />
        </li>
    )
}

export default PostCard
