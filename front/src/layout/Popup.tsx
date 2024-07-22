import { useTheme } from '@mui/material/styles';
import { Grid, Button, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';

import type PopupType from 'types/layout/popup';

import { getBorderColor } from 'common/utils';

import Modal from 'components/Modal';

import styles from 'assets/styles/layout/popup.module.scss';

const Popup = ({
    isVisible, setVisibleFalse,
    width, severity = 'primary', icon, label, content
}: PopupType) => {
    const theme = useTheme();
    const borderColor = getBorderColor(theme, severity);

    return (
        <>
            <Modal isVisible={isVisible} setVisibleFalse={setVisibleFalse} />
            {isVisible &&
                <div id={styles.popup} style={{ zIndex: theme.zIndex.modal, width, borderColor, backgroundColor: theme.palette.background.paper }}>
                    <Grid id={styles.header} container style={{ color: theme.palette[severity].main, borderColor }}>
                        <Grid id={styles.icon} item xs="auto">{icon}</Grid>
                        <Grid id={styles.label} item xs>
                            <p id={styles.p}>{label}</p>
                        </Grid>
                        <Grid id={styles.close} item xs="auto">
                            <Tooltip title="Close" placement="bottom-end" arrow>
                                <Button id={styles.button} color={severity} onClick={setVisibleFalse}>
                                    <Close />
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <div id={styles.content}>
                        <div id={styles.div}>{content}</div>
                    </div>
                </div>
            }
        </>
    );
};

export default Popup;
