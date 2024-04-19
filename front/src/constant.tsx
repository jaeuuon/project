import {
    HomeOutlined,
    CampaignOutlined,
    InfoOutlined,
    ContactSupportOutlined,
    CodeOutlined
} from '@mui/icons-material';

import Constant from './types/constant';

const constant: Constant = {
    MENU: {
        HOME: {
            icon: <HomeOutlined />,
            label: 'Home',
            path: '/',
            subMenus: [
                {
                    icon: <CampaignOutlined />,
                    label: '공지사항',
                    path: '/notice',
                }
            ]
        },
        INFORMATION: {
            icon: <InfoOutlined />,
            label: 'Information',
            path: '/information',
            subMenus: [
                {
                    icon: <ContactSupportOutlined />,
                    label: 'Contact',
                    path: '/information/contact',
                },
                {
                    icon: <CodeOutlined />,
                    label: 'GitHub',
                    path: 'https://github.com/jaeuuon/project',
                    isOpen: true,
                }
            ]
        }
    }
};

export default constant;
