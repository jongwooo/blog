import * as React from "react";
import Giscus from "@giscus/react";
import { GISCUS_CONFIG } from "../../config/giscus";
import ThemeContext from "../../stores/themeContext";
import "./style.scss";

const PostComment = () => {
    const theme = React.useContext(ThemeContext);

    return (
        <div className="post-comment-wrapper">
            <Giscus {...GISCUS_CONFIG} theme={theme} />
        </div>
    );
};

export default PostComment;
