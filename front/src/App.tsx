import { useEffect } from 'react';

import { type PaletteMode, type ThemeOptions, createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import { useAppSelector, useAppDispatch } from 'hooks';
import { mql, light, dark } from 'store/palette';

import { getGreyBorderColor, getGreyBackgroundColor} from 'common/util';

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
        MuiAvatar: {
            styleOverrides: {
                root: { cursor: 'pointer' }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: { minWidth: 0, fontWeight: 'bold' }
            }
        },
        MuiInputAdornment: {
            styleOverrides: {
                positionEnd: { position: 'absolute', right: '14px', cursor: 'pointer' }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                adornedEnd: { paddingRight: '0 !important' },
                inputAdornedEnd: { paddingRight: '43px !important' }
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
        MuiTableHead: {
            styleOverrides: {
                root: { backgroundColor: getGreyBackgroundColor(mode, false) }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: { padding: '5px', border: `1px solid ${getGreyBorderColor(mode)}` },
                head: { fontWeight: 'bold' },
                body: { overflowWrap: 'anywhere' }
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
    typography: {
        button: { textTransform: 'none' }
    }
});

const App = () => {
    const mode = useAppSelector(({ palette: { mode } }) => mode);
    const theme = createTheme(getThemeOptions(mode));

    const dispatch = useAppDispatch();

    useEffect(() => {
        const onChange = ({ matches }: MediaQueryListEvent) => dispatch(matches ? light() : dark());
        mql.addEventListener('change', onChange);

        const onBeforeunload = () => window.scrollTo(0, 0);
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
