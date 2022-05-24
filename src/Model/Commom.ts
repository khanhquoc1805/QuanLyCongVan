export interface PaginationParams {
    limit: number;
    page: number;
    totalRows: number;
}

export interface ListResponse<T> {
    data: T[];
    pagination: PaginationParams;
    time? : number;
}

export interface ListParams {
    page?: number;
    limit?: number;
    
    [key: string]: any;
}