export interface CodeMessage {
    CODE: string;
    MESSAGE: string;
};

export default interface Code {
    [index: string]: CodeMessage;
};
