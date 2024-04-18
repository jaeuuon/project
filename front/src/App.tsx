import { useEffect } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';

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
            <Header />
            <Main />
            <Footer />
        </ThemeProvider>
    );
};

export default App;
