import * as React from "react"
import { Link } from "gatsby"

import "./style.scss"

const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            <Link to={post.slug}>
                <h4>{post.title}</h4>
                <p className="post-card-excerpt">{post.excerpt}</p>
                <p className="post-card-date">{post.date}</p>
            </Link>
        </div>
    )
}

export default PostCard
