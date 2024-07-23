import { forwardRef, ForwardedRef, useState, memo } from 'react';

import { FormControl, InputLabel, OutlinedInput, InputAdornment, TextField as MaterialTextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import type TextFieldType from 'types/components/pages/textField';

import styles from 'assets/styles/components/pages/text-field.module.scss';

const TextField = forwardRef((
    {
        type, name, value, autoComplete,
        isFullWidth = true, isError = false, label, onChange
    }: TextFieldType,
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
                        <OutlinedInput className={styles.outlinedInput} type={isVisiblePassword ? 'text' : 'password'} name={name} value={value || ''} autoComplete={autoComplete}
                            endAdornment={
                                <InputAdornment position="end">
                                    {isVisiblePassword
                                        ? <Visibility className={styles.inputAdornment} onClick={onClick} />
                                        : <VisibilityOff className={styles.inputAdornment} onClick={onClick} />
                                    }
                                </InputAdornment>
                            }
                            error={isError} label={label} onChange={onChange}
                            inputRef={inputRef}
                        />
                    </FormControl>
                </>
                : <MaterialTextField className={styles.textField} type={type} name={name} value={value || ''} autoComplete={autoComplete}
                    fullWidth={isFullWidth} size="small" variant="outlined" error={isError} label={label} onChange={onChange}
                    inputRef={inputRef}
                />
            }
        </>
    );
});

export default memo(TextField);
