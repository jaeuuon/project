import Visible from 'types/visible';
import type { Error } from 'types/apis/common';

export default interface Snackbar extends Visible {
    error: Error;
};
