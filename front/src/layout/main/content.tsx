import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import Home from '../../pages/home';

const Content = () => {
    return (
        <Grid id="grid-main-content" item xs>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </Grid>
    );
};

export default Content;
