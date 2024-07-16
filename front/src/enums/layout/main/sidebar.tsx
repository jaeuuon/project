
import { CampaignOutlined, ContactSupportOutlined, GitHub, History } from '@mui/icons-material';

import { menu as headerMenu } from 'enums/layout/header/menu';

export const action = {
    OPEN: 'sidebar/open',
    CLOSE: 'sidebar/close'
} as const;

export const menu = {
    HOME: {
        NOTICE: {
            PATH: '/notice',
            ICON: <CampaignOutlined />,
            LABEL: 'Notice',
            REQUIRED: {
                INIT: false,
                ROLES: []
            }
        }
    },
    INFORMATION: {
        CONTACT: {
            PATH: `${headerMenu.INFORMATION.PATH}/contact`,
            ICON: <ContactSupportOutlined />,
            LABEL: 'Contact',
            REQUIRED: {
                INIT: false,
                ROLES: []
            }
        },
        GITHUB: {
            PATH: 'https://github.com/jaeuuon/project',
            ICON: <GitHub />,
            LABEL: 'GitHub',
            REQUIRED: {
                INIT: false,
                ROLES: []
            }
        }
    },
    SECURITY: {
        HISTORY: {
            PATH: `${headerMenu.SECURITY.PATH}/history`,
            ICON: <History />,
            LABEL: 'Login history',
            REQUIRED: {
                INIT: true,
                ROLES: []
            }
        }
    }
} as const;

export const menus = [
    {
        PATH: headerMenu.HOME.PATH,
        SUB_MENUS: [
            menu.HOME.NOTICE
        ]
    },
    {
        PATH: headerMenu.INFORMATION.PATH,
        SUB_MENUS: [
            menu.INFORMATION.CONTACT,
            menu.INFORMATION.GITHUB
        ]
    },
    {
        PATH: headerMenu.SECURITY.PATH,
        SUB_MENUS: [
            menu.SECURITY.HISTORY
        ]
    }
] as const;
