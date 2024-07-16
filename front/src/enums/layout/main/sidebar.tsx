
import { CampaignOutlined, ContactSupportOutlined, GitHub, History } from '@mui/icons-material';

import { menu as headerMenu } from 'enums/layout/header/menu';

import Notice from 'pages/home/Notice';
import Contact from 'pages/information/Contact';
import LoginHistory from 'pages/security/LoginHistory';

export const action = {
    OPEN: 'sidebar/open',
    CLOSE: 'sidebar/close'
} as const;

export const menu = {
    HOME: {
        NOTICE: {
            PATH: '/notice',
            ELEMENT: <Notice />,
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
            ELEMENT: <Contact />,
            ICON: <ContactSupportOutlined />,
            LABEL: 'Contact',
            REQUIRED: {
                INIT: false,
                ROLES: []
            }
        },
        GITHUB: {
            PATH: 'https://github.com/jaeuuon/project',
            ELEMENT: undefined,
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
            ELEMENT: <LoginHistory />,
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
        MENUS: [
            menu.HOME.NOTICE
        ]
    },
    {
        PATH: headerMenu.INFORMATION.PATH,
        MENUS: [
            menu.INFORMATION.CONTACT,
            menu.INFORMATION.GITHUB
        ]
    },
    {
        PATH: headerMenu.SECURITY.PATH,
        MENUS: [
            menu.SECURITY.HISTORY
        ]
    }
] as const;
