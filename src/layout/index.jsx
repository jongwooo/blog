import * as React from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
import PageHeader from "../components/page-header";
import useSiteMetaData from "../hooks/useSiteMetaData";
import ThemeContext from "../stores/themeContext";
import "./style.scss";

const Layout = ({ children }) => {
    const { siteTitle } = useSiteMetaData();

    return (
        <ThemeToggler>
            {({ theme, toggleTheme }) => (
                <ThemeContext.Provider value={theme}>
                    <PageHeader siteTitle={siteTitle} theme={theme} toggleTheme={toggleTheme} />
                    <div className="content">
                        <main>{children}</main>
                    </div>
                </ThemeContext.Provider>
            )}
        </ThemeToggler>
    );
};

export default Layout;
