import * as React from "react";
import { graphql } from "gatsby";

import Post from "../models/post";
import Layout from "../layout";
import Seo from "../components/seo";
import PostHeader from "../components/post-header";
import PostNavigator from "../components/post-navigator";
import ProfileCard from "../components/profile-card";
import Divider from "../components/divider";
import Utterances from "../components/utterances";
import useSiteMetaData from "../hooks/useSiteMetaData";
import StyledMarkdown from "../styles/markdown";

const PostTemplate = ({ data }) => {
    const currentPost = new Post(data.current);
    const previousPost = data.previous && new Post(data.previous);
    const nextPost = data.next && new Post(data.next);

    const { repo } = useSiteMetaData();

    return (
        <Layout>
            <PostHeader title={currentPost?.title} date={currentPost?.date} />
            <StyledMarkdown dangerouslySetInnerHTML={{ __html: currentPost.html }} />
            <Divider />
            <ProfileCard />
            <PostNavigator previousPost={previousPost} nextPost={nextPost} />
            <Utterances repo={repo} />
        </Layout>
    );
};

export const Head = ({ data }) => {
    const currentPost = new Post(data.current);
    return <Seo title={currentPost?.title} description={currentPost?.excerpt} keywords={currentPost?.keywords} />;
};

export default PostTemplate;

export const pageQuery = graphql`
    query ($slug: String, $previousSlug: String, $nextSlug: String) {
        current: markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            excerpt(pruneLength: 200, truncate: true)
            frontmatter {
                date(formatString: "YYYY년 MM월 DD일")
                title
                keywords
            }
            fields {
                slug
            }
        }
        previous: markdownRemark(fields: { slug: { eq: $previousSlug } }) {
            id
            frontmatter {
                title
            }
            fields {
                slug
            }
        }
        next: markdownRemark(fields: { slug: { eq: $nextSlug } }) {
            id
            frontmatter {
                title
            }
            fields {
                slug
            }
        }
    }
`;
