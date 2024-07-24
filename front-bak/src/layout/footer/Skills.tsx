import { Grid } from '@mui/material';

import { skills } from 'enums/layout/footer/skills';

import styles from 'assets/styles/layout/footer/skills.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const Skills = () => {
    const className = [styles.img, commonStyles.displayBlock].join(' ');

    return (
        <Grid id={styles.skills} item xs={12}>
            <Grid container justifyContent="center">
                {skills.map(({ SRC, ALT, URL }, index) =>
                    <Grid key={`img-footer-skills-${index}`} item xs="auto">
                        <img className={className} src={SRC} alt={ALT} onClick={() => window.open(URL)} />
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default Skills;
