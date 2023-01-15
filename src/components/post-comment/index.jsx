import * as React from "react";
import Giscus from "@giscus/react";
import "./style.scss";

import { GISCUS_CONFIG } from "../../config/giscus";

const PostComment = () => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    return <Giscus {...GISCUS_CONFIG} theme={"light"} />;
};

export default PostComment;
