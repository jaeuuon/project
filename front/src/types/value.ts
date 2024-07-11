export interface KeyValueWitdh extends KeyValue {
    width: number;
};

export interface KeyValue extends value {
    key: string;
    value: string;
};

export interface CodeValue<T> extends value {
    code: T;
};

interface value {
    value: string;
};
