export const URL = '/security/history' as const;

export const query = {
    LIST: 'loginHistory/list',
} as const;

export const column = {
    REQUEST_IP: { key: 'requestIp', value: 'Request IP', width: 280 },
    RESULT: { key: 'result', value: 'Result', width: 360 },
    CREATED_TIME: { key: 'createdTime', value: 'Created time', width: 440 }
} as const;

export const columns = Object.values(column);
