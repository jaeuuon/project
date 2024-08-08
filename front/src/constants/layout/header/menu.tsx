import {
    HomeOutlined, CampaignOutlined,
    InfoOutlined, ContactSupportOutlined, GitHub,
    Security as SecurityIcon, ManageAccounts, Password, ManageHistory, History
} from '@mui/icons-material';

import { ROLE } from 'constants/apis/security/authentication';

import Home from 'pages/Home';
import Notice from 'pages/home/Notice';

import Information from 'pages/Information';
import Contact from 'pages/information/Contact';

import Security from 'pages/Security';
import EditAccount from 'pages/security/EditAccount';
import ChangePassword from 'pages/security/ChangePassword';
import AccountHistory from 'pages/security/AccountHistory';
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
                ELEMENT: null,
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
                PATH: `${PATH.SECURITY}/edit-account`,
                ELEMENT: <EditAccount />,
                ICON: <ManageAccounts />,
                LABEL: 'Edit Account',
                REQUIRED: { INIT: true, ROLES: [] }
            },
            {
                PATH: `${PATH.SECURITY}/change-password`,
                ELEMENT: <ChangePassword />,
                ICON: <Password />,
                LABEL: 'Change Password',
                REQUIRED: { INIT: true, ROLES: [] }
            },
            {
                PATH: `${PATH.SECURITY}/account-history`,
                ELEMENT: <AccountHistory />,
                ICON: <ManageHistory />,
                LABEL: 'Account History',
                REQUIRED: { INIT: true, ROLES: [] }
            },
            {
                PATH: `${PATH.SECURITY}/login-history`,
                ELEMENT: <LoginHistory />,
                ICON: <History />,
                LABEL: 'Login History',
                REQUIRED: { INIT: true, ROLES: [] }
            }
        ]
    }
] as const;
