import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import {RecalculatedRows, RequestCreateRow, RequestUpdateRow, RowResponse, TreeResponse} from "../../services/types";
import {
    baseApi,
    useCreateRowMutation,
    useDeleteRowMutation,
    useGetTreeRowsQuery,
    useUpdateRowMutation
} from "../../services/base-api";
import {useAppDispatch} from "../../services/store";
import {infoNotification} from "../../lib/notifications";

export type SmrFormValues = z.infer<typeof smrScheme>;

const smrScheme = z.object({
    rowName: z.string().min(1),
    salary: z.string(),
    equipmentCosts: z.string(),
    overheads: z.string(),
    estimatedProfit: z.string(),
});

export const useSmr = () => {
    const {data, isSuccess} = useGetTreeRowsQuery()
    const [createRow] = useCreateRowMutation()
    const [deleteRow] = useDeleteRowMutation()
    const [updateRow] = useUpdateRowMutation()

    const [showAddNewRow, setShowAddNewRow] = useState(false)
    const [parentId, setParentId] = useState<number | null>(null)
    const [updatingRow, setUpdatingRow] = useState<RowResponse | undefined>(undefined)

    const dispatch = useAppDispatch()

    const {control, handleSubmit, reset} = useForm<SmrFormValues>({
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

        if (updatingRow) {
            const {parentId, ...newBody} = body
            await handleUpdateRow({...newBody, rID: updatingRow.id})
            setUpdatingRow(undefined)

        } else {
            await handleAddRow(body);
        }
        reset()
    });

    const updateElementInDraft = (draft: TreeResponse, row: RowResponse) => {
        for (let i = 0; i < draft.length; i++) {
            if (draft[i].id === row.id) {
                draft[i] = {...draft[i], ...row};
                return;
            }
            if (draft[i].child && draft[i].child.length > 0) {
                updateElementInDraft(draft[i].child, row);
            }
        }
    };

    const handleAddRow = async (newRow: RequestCreateRow) => {
        setShowAddNewRow(false)

        try {
            const response: RecalculatedRows = await createRow(newRow).unwrap();

            const newData = baseApi.util.updateQueryData('getTreeRows', undefined, (draft) => {
                if (parentId === null) {
                    return [{...response.current, child: []}]
                }

                const addElementToDraft = (draft: TreeResponse, id: number | null) => {
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

                response.changed.forEach((el) => {
                    updateElementInDraft(draft, el);
                })

            });

            dispatch(newData)

        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateRow = async (args: RequestUpdateRow & { rID: number }) => {
        try {
            const response: RecalculatedRows = await updateRow(args).unwrap();

            const newData = baseApi.util.updateQueryData('getTreeRows', undefined, (draft) => {

                const combinedArray = [...response.changed, response.current]
                combinedArray.forEach((el) => {
                    updateElementInDraft(draft, el);
                })
            });

            dispatch(newData)

        } catch (error) {
            console.error(error);
        }
    };

    const addRow = (parentId: number) => {
        if (!updatingRow) {
            setShowAddNewRow(true)
            setParentId(parentId)
        }
    }

    const removeRow = async (rowId: number) => {
        try {
            const response: RecalculatedRows = await deleteRow(rowId).unwrap();

            const newData = baseApi.util.updateQueryData('getTreeRows', undefined, (draft) => {
                const deleteElementFromDraft = (draft: TreeResponse, id: number) => {
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

                response.changed.forEach((el) => {
                    updateElementInDraft(draft, el);
                })


            });

            dispatch(newData)

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (isSuccess && !data!.length) {
            setShowAddNewRow(true)
            infoNotification('Введите первую строку')
        }
    }, [isSuccess]);

    useEffect(() => {
        reset({
            rowName: updatingRow?.rowName || '',
            salary: updatingRow?.salary.toString() || '0',
            equipmentCosts: updatingRow?.equipmentCosts.toString() || '0',
            overheads: updatingRow?.overheads.toString() || '0',
            estimatedProfit: updatingRow?.estimatedProfit.toString() || '0',
        })
    }, [updatingRow]);

    return {
        data,
        showAddNewRow,
        updatingRowId: updatingRow?.id || null,
        control,
        onSubmitSmr,
        addRow,
        removeRow,
        setShowAddNewRow,
        setUpdatingRow,
    }
}
