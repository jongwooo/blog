import * as React from "react";
import { VscGithubInverted } from "react-icons/vsc";
import useSiteMetaData from "../../hooks/useSiteMetaData";
import "./style.scss";

const ProfileCard = () => {
    const { author, greetings, githubUrl } = useSiteMetaData();

    return (
        <div className="profile-card-wrapper">
            <h1 className="author">{author}</h1>
            <p className="greetings">{greetings}</p>
            {githubUrl && (
                <a className="social-link" href={githubUrl}>
                    <VscGithubInverted />
                    깃허브
                </a>
            )}
        </div>
    );
};

export default ProfileCard;
