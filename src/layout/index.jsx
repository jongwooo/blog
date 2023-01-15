import * as React from "react";
import PageHeader from "../components/page-header";
import useSiteMetaData from "../hooks/useSiteMetaData";
import "./style.scss";

const Layout = ({ children }) => {
    const { siteTitle } = useSiteMetaData();

    return (
        <>
            <PageHeader siteTitle={siteTitle} />
            <div className="content">
                <main>{children}</main>
            </div>
        </>
    );
};

export default Layout;
