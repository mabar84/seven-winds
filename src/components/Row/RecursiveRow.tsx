import {RowWithChild} from "../../services/types";
import {Add} from "../../assets/icons/Add";
import {Delete} from "../../assets/icons/Delete";
import {useCreateRowMutation, useDeleteRowMutation} from "../../services/base-api";

import s from './RecursiveRow.module.scss'
import {errorNotification} from "../../lib/notifications";

type RowProps = {
    row: RowWithChild;
    level: number;
    addRow: (parentId: number) => void;
}

export const RecursiveRow = (props: RowProps) => {
    const {row, level, addRow} = props

    const [deleteRow] = useDeleteRowMutation()

    const addClickHandler = () => {
        addRow(row.id)
    }

    const deleteClickHandler = () => {
        deleteRow(row.id)
        errorNotification('Удалено');

    }

    return (
        <>
            <tr className={s.tr}>
                <td className={s.td}>
                    <div className={s.buttons} style={{marginLeft: `${level * 20}px`}}>
                        <button type='button' className={s.add} onClick={addClickHandler}>
                            <Add/>
                        </button>
                        <button type='button' onClick={deleteClickHandler} className={s.delete}>
                            <Delete/>
                        </button>
                    </div>
                </td>
                <td className={s.td}>{row.rowName}</td>
                <td className={s.td}>{row.salary}</td>
                <td className={s.td}>{row.equipmentCosts}</td>
                <td className={s.td}>{row.overheads}</td>
                <td className={s.td}>{row.estimatedProfit}</td>
            </tr>
            {row.child.length > 0 && row.child.map((childRow) => (
                <RecursiveRow addRow={addRow} key={childRow.id} row={childRow} level={level + 1}/>))
            }
        </>
    );
};
