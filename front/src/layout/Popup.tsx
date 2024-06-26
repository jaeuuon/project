import { useTheme } from '@mui/material/styles';
import { Grid, Button, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';

import type PopupType from 'types/layout/popup';

import { getBorderColor } from 'common/utils';

import Modal from 'components/common/Modal';

const Popup = ({
    isVisible, setVisibleFalse,
    width, icon, label, content
}: PopupType) => {
    const theme = useTheme();
    const borderColor = getBorderColor(theme);

    return (
        <>
            <Modal isVisible={isVisible} setVisibleFalse={setVisibleFalse} />
            {isVisible &&
                <div id="div-popup" style={{ width, backgroundColor: theme.palette.background.paper, borderColor }}>
                    <Grid id="grid-popup-header" container style={{ color: theme.palette.primary.main, borderColor }}>
                        <Grid id="grid-popup-header-icon" item xs="auto">{icon}</Grid>
                        <Grid id="grid-popup-header-label" item xs>
                            <p>{label}</p>
                        </Grid>
                        <Grid id="grid-popup-header-close" item xs="auto">
                            <Tooltip title="Close" placement="bottom-end" arrow>
                                <Button onClick={setVisibleFalse}>
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
