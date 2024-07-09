export interface Input {
    [index: string | symbol]: string | undefined;
};

export interface Pageable {
    page?: number;
};
