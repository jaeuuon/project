import { useTheme } from '@mui/material/styles';
import { Grid, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

import Modal from './modal';

const Popup = ({
    isOpen, setOpen,
    width, icon, label
}: {
    isOpen: boolean; setOpen: (setOpen: boolean) => void;
    width: number; icon: JSX.Element; label: string;
}) => {
    const theme = useTheme();

    return (
        <>
            <Modal isOpen={isOpen} setOpen={setOpen} />
            {isOpen &&
                <div id="div-popup" style={{ width: width, backgroundColor: theme.palette.background.paper }}>
                    <Grid id="grid-popup-header" container style={{ color: theme.palette.primary.main }}>
                        <Grid id="grid-popup-header-icon" item xs="auto">{icon}</Grid>
                        <Grid id="grid-popup-header-label" item xs>
                            <p>{label}</p>
                        </Grid>
                        <Grid id="grid-popup-header-close" item xs="auto">
                            <Button onClick={() => setOpen(false)}>
                                <Close />
                            </Button>
                        </Grid>
                    </Grid>
                    <div id="div-popup-content">
                        <p>This is popup !!!</p>
                    </div>
                </div>
            }
        </>
    );
};

export default Popup;
