import {Add} from "../../assets/icons/Add";
import {Input} from "../Input";

import s from './EmptyRow.module.scss'

type EmptyRowProps = {
    // level: number
}

export const EmptyRow = (props: EmptyRowProps) => {
    const {} = props

    return (
            <tr>
                <td className={s.td}>
                    <div className={s.buttons} >
                    {/*<div className={s.buttons} style={{marginLeft: `${level * 20}px`}}>*/}
                        <Add/>
                    </div>
                </td>
                <td className={s.td}><Input/></td>
                <td className={s.td}><Input/></td>
                <td className={s.td}><Input/></td>
                <td className={s.td}><Input/></td>
                <td className={s.td}><Input/></td>
            </tr>
    );
};

