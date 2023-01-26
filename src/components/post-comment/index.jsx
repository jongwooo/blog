import * as React from "react";
import Giscus from "@giscus/react";
import useSiteMetaData from "../../hooks/useSiteMetaData";
import ThemeContext from "../../stores/themeContext";
import "./style.scss";

const PostComment = () => {
  const theme = React.useContext(ThemeContext);
  const { giscusConfig } = useSiteMetaData();

  return (
    <div className="post-comment-wrapper">
      <Giscus {...giscusConfig} theme={theme} />
    </div>
  );
};

export default PostComment;
