import { HomeOutlined, InfoOutlined, Security as SecurityIcon } from '@mui/icons-material';

import { ROLE } from 'constants/layout/header/user';

import Home from 'pages/Home';
import Information from 'pages/Information';
import Security from 'pages/Security';

export const MENU = {
    HOME: {
        PATH: '/',
        ELEMENT: <Home />,
        ICON: <HomeOutlined />,
        LABEL: 'Home',
        REQUIRED: {
            INIT: false,
            ROLES: []
        },
        VISIBLE: true
    },
    INFORMATION: {
        PATH: '/information',
        ELEMENT: <Information />,
        ICON: <InfoOutlined />,
        LABEL: 'Information',
        REQUIRED: {
            INIT: false,
            ROLES: []
        },
        VISIBLE: true
    },
    SECURITY: {
        PATH: '/security',
        ELEMENT: <Security />,
        ICON: <SecurityIcon />,
        LABEL: 'Security',
        REQUIRED: {
            INIT: true,
            ROLES: [ROLE.USER]
        },
        VISIBLE: false
    }
} as const;
