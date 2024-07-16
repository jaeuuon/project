import { HomeOutlined, InfoOutlined } from '@mui/icons-material';

import { role } from 'enums/layout/header/user';

export const menu = {
    HOME: {
        PATH: '/',
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
        ICON: undefined,
        LABEL: undefined,
        REQUIRED: {
            INIT: true,
            ROLES: [role.USER]
        },
        VISIBLE: false
    }
} as const;
