const BASE_URL = '/security' as const;

export const AUTHENTICATION = `${BASE_URL}/authentication` as const;
export const USER = `${BASE_URL}/user` as const;
export const HISTORY = {
    LOGIN: `${BASE_URL}/history/login`
} as const;
