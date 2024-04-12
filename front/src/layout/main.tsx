import Grid from '@mui/material/Grid';

const Main = () => {
    return (
        <Grid id="div-layout-center" container>
            <Grid className="div-layout-center-sidebar" item xs="auto">
                <div className="div-layout-box">Sidebar</div>
            </Grid>
            <Grid item xs>
                <div className="div-layout-box">Main</div>
            </Grid>
        </Grid>
    );
};

export default Main;
