import { Theme } from '@mui/material/styles';

export const isThemeLight = (theme: Theme) => {
    return theme.palette.mode === 'light';
}

export const getCssClassByTheme = (theme: Theme) => {
    return isThemeLight(theme) ? 'mode-light' : 'mode-dark';
};

export const getOnChange = (state: any, setState: React.Dispatch<React.SetStateAction<any>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim() !== '') {
            setState({ ...state, [e.target.name]: e.target.value });
        } else {
            delete state[e.target.name];

            setState({ ...state });
        }
    };
}
