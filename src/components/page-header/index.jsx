import * as React from "react"
import { Link } from "gatsby"
import "./style.scss"

const PageHeader = ({ siteTitle }) => (
    <header className="page-header-wrapper">
        <div className="page-header">
            <Link to="/" className="page-header-title">
                {siteTitle}
            </Link>
        </div>
    </header>
)

export default PageHeader
