export interface Pagination {
    onChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
};

export default interface Component extends Pagination {
    totalPages?: number;
};
