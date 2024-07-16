import type Visible from 'types/visible';

import { open, close } from 'modules/layout/main/sidebar';

export interface Sidebar extends Visible {};

export type Action =
    | ReturnType<typeof open>
    | ReturnType<typeof close>
;
