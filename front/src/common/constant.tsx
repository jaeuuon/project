import {
    HomeOutlined,
    CampaignOutlined,
    InfoOutlined,
    ContactSupportOutlined,
    CodeOutlined
} from '@mui/icons-material';

import Constant from '../types/constant';

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
                    icon: <CodeOutlined />,
                    label: 'GitHub',
                    path: 'https://github.com/jaeuuon/project',
                    isOpen: true
                }
            ]
        }
    },
    FOOTER: {
        SKILL_BADGES: [
            {
                SRC: 'https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white',
                ALT: 'TypeScript',
                URL: 'https://www.typescriptlang.org'
            },
            {
                SRC: 'https://img.shields.io/badge/React-087ea4?logo=React&logoColor=white',
                ALT: 'React',
                URL: 'https://react.dev'
            },
            {
                SRC: 'https://img.shields.io/badge/Material%20UI-007FFF?logo=MUI&logoColor=white',
                ALT: 'Material UI',
                URL: 'https://mui.com'
            },
            {
                SRC: 'https://img.shields.io/badge/CSS3-1572B6?logo=CSS3&logoColor=white',
                ALT: 'CSS3',
                URL: 'https://www.w3.org/Style/CSS'
            }
        ],
        THEME_COLOR: '#1976d2',
        CREATOR: {
            URL: 'https://github.com/jaeuuon',
            NAME: 'jaeuuon'
        }
    }
};

export default constant;