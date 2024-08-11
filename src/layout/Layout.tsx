import {Outlet} from 'react-router-dom';

import {content} from "../constants/content";
import {ArrowBack} from "../assets/icons/ArrowBack";
import {Tile} from "../assets/icons/Tile";
import {ArrowDown} from "../assets/icons/ArrowDown";
import {SidebarLink} from "../components/SidebarLink";

import s from './Layout.module.scss';

export const Layout = () => {
    return (
        <>
            <header className={s.header}>
                <div className={s.header_top}>
                    <Tile/>
                    <ArrowBack/>
                    <div className={s.view}>{content.headerItems.view}</div>
                    <div className={s.manage}>{content.headerItems.manage}</div>
                </div>

                <div className={s.header_bottom}>
                    <div className={s.project_menu}>
                        <div>
                            <p className={s.project_title}>{content.sidebar.title}</p>
                            <span className={s.project_subtitle}>{content.sidebar.subtitle}</span>
                        </div>

                        <ArrowDown/>
                    </div>

                    <div className={s.table_header}>
                        {content.tableHeader}
                    </div>
                </div>


            </header>

            <main className={s.main}>
                <aside className={s.sidebar}>
                    <ul className={s.sidebar_list}>
                        {content.sidebar.items.map((item) => (
                            <li key={item.text}>
                                <SidebarLink to={item.link} text={item.text}/>
                            </li>
                        ))}
                    </ul>
                </aside>

                <Outlet/>
            </main>
        </>
    );
};
