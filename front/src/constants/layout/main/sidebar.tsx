
import { CampaignOutlined, ContactSupportOutlined, GitHub, History } from '@mui/icons-material';

import { GROUP } from 'constants/layout/header/menu';

import Notice from 'pages/home/Notice';
import Contact from 'pages/information/Contact';
import LoginHistory from 'pages/security/LoginHistory';

export const ITEM = {
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
        PATH: `${GROUP.INFORMATION.PATH}/contact`,
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
        PATH: `${GROUP.SECURITY.PATH}/history`,
        ELEMENT: <LoginHistory />,
        ICON: <History />,
        LABEL: 'Login history',
        REQUIRED: {
            INIT: true,
            ROLES: []
        }
    }
} as const;

export const GROUPS = [
    {
        PATH: GROUP.HOME.PATH,
        ITEMS: [
            ITEM.NOTICE
        ]
    },
    {
        PATH: GROUP.INFORMATION.PATH,
        ITEMS: [
            ITEM.CONTACT,
            ITEM.GITHUB
        ]
    },
    {
        PATH: GROUP.SECURITY.PATH,
        ITEMS: [
            ITEM.HISTORY
        ]
    }
] as const;
