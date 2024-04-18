import { HomeOutlined, InfoOutlined } from '@mui/icons-material';

import Constant from './types/constant';

const constant: Constant = {
    MENU: {
        HOME: {
            icon: <HomeOutlined />,
            label: 'Home',
            path: '/',
            subMenus: []
        },
        INFORMATION: {
            icon: <InfoOutlined />,
            label: 'Information',
            path: '/information',
            subMenus: []
        }
    }
};

export default constant;
