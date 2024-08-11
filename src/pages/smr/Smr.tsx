import {useEffect} from "react";

import {content} from "../../constants/content";
import {RecursiveRow} from "../../components/Row";
import {Add} from "../../assets/icons/Add";
import {InputWithController} from "../../components/InpurWithController/InpurWithController";
import {useSmr} from "./useSmr";

import s from './Smr.module.scss'
import {infoNotification} from "../../lib/notifications";

export const Smr = () => {
    const {
        isSuccess,
        data,
        showAddNewRow,
        control,
        addRow,
        removeRow,
        onSubmitSmr,
        setShowAddNewRow
    } = useSmr()

    useEffect(() => {
        if (isSuccess && !data!.length) {
            setShowAddNewRow(true)
            infoNotification('Введите первую строку')
        }
    }, [isSuccess]);

    return (<form className={s.smr} onSubmit={onSubmitSmr}>
            <table className={s.table}>
                <thead>
                <tr>
                    <th className={s.level}>{content.th.level}</th>
                    <th className={s.name}>{content.th.rowName}</th>
                    <th className={s.static}>{content.th.salary}</th>
                    <th className={s.static}>{content.th.equipmentCosts}</th>
                    <th className={s.static}>{content.th.overheads}</th>
                    <th className={s.static}>{content.th.estimatedProfit}</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((row) => (
                    <RecursiveRow key={row.id} addRow={addRow} removeRow={removeRow} row={row} level={0}/>
                ))}

                {showAddNewRow && <tr>
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
                </tr>}
                </tbody>
            </table>
            <input type={'submit'} style={{display: "none"}}/>
        </form>
    )
};


