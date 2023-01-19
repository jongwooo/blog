import * as React from "react";
import { CgMoon } from "react-icons/cg";
import { FiSun } from "react-icons/fi";
import { DARK, LIGHT } from "../../constants/constants";
import "./style.scss";

const ThemeSwitch = ({ theme, toggleTheme }) => {
    return (
        <button className="theme-switch-wrapper" onClick={() => toggleTheme(theme === DARK ? LIGHT : DARK)}>
            {theme === DARK ? <FiSun className="theme-switch" /> : <CgMoon className="theme-switch" />}
        </button>
    );
};

export default ThemeSwitch;
