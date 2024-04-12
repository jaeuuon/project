import Grid from '@mui/material/Grid';

const Main = () => {
    return (
        <div id="div-layout-main">
            <Grid id="div-layout-main-content" container>
                <Grid id="div-layout-main-content-sidebar" item xs="auto">Sidebar</Grid>
                <Grid item xs>Main</Grid>
            </Grid>
        </div>
    );
};

export default Main;
