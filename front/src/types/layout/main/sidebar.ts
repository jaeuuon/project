import type Visible from 'types/visible';

import { openSidebar, closeSidebar } from 'modules/layout/main/sidebar';

export interface Sidebar extends Visible {};

export type Action =
    | ReturnType<typeof openSidebar>
    | ReturnType<typeof closeSidebar>;
