import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { getMql, light, dark } from 'store/layout/header/mode';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import Header from 'layout/Header';
import Main from 'layout/Main';
import Footer from 'layout/Footer';
import Snackbar from 'layout/Snackbar';

import '@fontsource/roboto/400.css';

import 'assets/styles/app.scss';

const App = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.mode.value);

    const theme = createTheme({
        palette: { mode: mode },
        typography: { button: { textTransform: 'none' } }
    });

    useEffect(() => {
        const mql = getMql();

        const onChange = ({ matches }: { matches: boolean; }) => dispatch(matches ? light() : dark());
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
            <Header />
            <Main />
            <Footer />
            <Snackbar />
        </ThemeProvider>
    );
};

export default App;
