import type { VisibleFalse } from 'types/visible';

export default interface Login extends VisibleFalse {
    reissuance: () => Promise<void>;
};
