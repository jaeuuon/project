import {
    HomeOutlined,
    CampaignOutlined,
    InfoOutlined,
    ContactSupportOutlined,
    GitHub
} from '@mui/icons-material';

import type Constant from 'types/common/constant';

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
                    path: '/notice'
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
                    path: '/information/contact'
                },
                {
                    icon: <GitHub />,
                    label: 'GitHub',
                    path: 'https://github.com/jaeuuon/project',
                    isOpen: true
                }
            ]
        }
    }
};

export default constant;
