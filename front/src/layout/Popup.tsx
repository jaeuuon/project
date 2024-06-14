import { useTheme } from '@mui/material/styles';
import { Grid, Button, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';

import PopupType from '../types/layout/popup';

import Modal from './Modal';

const Popup = ({
    isVisible, setVisible,
    width, icon, label, content
}: PopupType) => {
    const theme = useTheme();

    return (
        <>
            <Modal isVisible={isVisible} setVisible={setVisible} />
            {isVisible &&
                <div id="div-popup" style={{ width: width, backgroundColor: theme.palette.background.paper }}>
                    <Grid id="grid-popup-header" container style={{ color: theme.palette.primary.main }}>
                        <Grid id="grid-popup-header-icon" item xs="auto">{icon}</Grid>
                        <Grid id="grid-popup-header-label" item xs>
                            <p>{label}</p>
                        </Grid>
                        <Grid id="grid-popup-header-close" item xs="auto">
                            <Tooltip title="Close" placement="bottom-end" arrow>
                                <Button onClick={() => setVisible(false)}>
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
