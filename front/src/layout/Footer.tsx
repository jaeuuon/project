import { Grid, Tooltip } from '@mui/material';

const skillBadges = [
    {
        src: 'https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white',
        alt: 'TypeScript',
        url: 'https://www.typescriptlang.org'
    },
    {
        src: 'https://img.shields.io/badge/React-087ea4?logo=React&logoColor=white',
        alt: 'React',
        url: 'https://react.dev'
    },
    {
        src: 'https://img.shields.io/badge/Material%20UI-007FFF?logo=MUI&logoColor=white',
        alt: 'Material UI',
        url: 'https://mui.com'
    },
    {
        src: 'https://img.shields.io/badge/CSS3-1572B6?logo=CSS3&logoColor=white',
        alt: 'CSS3',
        url: 'https://www.w3.org/Style/CSS'
    }
] as const;

const themeColor = '#1976d2';

const creator =  {
    url: 'https://github.com/jaeuuon',
    name: 'jaeuuon'
} as const;

const Footer = () => {
    return (
        <div id="div-footer">
            <Grid id="grid-footer" container>
                <Grid id="grid-footer-creator" item xs={6}>
                    <p>Created by <Tooltip title="GitHub profile" placement="top" arrow><span onClick={() => window.open(creator.url)}>{creator.name}</span></Tooltip>.</p>
                </Grid>
                <Grid id="grid-footer-theme-color" item xs={6}>
                    <p>Theme color is <span style={{ backgroundColor: themeColor }}>{themeColor}</span></p>
                </Grid>
                <Grid id="grid-footer-skill" item xs={12}>
                    {skillBadges.map((skillBadge, index) =>
                        <img key={`img-footer-skill-${index}`} src={skillBadge.src} alt={skillBadge.alt} onClick={() => window.open(skillBadge.url)} />
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;
