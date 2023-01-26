import * as React from "react";
import { Link } from "gatsby";
import "./style.scss";

const PostNavigator = ({ previousPost, nextPost }) => {
  return (
    <div className="post-nav-wrapper">
      {previousPost && (
        <Link className="post-nav previous-card" to={previousPost.slug}>
          <span className="post-nav-label">이전 글</span>
          <p className="post-nav-title">{previousPost.title}</p>
        </Link>
      )}
      {nextPost && (
        <Link className="post-nav next-card" to={nextPost.slug}>
          <span className="post-nav-label">다음 글</span>
          <p className="post-nav-title">{nextPost.title}</p>
        </Link>
      )}
    </div>
  );
};

export default PostNavigator;
