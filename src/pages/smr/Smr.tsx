import {RecursiveRow} from "../../components/Row";
import {Add} from "../../assets/icons/Add";
import {InputWithController} from "../../components/InpurWithController/InpurWithController";
import {useSmr} from "./useSmr";
import {THead} from "../../components/THead";

import s from './Smr.module.scss'
import clsx from "clsx";

export const Smr = () => {
    const {
        data,
        showAddNewRow,
        updatingRowId,
        control,
        onSubmitSmr,
        addRow,
        removeRow,
        setShowAddNewRow,
        setUpdatingRow,
    } = useSmr()

    return (
        <form className={s.smr} onSubmit={onSubmitSmr}>
            <table className={s.table}>
                <THead/>

                <tbody>
                {data?.map((row) => (
                    <RecursiveRow
                        key={row.id} addRow={addRow} removeRow={removeRow}
                        setUpdatingRow={setUpdatingRow} setShowAddNewRow={setShowAddNewRow}
                        control={control} row={row} updatingRowId={updatingRowId}
                        level={0}
                    />
                ))}

                {showAddNewRow && <tr>
                    <td className={s.td}>
                        <div className={clsx(s.add, s.add_wrapper)}>
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
                </tr>}
                </tbody>
            </table>

            <input type={'submit'} style={{display: "none"}}/>
        </form>
    )
};
