import { CampaignOutlined, ContactSupportOutlined, GitHub, History } from '@mui/icons-material';

import { MENU } from 'constants/layout/header/menu';

import Notice from 'pages/home/Notice';
import Contact from 'pages/information/Contact';
import LoginHistory from 'pages/security/LoginHistory';

export const SUB_MENU = {
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
        PATH: `${MENU.INFORMATION.PATH}/contact`,
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
        PATH: `${MENU.SECURITY.PATH}/history`,
        ELEMENT: <LoginHistory />,
        ICON: <History />,
        LABEL: 'Login history',
        REQUIRED: {
            INIT: true,
            ROLES: []
        }
    }
} as const;
