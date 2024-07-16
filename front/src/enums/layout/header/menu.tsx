import { HomeOutlined, InfoOutlined } from '@mui/icons-material';

export const menu = {
    HOME: {
        ICON: <HomeOutlined />,
        PATH: '/',
        LABEL: 'Home',
        IS_REQUIRED_USER_INIT: false,
        IS_VISIBLE: true
    },
    INFORMATION: {
        ICON: <InfoOutlined />,
        PATH: '/information',
        LABEL: 'Information',
        IS_REQUIRED_USER_INIT: false,
        IS_VISIBLE: true
    },
    SECURITY: {
        ICON: undefined,
        PATH: '/security',
        LABEL: undefined,
        IS_REQUIRED_USER_INIT: true,
        IS_VISIBLE: false
    }
} as const;
