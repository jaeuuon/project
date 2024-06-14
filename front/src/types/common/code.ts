export default interface Code {
    [index: string]: CodeMessage;
};

export interface CodeMessage {
    CODE: string;
    MESSAGE: string;
};
