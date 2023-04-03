import * as React from "react";
import { Link } from "gatsby";
import "./style.scss";

const PostCard = ({ post }) => {
  const { slug, title, excerpt, date } = post;

  return (
    <div className="post-card-wrapper">
      <label className="post-card-title">{title}</label>
      <p className="post-card-date">{date}</p>
      <p className="post-card-excerpt">{excerpt}</p>
      <Link className="post-card-link" aria-label={title} to={slug} />
    </div>
  );
};

export default PostCard;
