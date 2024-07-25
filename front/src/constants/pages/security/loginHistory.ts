export const QUERY = {
    LIST: 'loginHistory/list',
} as const;

export const LABEL = {
    REQUEST_IP: 'Request IP',
    RESULT: 'Result',
    RESULT_CODE: 'Code',
    RESULT_VALUE: 'Value',
    CREATED_TIME: 'Created time'
} as const;

export const THEAD = [
    [
        { colSpan: 1, rowSpan: 2, label: LABEL.REQUEST_IP },
        { colSpan: 2, rowSpan: 1, label: LABEL.RESULT },
        { colSpan: 1, rowSpan: 2, label: LABEL.CREATED_TIME }
    ],
    [
        { colSpan: 1, rowSpan: 1, label: LABEL.RESULT_CODE },
        { colSpan: 1, rowSpan: 1, label: LABEL.RESULT_VALUE }
    ]
] as const;
