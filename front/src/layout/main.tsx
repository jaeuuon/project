import Grid from '@mui/material/Grid';

import Sidebar from './main/sidebar';
import Content from './main/content';

const Main = () => {
    return (
        <div id="div-main">
            <Grid id="grid-main" container>
                <Sidebar />
                <Content />
            </Grid>
        </div>
    );
};

export default Main;
