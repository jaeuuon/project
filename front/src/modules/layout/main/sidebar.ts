import type { Sidebar } from 'types/layout/main/sidebar';

const initState: Sidebar = { isVisible: false };

const action = {
    OPEN: 'sidebar/open',
    CLOSE: 'sidebar/close'
} as const;

export const openSidebar = () => ({ type: action.OPEN });
export const closeSidebar = () => ({ type: action.CLOSE });

type Action =
    | ReturnType<typeof openSidebar>
    | ReturnType<typeof closeSidebar>;

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
