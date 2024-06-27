import { useTheme } from '@mui/material/styles';
import { Grid, Button, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';

import type PopupType from 'types/layout/popup';

import Modal from 'layout/Modal';

import { getBorderColor } from 'common/utils';

const Popup = ({
    isVisible, setVisible,
    width, icon, label, content
}: PopupType) => {
    const theme = useTheme();
    const borderColor = getBorderColor(theme);

    const onClick = () => setVisible(false);

    return (
        <>
            <Modal isVisible={isVisible} setVisible={setVisible} />
            {isVisible &&
                <div id="div-popup" style={{ width, backgroundColor: theme.palette.background.paper, borderColor }}>
                    <Grid id="grid-popup-header" container style={{ color: theme.palette.primary.main, borderColor }}>
                        <Grid id="grid-popup-header-icon" item xs="auto">{icon}</Grid>
                        <Grid id="grid-popup-header-label" item xs>
                            <p>{label}</p>
                        </Grid>
                        <Grid id="grid-popup-header-close" item xs="auto">
                            <Tooltip title="Close" placement="bottom-end" arrow>
                                <Button onClick={onClick}>
                                    <Close />
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <div id="div-popup-content">
                        <div>{content}</div>
                    </div>
                </div>
            }
        </>
    );
};

export default Popup;
