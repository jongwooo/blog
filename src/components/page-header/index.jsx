import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import "./style.scss";

const PageHeader = ({ siteTitle }) => {
    return (
        <header className="page-header-wrapper">
            <div className="page-header-body">
                <div className="page-header">
                    <Link className="page-title underline" to="/">
                        {siteTitle}
                    </Link>
                </div>
            </div>
        </header>
    );
};

PageHeader.propTypes = {
    siteTitle: PropTypes.string,
};

PageHeader.defaultProps = {
    siteTitle: ``,
};

export default PageHeader;
