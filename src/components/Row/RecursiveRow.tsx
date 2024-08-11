import {RecalculatedRows, RowWithChild} from "../../services/types";
import {Add} from "../../assets/icons/Add";
import {Delete} from "../../assets/icons/Delete";
import {baseApi, useCreateRowMutation, useDeleteRowMutation} from "../../services/base-api";

import s from './RecursiveRow.module.scss'
import {errorNotification} from "../../lib/notifications";
import {useAppDispatch} from "../../services/store";

type RowProps = {
    row: RowWithChild;
    level: number;
    addRow: (parentId: number) => void;
}

export const RecursiveRow = (props: RowProps) => {
    const {row, level, addRow} = props

    const [deleteRow] = useDeleteRowMutation()
    const dispatch = useAppDispatch()

    const addClickHandler = () => {
        addRow(row.id)
    }

    const deleteClickHandler = async () => {
        try {
            const response: RecalculatedRows = await deleteRow(row.id).unwrap();

            const newData = baseApi.util.updateQueryData('getTreeRows', undefined, (draft) => {
                const deleteElementFromDraft = (draft: any, id: number) => {
                    for (let i = 0; i < draft.length; i++) {
                        if (draft[i].id === id) {
                            draft.splice(i, 1);
                            return;
                        }
                        if (draft[i].child && draft[i].child.length > 0) {
                            deleteElementFromDraft(draft[i].child, id);
                        }
                    }
                };
                deleteElementFromDraft(draft, row.id);
            });

            dispatch(newData)
        } catch (error) {
            console.error(error);
        }
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
            {row?.child?.length > 0 && row.child.map((child) => (
                <RecursiveRow addRow={addRow} key={child.id} row={child} level={level + 1}/>))
            }
        </>
    );
};
