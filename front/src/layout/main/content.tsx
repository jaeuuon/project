import { Routes, Route } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import Home from '../../pages/home';
import Notice from '../../pages/home/notice';

import Information from '../../pages/information';
import Contact from '../../pages/information/contact';

const Content = () => {
    return (
        <Grid id="grid-main-content" item xs>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/information" element={<Information />} />
                <Route path="/information/contact" element={<Contact />} />
            </Routes>
        </Grid>
    );
};

export default Content;
