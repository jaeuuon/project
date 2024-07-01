import type { Error } from 'types/apis/common';

export default interface LogInOut {
    setError: (error: Error) => void;
    setVisibleSnackbarTrue: () => void;
    setVisibleLoginTrue: () => void;
};
