import {Control} from "react-hook-form";

import {InputWithController} from "../InpurWithController/InpurWithController";
import {SmrFormValues} from "../../pages/smr/useSmr";
import {Add} from "../../assets/icons/Add";

import s from './InputsForForm.module.scss'

type InputsForFormProps = {
    control: Control<SmrFormValues>;
    level: number;
    withBorder?: boolean;
}

export const InputsForForm = ({control, level, withBorder}: InputsForFormProps) => {
    return (
        <tr className={withBorder && s.tr}>
            <td className={s.td}>
                <div className={s.add} style={{marginLeft: `${level * 20}px`}}>
                    <Add/>
                </div>
            </td>
            <td className={s.td}>
                <InputWithController autoFocus control={control} name='rowName'/></td>
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
    );
};
