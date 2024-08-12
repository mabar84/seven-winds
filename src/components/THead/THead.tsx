import {content} from "../../constants/content";

import s from "./THead.module.scss";

export const THead = () => {
    return (
        <thead>
        <tr className={s.thead}>
            <th className={s.level}>{content.th.level}</th>
            <th className={s.name}>{content.th.rowName}</th>
            <th className={s.static}>{content.th.salary}</th>
            <th className={s.static}>{content.th.equipmentCosts}</th>
            <th className={s.static}>{content.th.overheads}</th>
            <th className={s.static}>{content.th.estimatedProfit}</th>
        </tr>
        </thead>
    );
};
