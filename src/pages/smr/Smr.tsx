import {baseApi, useCreateRowMutation, useDeleteRowMutation, useGetTreeRowsQuery} from "../../services/base-api";
import {content} from "../../constants/content";
import {RecursiveRow} from "../../components/Row";

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Add} from "../../assets/icons/Add";
import {InputWithController} from "../../components/InpurWithController/InpurWithController";
import {useEffect, useState} from "react";

import s from './Smr.module.scss'
import {RecalculatedRows, RequestCreateRow, RowWithChild, TreeResponse} from "../../services/types";
import {useAppDispatch} from "../../services/store";

const smrScheme = z.object({
    rowName: z.string().min(1),
    salary: z.string(),
    equipmentCosts: z.string(),
    overheads: z.string(),
    estimatedProfit: z.string(),
});

export type SmrFormValues = z.infer<typeof smrScheme>;

export const Smr = () => {
    const {data} = useGetTreeRowsQuery()
    const [createRow] = useCreateRowMutation()
    const [deleteRow] = useDeleteRowMutation()

    const [showAddNewRow, setShowAddNewRow] = useState(false)
    const [parentId, setParentId] = useState<number | null>(null)

    const dispatch = useAppDispatch()

    console.log(data)

    useEffect(() => {

        if (data && !data.length) {
            setShowAddNewRow(true)
        }
    }, []);


    const {control, handleSubmit} = useForm<SmrFormValues>({
        defaultValues: {
            rowName: '',
            salary: '0',
            equipmentCosts: '0',
            overheads: '0',
            estimatedProfit: '0',
        },
        resolver: zodResolver(smrScheme),
    });

    const handleAddRow = async (newRow: RequestCreateRow) => {
        setShowAddNewRow(false)

        try {
            const response: RecalculatedRows = await createRow(newRow).unwrap();

            const newData = baseApi.util.updateQueryData('getTreeRows', undefined, (draft) => {
                const addElementToDraft = (draft: any, id: number | null) => {
                    for (let i = 0; i < draft.length; i++) {
                        if (draft[i].id === id) {
                            draft[i].child.push({...response.current, child: []});
                            return;
                        }
                        if (draft[i].child && draft[i].child.length > 0) {
                            addElementToDraft(draft[i].child, id);
                        }
                    }
                };
                addElementToDraft(draft, parentId);
            });

            dispatch(newData)

        } catch (error) {
            console.error(error);
        }
    };


    const onSubmitSmr = handleSubmit(async (data) => {
        const body = {
            equipmentCosts: +data.equipmentCosts,
            estimatedProfit: +data.equipmentCosts,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            overheads: +data.overheads,
            parentId: parentId,
            rowName: data.rowName,
            salary: +data.salary,
            supportCosts: 0,
        }
        await handleAddRow(body);

    });


    const addRow = (parentId: number) => {
        console.log('Попытка добавить что-то', parentId)
        setShowAddNewRow(true)
        setParentId(parentId)
    }


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
                    <RecursiveRow key={row.id} addRow={addRow} row={row} level={0}/>
                ))}

                {showAddNewRow && <tr>
                    <td className={s.td}>
                        <div className={s.add} style={{marginLeft: `${2 * 20}px`}}>
                            {/*<div className={s.buttons} style={{marginLeft: `${level * 20}px`}}>*/}
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


