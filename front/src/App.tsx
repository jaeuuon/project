import { useEffect } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { type PaletteMode, type ThemeOptions, CssBaseline } from '@mui/material';

import { useAppSelector, useAppDispatch } from 'hooks';
import { mql, light, dark } from 'store/palette';

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
    typography: {
        button: { textTransform: 'none' }
    }
});

const App = () => {
    const { mode } = useAppSelector(({ palette }) => palette);
    const theme = createTheme(getThemeOptions(mode));

    const dispatch = useAppDispatch();

    useEffect(() => {
        const onChange = ({ matches }: MediaQueryListEvent) => dispatch(matches ? light() : dark());
        mql.addEventListener('change', onChange);

        return () => {
            mql.removeEventListener('change', onChange);
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <p>App</p>
        </ThemeProvider>
    );
};

export default App;
