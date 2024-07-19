import { Grid } from '@mui/material';

import { skills } from 'enums/layout/footer/skills';

import styles from 'assets/styles/layout/footer/skills.module.scss';

const Skills = () => {
    return (
        <Grid id={styles.skills} item xs={12}>
            {skills.map(({ SRC, ALT, URL }, index) =>
                <img key={`img-footer-skills-${index}`} className={styles.img} src={SRC} alt={ALT} onClick={() => window.open(URL)} />
            )}
        </Grid>
    );
};

export default Skills;
