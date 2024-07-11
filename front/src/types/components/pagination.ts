export default interface Pagination {
    totalPages: number;
    onChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
};
