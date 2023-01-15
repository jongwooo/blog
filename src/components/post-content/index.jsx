import React from "react";
import "./style.scss";

const PostContent = ({ html }) => <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />;

export default PostContent;
