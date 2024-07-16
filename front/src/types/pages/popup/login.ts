import type { VisibleFalse } from 'types/visible';

export default interface Login extends VisibleFalse {
    scheduler: () => Promise<void>;
};
