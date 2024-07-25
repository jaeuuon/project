import { HomeOutlined, InfoOutlined, Security as SecurityIcon } from '@mui/icons-material';

import { ROLE } from 'constants/layout/header/user';

import { SUB_MENU } from 'constants/layout/main/sidebar';

import Home from 'pages/Home';
import Information from 'pages/Information';
import Security from 'pages/Security';

export const MENU = {
    HOME: {
        PATH: '/',
        ELEMENT: <Home />,
        ICON: <HomeOutlined />,
        LABEL: 'Home',
        VISIBLE: true,
        REQUIRED: {
            INIT: false,
            ROLES: []
        }
    },
    INFORMATION: {
        PATH: '/information',
        ELEMENT: <Information />,
        ICON: <InfoOutlined />,
        LABEL: 'Information',
        VISIBLE: true,
        REQUIRED: {
            INIT: false,
            ROLES: []
        }
    },
    SECURITY: {
        PATH: '/security',
        ELEMENT: <Security />,
        ICON: <SecurityIcon />,
        LABEL: 'Security',
        VISIBLE: false,
        REQUIRED: {
            INIT: true,
            ROLES: [ROLE.USER]
        }
    }
} as const;

export const MENUS = [
    {
        ...MENU.HOME,
        SUB_MENUS: [
            SUB_MENU.NOTICE
        ]
    },
    {
        ...MENU.INFORMATION,
        SUB_MENUS: [
            SUB_MENU.CONTACT,
            SUB_MENU.GITHUB
        ]
    },
    {
        ...MENU.SECURITY,
        SUB_MENUS: [
            SUB_MENU.HISTORY
        ]
    }
] as const;
