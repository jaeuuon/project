import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import type { RootState } from 'types/modules';

import { getMql, setLight, setDark } from 'modules/layout/header/paletteMode';

import Header from 'layout/Header';
import Main from 'layout/Main';
import Footer from 'layout/Footer';
import Snackbar from 'layout/Snackbar';

import 'assets/scss/app.scss';

const App = () => {
    const dispatch = useDispatch();
    const paletteMode = useSelector((state: RootState) => state.paletteMode);

    const theme = createTheme({
        palette: {
            mode: paletteMode
        },
        typography: {
            button: {
                textTransform: 'none'
            }
        }
    });

    useEffect(() => {
        const mql = getMql();

        const onChange = ({ matches }: { matches: boolean; }) => dispatch(matches ? setLight() : setDark());
        const onBeforeunload = () => window.scrollTo(0, 0);

        mql.addEventListener('change', onChange);
        window.addEventListener('beforeunload', onBeforeunload);

        return () => {
            mql.removeEventListener('change', onChange);
            window.removeEventListener('beforeunload', onBeforeunload);
        };
    }, [dispatch]);

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
