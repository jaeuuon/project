import { forwardRef, ForwardedRef, useState } from 'react';

import { FormControl, InputLabel, OutlinedInput, InputAdornment, TextField as MuiTextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import type Component from 'types/components/pages/textField';

import styles from 'assets/styles/components/pages/text-field.module.scss';

const TextField = forwardRef((
    {
        type, name, value, label, autoComplete = 'off',
        isFullWidth = true, isError, onChange
    }: Component,
    inputRef?: ForwardedRef<HTMLInputElement>
) => {
    const [isVisiblePassword, setVisiblePassword] = useState(false);
    const onClick = () => setVisiblePassword(!isVisiblePassword);

    return (
        <>
            {type === 'password'
                ? <>
                    <FormControl className={styles.textField} fullWidth={isFullWidth} size="small" variant="outlined">
                        <InputLabel error={isError}>{label}</InputLabel>
                        <OutlinedInput type={isVisiblePassword ? 'text' : 'password'} name={name} value={value ?? ''} label={label} autoComplete={autoComplete}
                            error={isError} onChange={onChange}
                            endAdornment={
                                <InputAdornment position="end" onClick={onClick}>
                                    {isVisiblePassword
                                        ? <Visibility />
                                        : <VisibilityOff />
                                    }
                                </InputAdornment>
                            }
                            inputRef={inputRef}
                        />
                    </FormControl>
                </>
                : <MuiTextField className={styles.textField} type={type} name={name} value={value ?? ''} label={label} autoComplete={autoComplete}
                    fullWidth={isFullWidth} size="small" variant="outlined" error={isError} onChange={onChange}
                    inputRef={inputRef}
                />
            }
        </>
    );
});

export default TextField;
