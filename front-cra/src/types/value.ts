interface Value {
    value: string;
};

export interface KeyValue extends Value {
    key: string;
};

export interface CodeValue<T> extends Value {
    code: T;
};
