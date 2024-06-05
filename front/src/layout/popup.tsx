import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

import Modal from './modal';

const Popup = ({
    isOpen, setOpen,
    icon, label
}: {
    isOpen: boolean; setOpen: (setOpen: boolean) => void;
    icon: JSX.Element; label: string;
}) => {
    const theme = useTheme();

    return (
        <>
            <Modal isOpen={isOpen} setOpen={setOpen} />
            {isOpen &&
                <div id="div-popup" style={{ backgroundColor: theme.palette.background.paper }}>
                    <Grid id="grid-popup-header" container style={{ color: theme.palette.primary.main }}>
                        <Grid id="grid-popup-header-icon" item xs="auto">{icon}</Grid>
                        <Grid id="grid-popup-header-label" item xs>
                            <span>{label}</span>
                        </Grid>
                    </Grid>
                    <div id="div-popup-content">
                        <span>This is popup !!!</span>
                    </div>
                </div>
            }
        </>
    );
};

export default Popup;
