import * as React from "react"
import { Link } from "gatsby"
import "./style.scss"

const Header = ({ siteTitle }) => (
    <header className="header-wrapper">
        <div className="header">
            <Link to="/" className="header-title">
                { siteTitle }
            </Link>
        </div>
    </header>
)

export default Header
