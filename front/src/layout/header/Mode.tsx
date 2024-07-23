import { Grid, Button, Tooltip } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

import { useAppSelector, useAppDispatch } from 'hooks';
import { light, dark } from 'store/layout/header/mode';

import styles from 'assets/styles/layout/header/mode.module.scss';

const Mode = () => {
    const isLight = useAppSelector((state) => state.mode.value) === 'light';
    const dispatch = useAppDispatch();

    const onClick = () => dispatch(isLight ? dark() : light());

    return (
        <Grid id={styles.mode} item xs="auto">
            <Tooltip placement="bottom-end" arrow title="Light / Dark">
                <Button id={styles.button} variant="outlined" onClick={onClick}>
                    {isLight ? <LightModeOutlined /> : <DarkModeOutlined />}
                </Button>
            </Tooltip>
        </Grid>
    );
};

export default Mode;
