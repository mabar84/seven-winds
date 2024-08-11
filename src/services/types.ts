export type TreeResponse = RowWithChild[]

export type RowWithChild = RowResponse & {
    child: RowWithChild[];
}

export type RowResponse = {
    equipmentCosts: number;
    estimatedProfit: number;
    id: number;
    machineOperatorSalary: number;
    mainCosts: number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    rowName: string;
    salary: number;
    supportCosts: number;
    total: number;
}

export type RequestCreateRow = {
    equipmentCosts: number;
    estimatedProfit: number;
    machineOperatorSalary: number;
    mainCosts: number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    parentId: number | null;
    rowName: string;
    salary: number;
    supportCosts: number;
};

export type RecalculatedRows = {
    changed: RowResponse[]
    current: RowResponse
}
