import {
    HomeOutlined, CampaignOutlined,
    InfoOutlined, ContactSupportOutlined, GitHub,
    Security as SecurityIcon, History
} from '@mui/icons-material';

import { ROLE } from 'constants/apis/security/authentication';

import Home from 'pages/Home';
import Notice from 'pages/home/Notice';

import Information from 'pages/Information';
import Contact from 'pages/information/Contact';

import Security from 'pages/Security';
import LoginHistory from 'pages/security/LoginHistory';

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
        },
        SUB_MENUS: [
            {
                PATH: 'notice',
                ELEMENT: <Notice />,
                ICON: <CampaignOutlined />,
                LABEL: 'Notice',
                REQUIRED: {
                    INIT: false,
                    ROLES: []
                }
            }
        ]
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
        },
        SUB_MENUS: [
            {
                PATH: '/contact',
                ELEMENT: <Contact />,
                ICON: <ContactSupportOutlined />,
                LABEL: 'Contact',
                REQUIRED: {
                    INIT: false,
                    ROLES: []
                }
            },
            {
                PATH: 'https://github.com/jaeuuon/project',
                ELEMENT: undefined,
                ICON: <GitHub />,
                LABEL: 'GitHub',
                REQUIRED: {
                    INIT: false,
                    ROLES: []
                }
            }
        ]
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
        },
        SUB_MENUS: [
            {
                PATH: '/history',
                ELEMENT: <LoginHistory />,
                ICON: <History />,
                LABEL: 'Login history',
                REQUIRED: {
                    INIT: true,
                    ROLES: []
                }
            }
        ]
    }
 } as const;
