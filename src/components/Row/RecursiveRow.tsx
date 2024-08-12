import clsx from "clsx";

import {RowResponse, RowWithChild} from "../../services/types";
import {Add} from "../../assets/icons/Add";
import {Delete} from "../../assets/icons/Delete";

import s from './RecursiveRow.module.scss'
import {InputWithController} from "../InpurWithController/InpurWithController";

type RowProps = {
    row: RowWithChild;
    level: number;
    addRow: (parentId: number) => void;
    removeRow: (rowId: number) => void;
    updatingRowId: number | null;
    setUpdatingRow: (row: RowResponse | undefined) => void;
    control: any;
}

export const RecursiveRow = (props: RowProps) => {
    const {row, level, addRow, removeRow,  control, updatingRowId,setUpdatingRow} = props

    const isEditMode = updatingRowId === row.id

    const addClickHandler = () => {
        addRow(row.id)
    }
    const removeClickHandler = () => {
        removeRow(row.id)
    }

    const onDoubleClickHandler = () => {
        setUpdatingRow(row)
    }

    return (
        <>
            {isEditMode
                ? <tr>
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
                </tr>
                : <tr className={s.tr} onDoubleClick={onDoubleClickHandler}>
                    <td className={s.td}>
                        <div className={clsx(s.buttons, level && s.buttons_line)}
                             style={{marginLeft: `${level * 20}px`}}>
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
                    <RecursiveRow key={child.id} addRow={addRow} removeRow={removeRow} setUpdatingRow={setUpdatingRow}
                                  control={control} row={child} updatingRowId={updatingRowId}
                                  level={level + 1}/>))
            }
        </>
    );
};
