import * as React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Link } from "gatsby";

import { theme } from "../../styles/theme";

const PageHeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    height: 64px;
    box-sizing: border-box;
    border-bottom: 1px solid ${theme.colors.greyOpacity.$400};
    background-color: ${theme.colors.whiteOpacity.$900};
`;

const PageHeaderBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 5%;
    margin: auto;
    max-width: 700px;
`;

const PageTitle = styled(Link)`
    color: ${theme.colors.green.$700};
    font-size: 1.25rem;
    font-weight: 700;
    text-decoration: none;
`;

const PageHeader = ({ siteTitle }) => {
    return (
        <PageHeaderWrapper>
            <PageHeaderBody>
                <PageTitle to="/">{siteTitle}</PageTitle>
            </PageHeaderBody>
        </PageHeaderWrapper>
    );
};

PageHeader.propTypes = {
    siteTitle: PropTypes.string,
};

PageHeader.defaultProps = {
    siteTitle: ``,
};

export default PageHeader;
