import { Grid, Tooltip } from '@mui/material';

import constant from '../common/constant';

const Footer = () => {
    return (
        <div id="div-footer">
            <Grid id="grid-footer" container>
                <Grid id="grid-footer-creator" item xs={6}>
                    <p>Created by <Tooltip title="GitHub profile" placement="top" arrow><span onClick={() => window.open(constant.FOOTER.CREATOR.URL)}>{constant.FOOTER.CREATOR.NAME}</span></Tooltip>.</p>
                </Grid>
                <Grid id="grid-footer-theme-color" item xs={6}>
                    <p>Theme color is <span style={{ backgroundColor: constant.FOOTER.THEME_COLOR }}>{constant.FOOTER.THEME_COLOR}</span></p>
                </Grid>
                <Grid id="grid-footer-skill" item xs={12}>
                    {constant.FOOTER.SKILL_BADGES.map((SKILL_BADGE, index) =>
                        <img key={`img-footer-skill-${index}`} src={SKILL_BADGE.SRC} alt={SKILL_BADGE.ALT} onClick={() => window.open(SKILL_BADGE.URL)} />
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;
