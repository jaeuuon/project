import { useEffect } from 'react';

import { type PaletteMode, type ThemeOptions, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useAppSelector, useAppDispatch } from 'hooks';
import { getMql, light, dark } from 'store/layout/header/mode';

import Header from 'layout/Header';
import Main from 'layout/Main';
import Footer from 'layout/Footer';
import Snackbar from 'layout/Snackbar';

import '@fontsource/roboto/400.css';
import 'assets/styles/app.scss';

const getThemeOptions = (mode: PaletteMode): ThemeOptions => ({
    components: {
        MuiAlert: {
            styleOverrides: {
                icon: { alignItems: 'center' },
                message: { flexGrow: 1, textAlign: 'center' }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: { fontWeight: 'bold' }
            }
        },
        MuiList: {
            styleOverrides: {
                root: { padding: 0 }
            }
        },
        MuiTable: {
            styleOverrides: {
                root: { margin: 'auto' }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: { fontWeight: 'bold' }
            }
        },
        MuiPagination: {
            styleOverrides: {
                ul: { justifyContent: 'center' }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: { textAlign: 'center' }
            }
        }
    },
    palette: { mode: mode },
    typography: { button: { textTransform: 'none' } }
});

const App = () => {
    const mode = useAppSelector((state) => state.mode.value);
    const theme = createTheme(getThemeOptions(mode));

    const dispatch = useAppDispatch();

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
