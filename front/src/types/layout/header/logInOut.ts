import type { Error } from 'types/apis/common';

export default interface LogInOut {
    setError: (error: Error) => void;
    setVisibleErrorTrue: () => void;
    setVisibleLoginTrue: () => void;
};
