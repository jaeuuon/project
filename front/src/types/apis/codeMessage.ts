export default interface CodeMessage {
    [index: string]: Detail;
};

export interface Detail {
    CODE: string;
    MESSAGE: string;
};
