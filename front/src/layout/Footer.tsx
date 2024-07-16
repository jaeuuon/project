import { useTheme } from '@mui/material/styles';
import { Grid, Tooltip } from '@mui/material';

import { creator, skills } from 'enums/layout/footer';

import { getBorderColor } from 'common/utils';

const onClick = () => window.open(creator.URL);

const Footer = () => {
    const theme = useTheme();

    return (
        <div id="layout-footer" style={{ borderColor: getBorderColor(theme) }}>
            <Grid id="layout-footer-grid" container>
                <Grid id="layout-footer-grid-creator" item xs={6}>
                    <p>Created by <Tooltip title="GitHub profile" placement="top" arrow><span onClick={onClick}>{creator.NAME}</span></Tooltip>.</p>
                </Grid>
                <Grid id="layout-footer-grid-theme-color" item xs={6}>
                    <p>Theme color is <span className="border-radius" style={{ backgroundColor: theme.palette.primary.main }}>{theme.palette.primary.main}</span></p>
                </Grid>
                <Grid id="layout-footer-grid-skill" item xs={12}>
                    {skills.map(({ SRC, ALT, URL }, index) =>
                        <img key={`img-footer-skill-${index}`} src={SRC} alt={ALT} onClick={() => window.open(URL)} />
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;
