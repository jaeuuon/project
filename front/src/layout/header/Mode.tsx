import { Grid, Button, Tooltip } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from 'hooks';
import { light, dark } from 'store/layout/header/mode';

import styles from 'assets/styles/layout/header/mode.module.scss';

const Mode = () => {
    const dispatch = useAppDispatch();
    const isLight = useAppSelector((state) => state.mode.value) === 'light';

    const onClick = () => dispatch(isLight ? dark() : light());

    return (
        <Grid id={styles.grid} item xs="auto">
            <Tooltip placement="bottom-end" arrow title="Light / Dark">
                <Button id={styles.button} variant="outlined" onClick={onClick}>
                    {isLight ? <LightModeOutlined /> : <DarkModeOutlined />}
                </Button>
            </Tooltip>
        </Grid>
    );
};

export default Mode;
