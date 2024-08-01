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

export const PATH = {
    HOME: '/',
    INFORMATION: '/information',
    SECURITY: '/security'
} as const;

export const MENU = [
    {
        PATH: `${PATH.HOME}`,
        ELEMENT: <Home />,
        ICON: <HomeOutlined />,
        LABEL: 'Home',
        VISIBLE: true,
        REQUIRED: { INIT: false, ROLES: [] },
        SUB_MENUS: [
            {
                PATH: `${PATH.HOME}notice`,
                ELEMENT: <Notice />,
                ICON: <CampaignOutlined />,
                LABEL: 'Notice',
                REQUIRED: { INIT: false, ROLES: [] }
            }
        ]
    },
    {
        PATH: `${PATH.INFORMATION}`,
        ELEMENT: <Information />,
        ICON: <InfoOutlined />,
        LABEL: 'Information',
        VISIBLE: true,
        REQUIRED: { INIT: false, ROLES: [] },
        SUB_MENUS: [
            {
                PATH: `${PATH.INFORMATION}/contact`,
                ELEMENT: <Contact />,
                ICON: <ContactSupportOutlined />,
                LABEL: 'Contact',
                REQUIRED: { INIT: false, ROLES: [] }
            },
            {
                PATH: 'https://github.com/jaeuuon/project',
                ELEMENT: undefined,
                ICON: <GitHub />,
                LABEL: 'GitHub',
                REQUIRED: { INIT: false, ROLES: [] }
            }
        ]
    },
    {
        PATH: `${PATH.SECURITY}`,
        ELEMENT: <Security />,
        ICON: <SecurityIcon />,
        LABEL: 'Security',
        VISIBLE: false,
        REQUIRED: { INIT: true, ROLES: [ROLE.USER] },
        SUB_MENUS: [
            {
                PATH: `${PATH.SECURITY}/history`,
                ELEMENT: <LoginHistory />,
                ICON: <History />,
                LABEL: 'Login history',
                REQUIRED: { INIT: true, ROLES: [] }
            }
        ]
    }
] as const;
