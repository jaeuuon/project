export const URL = '/security/history' as const;

export const QUERY = {
    LIST: 'loginHistory/list',
} as const;

export const THEAD = [
    [
        { colSpan: 1, rowSpan: 2, label: 'Request IP' },
        { colSpan: 2, rowSpan: 1, label: 'Result' },
        { colSpan: 1, rowSpan: 2, label: 'Created time' }
    ],
    [
        { colSpan: 1, rowSpan: 1, label: 'Code' },
        { colSpan: 1, rowSpan: 1, label: 'Value' }
    ]
] as const;

export const TBODY = {
    REQUEST_IP: 'requestIp',
    RESULT_CODE: 'code',
    RESULT_VALUE: 'value',
    CREATED_TIME: 'createdTime'
} as const;
