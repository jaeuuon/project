import { Grid } from '@mui/material';

import { SKILLS } from 'constants/layout/footer/skills';

import styles from 'assets/styles/layout/footer/skills.module.scss';

const Skills = () =>
    <Grid id={styles.skills} item xs={12}>
        <Grid container justifyContent="center">
            {SKILLS.map(({ SRC, ALT, URL }, index) =>
                <Grid key={`img-footer-skills-${index}`} item xs="auto">
                    <img src={SRC} alt={ALT} onClick={() => window.open(URL)} />
                </Grid>
            )}
        </Grid>
    </Grid>
;

export default Skills;
