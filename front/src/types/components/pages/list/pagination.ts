export interface ChangeEvent {
    onChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
};

export default interface Component extends ChangeEvent {
    totalPages?: number;
};
