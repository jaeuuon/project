import type { Sidebar, Action } from 'types/layout/main/sidebar';

import { action } from 'enums/layout/main/sidebar';

const initState: Sidebar = { isVisible: false };

export const open = () => ({ type: action.OPEN });
export const close = () => ({ type: action.CLOSE });

const sidebar = (state: Sidebar = initState, { type }: Action) => {
    switch (type) {
        case action.OPEN:
            return { isVisible: true };
        case action.CLOSE:
            return { isVisible: false };
        default:
            return state;
    }
};

export default sidebar;
