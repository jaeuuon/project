
import { CampaignOutlined, ContactSupportOutlined, GitHub, History } from '@mui/icons-material';

import { menu as headerMenu } from 'enums/layout/header/menu';

export const action = {
    OPEN: 'sidebar/open',
    CLOSE: 'sidebar/close'
} as const;

export const menu = {
    HOME: {
        NOTICE: {
            ICON: <CampaignOutlined />,
            PATH: '/notice',
            LABEL: 'Notice',
            IS_REQUIRED_USER_INIT: false
        }
    },
    INFORMATION: {
        CONTACT: {
            ICON: <ContactSupportOutlined />,
            PATH: `${headerMenu.INFORMATION.PATH}/contact`,
            LABEL: 'Contact',
            IS_REQUIRED_USER_INIT: false
        },
        GITHUB: {
            ICON: <GitHub />,
            PATH: 'https://github.com/jaeuuon/project',
            LABEL: 'GitHub',
            IS_REQUIRED_USER_INIT: false
        }
    },
    SECURITY: {
        HISTORY: {
            ICON: <History />,
            PATH: `${headerMenu.SECURITY.PATH}/history`,
            LABEL: 'Login history',
            IS_REQUIRED_USER_INIT: true
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
