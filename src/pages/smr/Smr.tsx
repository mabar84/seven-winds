import {THead} from "../../components/THead";
import {useSmr} from "./useSmr";
import {RecursiveRow} from "../../components/RecursiveRow";
import {InputsForForm} from "../../components/InputsForForm";

import s from './Smr.module.scss'

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
                    />))
                }

                {showAddNewRow && <InputsForForm level={0} control={control}/>}
                </tbody>
            </table>

            <input type={'submit'} style={{display: "none"}}/>
        </form>
    )
};
