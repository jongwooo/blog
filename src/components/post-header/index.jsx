import * as React from "react"
import "./style.scss"

const PostHeader = ({ title, date }) => {
    return (
        <div className="post-header-wrapper">
            <h2 className="post-header-title">{title}</h2>
            <p className="post-header-date">{date}</p>
        </div>
    )
}

export default PostHeader
