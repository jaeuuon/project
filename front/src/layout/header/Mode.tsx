import { memo } from 'react';

import { Grid, Button, Tooltip } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

import { useAppSelector, useAppDispatch } from 'hooks';
import { light, dark } from 'store/palette';

import styles from 'assets/styles/layout/header/mode.module.scss';

const Mode = memo(() => {
    const isLight = useAppSelector(({ palette: { mode } }) => mode) === 'light';

    const dispatch = useAppDispatch();
    const onClick = () => dispatch(isLight ? dark() : light());

    return (
        <Grid id={styles.mode} item xs="auto">
            <Tooltip placement="bottom-end" arrow title="Light / Dark">
                <Button variant="outlined" onClick={onClick}>
                    {isLight ? <LightModeOutlined /> : <DarkModeOutlined />}
                </Button>
            </Tooltip>
        </Grid>
    );
});

export default Mode;
