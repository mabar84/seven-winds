import {Add} from "../../assets/icons/Add";
import {useCreateRowMutation, useDeleteRowMutation} from "../../services/base-api";
import {Input} from "../Input";

import s from './EmptyRow.module.scss'

type EmptyRowProps = {
    level: number
}

export const EmptyRow = (props: EmptyRowProps) => {
    const {level} = props

    const [createRow] = useCreateRowMutation()
    const [deleteRow] = useDeleteRowMutation()

    return (
            <tr>
                <td className={s.td}>
                    <div className={s.buttons} style={{marginLeft: `${level * 20}px`}}>
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

