import * as React from "react"

import { Link } from "gatsby"

const PostNavigator = ({ previousPost, nextPost }) => {
    return (
        <div>
            <div>
                {previousPost && (
                    <Link key={previousPost.id} to={previousPost.slug}>
                        <div>이전 글</div>
                        <div>{previousPost.title}</div>
                    </Link>
                )}
            </div>
            <div>
                {nextPost && (
                    <Link key={nextPost.id} to={nextPost.slug}>
                        <div>다음 글</div>
                        <div>{nextPost.title}</div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default PostNavigator
