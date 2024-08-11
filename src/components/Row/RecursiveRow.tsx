import clsx from "clsx";

import {RowWithChild} from "../../services/types";
import {Add} from "../../assets/icons/Add";
import {Delete} from "../../assets/icons/Delete";

import s from './RecursiveRow.module.scss'

type RowProps = {
    row: RowWithChild;
    level: number;
    addRow: (parentId: number) => void;
    removeRow: (rowId: number) => void;
}

export const RecursiveRow = (props: RowProps) => {
    const {row, level, addRow, removeRow} = props

    const addClickHandler = () => {
        addRow(row.id)
    }
    const removeClickHandler = () => {
        removeRow(row.id)
    }

    const onDoubleClickHandler=()=>{
        console.log('onDoubleClickHandler')
    }


    return (
        <>
            <tr className={s.tr}   onDoubleClick={onDoubleClickHandler}>
                <td className={s.td}>
                    <div className={clsx(s.buttons, level && s.buttons_line)} style={{marginLeft: `${level * 20}px`}}>
                        <button type='button' className={s.add} onClick={addClickHandler}>
                            <Add/>
                        </button>
                        <button type='button' onClick={removeClickHandler} className={s.delete}>
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
            {row?.child?.length > 0 && row.child.map((child) => (
                <RecursiveRow key={child.id} addRow={addRow} removeRow={removeRow} row={child} level={level + 1}/>))
            }
        </>
    );
};
