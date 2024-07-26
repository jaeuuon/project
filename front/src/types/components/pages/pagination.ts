export default interface Component {
    totalPages?: number;
    onChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
};
