export type TreeResponse =RowWithChild[]

export type RowWithChild = Row & {
    child: RowWithChild[];
}

export type Row = {
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
