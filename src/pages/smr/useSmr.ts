import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import {RecalculatedRows, RequestCreateRow} from "../../services/types";
import {baseApi, useCreateRowMutation, useDeleteRowMutation, useGetTreeRowsQuery} from "../../services/base-api";
import {useAppDispatch} from "../../services/store";
import {infoNotification} from "../../lib/notifications";

export const useSmr = () => {
    const {data, isSuccess} = useGetTreeRowsQuery()
    const [createRow] = useCreateRowMutation()
    const [deleteRow] = useDeleteRowMutation()

    const [showAddNewRow, setShowAddNewRow] = useState(false)
    const [parentId, setParentId] = useState<number | null>(null)

    const dispatch = useAppDispatch()

    type SmrFormValues = z.infer<typeof smrScheme>;

    const smrScheme = z.object({
        rowName: z.string().min(1),
        salary: z.string(),
        equipmentCosts: z.string(),
        overheads: z.string(),
        estimatedProfit: z.string(),
    });

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

    const handleAddRow = async (newRow: RequestCreateRow) => {
        setShowAddNewRow(false)

        try {
            const response: RecalculatedRows = await createRow(newRow).unwrap();

            const newData = baseApi.util.updateQueryData('getTreeRows', undefined, (draft) => {
                if (parentId === null) {
                    return [{...response.current, child: []}]
                }

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

    const addRow = (parentId: number) => {
        setShowAddNewRow(true)
        setParentId(parentId)
    }

    const removeRow = async (rowId: number) => {
        try {
            await deleteRow(rowId).unwrap();

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
                deleteElementFromDraft(draft, rowId);

                if (!draft.length) {
                    infoNotification('Введите первую строку')
                    setShowAddNewRow(true)
                    setParentId(null)
                }
            });

            dispatch(newData)

        } catch (error) {
            console.error(error);
        }
    }

    return {
        isSuccess,
        data,
        showAddNewRow,
        control,
        addRow,
        removeRow,
        onSubmitSmr,
        setShowAddNewRow
    }
}
