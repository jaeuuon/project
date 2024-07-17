import { useTheme } from '@mui/material/styles';
import { Grid, Tooltip } from '@mui/material';

import { creator, skills } from 'enums/layout/footer';

import { getBorderColor } from 'common/utils';

const onClick = () => window.open(creator.URL);

const Footer = () => {
    const theme = useTheme();
    const themeColor = theme.palette.primary.main;

    return (
        <div id="layout-footer" style={{ borderColor: getBorderColor(theme) }}>
            <Grid id="layout-footer-grid" container>
                <Grid id="layout-footer-grid-creator" item xs={6}>
                    <p>Created by <Tooltip placement="top" arrow title="GitHub profile"><span onClick={onClick}>{creator.NAME}</span></Tooltip>.</p>
                </Grid>
                <Grid id="layout-footer-grid-theme-color" item xs={6}>
                    <p>Theme color is <span className="border-radius" style={{ backgroundColor: themeColor }}>{themeColor}</span></p>
                </Grid>
                <Grid id="layout-footer-grid-skills" item xs={12}>
                    {skills.map(({ SRC, ALT, URL }, index) =>
                        <img key={`img-footer-skills-${index}`} src={SRC} alt={ALT} onClick={() => window.open(URL)} />
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;
