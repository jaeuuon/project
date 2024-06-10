import { Routes, Route } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import Home from '../../pages/Home';
import Notice from '../../pages/home/Notice';

import Information from '../../pages/Information';
import Contact from '../../pages/information/Contact';

const Content = () => {
    return (
        <Grid id="grid-main-content" item xs>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/information" element={<Information />} />
                    <Route path="/information/contact" element={<Contact />} />
                </Routes>
            </div>
        </Grid>
    );
};

export default Content;
