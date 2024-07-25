
import { CampaignOutlined, ContactSupportOutlined, GitHub, History } from '@mui/icons-material';

import { MENU as HEADER_MENU } from 'constants/layout/header/menu';

import Notice from 'pages/home/Notice';
import Contact from 'pages/information/Contact';
import LoginHistory from 'pages/security/LoginHistory';

export const MENU = {
    NOTICE: {
        PATH: '/notice',
        ELEMENT: <Notice />,
        ICON: <CampaignOutlined />,
        LABEL: 'Notice',
        REQUIRED: {
            INIT: false,
            ROLES: []
        }
    },
    CONTACT: {
        PATH: `${HEADER_MENU.INFORMATION.PATH}/contact`,
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
    },
    HISTORY: {
        PATH: `${HEADER_MENU.SECURITY.PATH}/history`,
        ELEMENT: <LoginHistory />,
        ICON: <History />,
        LABEL: 'Login history',
        REQUIRED: {
            INIT: true,
            ROLES: []
        }
    }
} as const;

export const MENUS = [
    {
        PATH: HEADER_MENU.HOME.PATH,
        SUB_MENUS: [
            MENU.NOTICE
        ]
    },
    {
        PATH: HEADER_MENU.INFORMATION.PATH,
        SUB_MENUS: [
            MENU.CONTACT,
            MENU.GITHUB
        ]
    },
    {
        PATH: HEADER_MENU.SECURITY.PATH,
        SUB_MENUS: [
            MENU.HISTORY
        ]
    }
] as const;
