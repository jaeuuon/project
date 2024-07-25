export const URL = '/security/history' as const;

export const QUERY = {
    LIST: 'loginHistory/list',
} as const;

export const COLUMN = {
    REQUEST_IP: { key: 'requestIp', value: 'Request IP', width: 280 },
    RESULT: { key: 'result', value: 'Result', width: 360 },
    CREATED_TIME: { key: 'createdTime', value: 'Created time', width: 440 }
} as const;

export const COLUMNS = [
    [COLUMN.REQUEST_IP, COLUMN.RESULT, COLUMN.CREATED_TIME]
];
