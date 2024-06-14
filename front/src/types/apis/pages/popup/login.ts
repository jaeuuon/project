import type Input from "../../../common/input";

export interface Params extends Input {
    email?: string;
    password?: string;
};

export default interface Content {
    access: string;
    refresh: string;
};
