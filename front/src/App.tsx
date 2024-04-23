import { useEffect } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './layout/header';
import Main from './layout/main';
import Footer from './layout/footer';

import './assets/scss/app.scss';

const theme = createTheme({
    typography: {
        button: {
            textTransform: 'none'
        }
    }
});

const App = () => {
    useEffect(() => { 
        window.onbeforeunload = () => window.scrollTo(0, 0);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Main />
            <Footer />
        </ThemeProvider>
    );
};

export default App;
