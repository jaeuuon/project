
import { CampaignOutlined, ContactSupportOutlined, GitHub, History } from '@mui/icons-material';

import { menu as headerMenu } from 'enums/layout/header/menu';

export const action = {
    OPEN: 'sidebar/open',
    CLOSE: 'sidebar/close'
} as const;

export const menu = {
    HOME: {
        PATH: headerMenu.HOME.PATH,
        SUB_MENU: {
            NOTICE: {
                ICON: <CampaignOutlined />,
                PATH: '/notice',
                LABEL: 'Notice',
                IS_REQUIRED_INIT: false
            }
        }
    },
    INFORMATION: {
        PATH: headerMenu.INFORMATION.PATH,
        SUB_MENU: {
            CONTACT: {
                ICON: <ContactSupportOutlined />,
                PATH: `${headerMenu.INFORMATION.PATH}/contact`,
                LABEL: 'Contact',
                IS_REQUIRED_INIT: false
            },
            GITHUB: {
                ICON: <GitHub />,
                PATH: 'https://github.com/jaeuuon/project',
                LABEL: 'GitHub',
                IS_REQUIRED_INIT: false
            }
        }
    },
    SECURITY: {
        PATH: headerMenu.SECURITY.PATH,
        SUB_MENU: {
            HISTORY: {
                ICON: <History />,
                PATH: `${headerMenu.SECURITY.PATH}/history`,
                LABEL: 'Login history',
                IS_REQUIRED_INIT: true
            }
        }
    }
} as const;
