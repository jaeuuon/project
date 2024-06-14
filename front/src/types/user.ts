export default interface User {
    id?: number;
    name?: string;
    authorities?: authority[];
};

export interface authority {
    code: string;
    value: string;
};
