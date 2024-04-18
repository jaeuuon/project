import { Routes, Route } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import Home from '../../pages/home';
import Information from '../../pages/information';

const Content = () => {
    return (
        <Grid id="grid-main-content" item xs>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/information" element={<Information />} />
            </Routes>
        </Grid>
    );
};

export default Content;
