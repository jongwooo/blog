import * as React from "react"
import { Link } from "gatsby"

import "./style.scss"

const PostCard = ({ post }) => {
    return (
        <li className="post-card" key={post.id}>
            <Link to={post.slug}>
                <h4>{post.title}</h4>
                <p className="post-card-description">{post.description}</p>
                <p className="post-card-date">{post.date}</p>
            </Link>
        </li>
    )
}

export default PostCard
