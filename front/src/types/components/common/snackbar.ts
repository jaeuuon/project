import type Visible from 'types/visible';

export default interface Snackbar extends Visible {
    key: string;
    message: string;
};
