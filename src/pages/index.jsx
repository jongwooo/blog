import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Post from "../models/post";
import Layout from "../layout";
import PostCard from "../components/post-card";
import ProfileCard from "../components/profile-card";
import Seo from "../components/seo";
import useSiteMetaData from "../hooks/useSiteMetaData";

const IndexPage = () => {
    const data = useStaticQuery(pageQuery);
    const posts = data[`allMarkdownRemark`].edges.map(({ node }) => new Post(node));

    return (
        <Layout>
            <ProfileCard />
            {React.Children.toArray(posts.map(post => <PostCard post={post} />))}
        </Layout>
    );
};

export const Head = () => {
    const { siteTitle, siteDescription } = useSiteMetaData();
    return <Seo title={siteTitle} description={siteDescription} />;
};

export default IndexPage;

export const pageQuery = graphql`
    query pageQuery {
        allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 120, truncate: true)
                    frontmatter {
                        date(formatString: "YYYY년 MM월 DD일")
                        title
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;
