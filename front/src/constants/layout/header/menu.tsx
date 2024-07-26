import {
    HomeOutlined, CampaignOutlined,
    InfoOutlined, ContactSupportOutlined, GitHub,
    Security as SecurityIcon, History
} from '@mui/icons-material';

import { ROLE } from 'constants/layout/header/user';

import Home from 'pages/home/Home';
import Notice from 'pages/home/Notice';

import Information from 'pages/information/Information';
import Contact from 'pages/information/Contact';

import Security from 'pages/security/Security';
import LoginHistory from 'pages/security/LoginHistory';

export const MENUS = [
    {
        PATH: '',
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
                PATH: '/notice',
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
    {
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
    {
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
] as const;
