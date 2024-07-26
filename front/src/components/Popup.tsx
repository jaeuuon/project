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
    const { zIndex: { modal }, palette } = useTheme();
    const borderColor = getBorderColor(palette, severity);

    return (
        <>
            <Modal isVisible={isVisible} setVisibleFalse={setVisibleFalse} />
            {isVisible &&
                <div id={styles.popup} style={{ zIndex: modal, width, borderColor, backgroundColor: palette.background.paper }}>
                    <Grid id={styles.header} container style={{ color: palette[severity ?? 'primary'].main, borderColor }}>
                        <Grid id={styles.icon} item xs="auto">{icon}</Grid>
                        <Grid id={styles.label} item xs>
                            <p>{label}</p>
                        </Grid>
                        <Grid id={styles.close} item xs="auto">
                            <Tooltip title="Close" placement="bottom-end" arrow>
                                <Button color={severity ?? 'primary'} onClick={setVisibleFalse}>
                                    <Close />
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <div id={styles.content}>
                        <div>{content}</div>
                    </div>
                </div>
            }
        </>
    );
};

export default Popup;
