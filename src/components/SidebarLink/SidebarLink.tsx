import {NavLink} from "react-router-dom";

import {LinkIcon} from "../../assets/icons/LinkIcon";

import s from './SidebarLink.module.scss'

type SidebarLinkProps = {
    to: string
    text: string
}

export const SidebarLink = (props: SidebarLinkProps) => {
    const {to, text}=props

    return (
        <NavLink to={to}
                 className={({isActive}) => `${s.link} ${isActive ? s.link_active : ''}`}>
            <LinkIcon/>
            <span className={s.text}>{text}</span>
        </NavLink>
    );
};
