export const URL = '/security/history' as const;

export const QUERY = {
    LIST: 'loginHistory/list',
} as const;

export const COLUMN = {
    REQUEST_IP: { KEY: 'requestIp', VALUE: 'Request IP', WIDTH: 280 },
    RESULT: { KEY: 'result', VALUE: 'Result', WIDTH: 360 },
    CREATED_TIME: { KEY: 'createdTime', VALUE: 'Created time', WIDTH: 440 }
} as const;

export const COLUMNS = Object.values(COLUMN);
