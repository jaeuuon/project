import { useState, useEffect } from 'react';

import { PaletteMode } from '@mui/material/index';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './layout/header';
import Main from './layout/main';
import Footer from './layout/footer';

import './assets/scss/app.scss';

const getMql = () => window.matchMedia("(prefers-color-scheme: light)");

const App = () => {
    const [mode, setMode] = useState<PaletteMode>(getMql().matches ? 'light' : 'dark');

    const theme = createTheme({
        palette: {
            mode: mode
        },
        typography: {
            button: {
                textTransform: 'none'
            }
        }
    });

    useEffect(() => {
        const mql = getMql();

        const onChange = ({ matches }: { matches: boolean; }) => setMode(matches ? 'light' : 'dark');
        const onBeforeunload = () => window.scrollTo(0, 0);

        mql.addEventListener('change', onChange);
        window.addEventListener('beforeunload', onBeforeunload);

        return () => {
            mql.removeEventListener('change', onChange);
            window.removeEventListener('beforeunload', onBeforeunload);
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header mode={mode} setMode={setMode} />
            <Main />
            <Footer />
        </ThemeProvider>
    );
};

export default App;
