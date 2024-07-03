import { Routes, Route } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import Home from 'pages/Home';
import Notice from 'pages/home/Notice';

import Information from 'pages/Information';
import Contact from 'pages/information/Contact';

import Security from 'pages/Security';
import LoginHistory from 'pages/security/LoginHistory';

const Content = () => {
    return (
        <Grid id="layout-main-grid-content" item xs>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/information" element={<Information />} />
                    <Route path="/information/contact" element={<Contact />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/security/history" element={<LoginHistory />} />
                </Routes>
            </div>
        </Grid>
    );
};

export default Content;
