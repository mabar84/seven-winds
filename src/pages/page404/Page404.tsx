import {Link} from "react-router-dom";

import img404 from './../../assets/img/img404.png';

import s from './Page404.module.scss'

export const Page404 = () => {
    return (
        <div className={s.page404}>
            <img alt="404" className={s.img} src={img404}/>
            <Link to="/">
                Вернуться на главную
            </Link>
        </div>
    );
};
