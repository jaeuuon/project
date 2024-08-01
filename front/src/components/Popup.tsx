import { useTheme } from '@mui/material/styles';
import { Grid, Button, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';

import type Component from 'types/components/popup';

import { getBorderColor } from 'common/util';

import Modal from 'components/Modal';

import styles from 'assets/styles/components/popup.module.scss';

const Popup = ({
    width, severity, icon, label, content,
    isVisible, setVisibleFalse
}: Component) => {
    const { zIndex: { modal: zIndex }, palette } = useTheme();
    const borderColor = getBorderColor(palette, severity);
    const color = severity ?? 'primary';

    return (
        <>
            <Modal isVisible={isVisible} setVisibleFalse={setVisibleFalse} />
            {isVisible &&
                <div id={styles.popup} style={{ zIndex, width, borderColor, backgroundColor: palette.background.paper }}>
                    <Grid container style={{ color: palette[color].main, borderColor }}>
                        <Grid item xs="auto">{icon}</Grid>
                        <Grid item xs>
                            <p>{label}</p>
                        </Grid>
                        <Grid item xs="auto">
                            <Tooltip placement="bottom-end" arrow title="Close">
                                <Button color={color} onClick={setVisibleFalse}>
                                    <Close />
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <div>
                        <div>{content}</div>
                    </div>
                </div>
            }
        </>
    );
};

export default Popup;
