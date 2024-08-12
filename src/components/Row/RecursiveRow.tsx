import clsx from "clsx";

import {RowWithChild} from "../../services/types";
import {Add} from "../../assets/icons/Add";
import {Delete} from "../../assets/icons/Delete";

import s from './RecursiveRow.module.scss'
import {useState} from "react";
import {InputWithController} from "../InpurWithController/InpurWithController";

type RowProps = {
    row: RowWithChild;
    level: number;
    addRow: (parentId: number) => void;
    removeRow: (rowId: number) => void;
    setUpdatedRowId: (rowId: number | null) => void;
    control: any
}

export const RecursiveRow = (props: RowProps) => {
    const {row, level, addRow, removeRow, setUpdatedRowId,control} = props

    const [isEditMode, setEditMode] = useState(false)

    const addClickHandler = () => {
        addRow(row.id)
    }
    const removeClickHandler = () => {
        removeRow(row.id)
    }

    const onDoubleClickHandler = () => {
        setUpdatedRowId(row.id)
        setEditMode(true)
            }

    return (
        <>
        { isEditMode ?
            <tr>
                <td className={s.td}>
                    <div className={s.add}>
                        <Add/>
                    </div>
                </td>
                <td className={s.td}>
                    <InputWithController control={control} name='rowName'/></td>
                <td className={s.td}>
                    <InputWithController control={control} name='salary' type={'number'}/></td>
                <td className={s.td}>
                    <InputWithController control={control} name='equipmentCosts' type={'number'}/>
                </td>
                <td className={s.td}>
                    <InputWithController control={control} name='overheads' type={'number'}/></td>
                <td className={s.td}>
                    <InputWithController control={control} name='estimatedProfit' type={'number'}/>
                </td>
            </tr> : <tr className={s.tr} onDoubleClick={onDoubleClickHandler}>
        <td className={s.td}>
            {isEditMode && <h1>123</h1>}
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
}


{
    row?.child?.length > 0 && row.child.map((child) => (
        <RecursiveRow key={child.id} addRow={addRow} removeRow={removeRow} setUpdatedRowId={setUpdatedRowId}
                     control={control}         row={child} level={level + 1}/>))
            }
        </>
    );
};
