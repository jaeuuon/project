import Input from "../../../common/input";

export interface Params extends Input {
    email?: string;
    password?: string;
};

export default interface Data {
    access: string;
    refresh: string;
};
