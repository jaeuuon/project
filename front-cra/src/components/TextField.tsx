import { forwardRef, ForwardedRef } from 'react';

import { TextField as MaterialTextField } from '@mui/material';

import type TextFieldType from 'types/components/textField';

const TextField = forwardRef((
    {
        type, name, value, autoComplete,
        isFullWidth, isError, label, onChange
    }: TextFieldType,
    inputRef: ForwardedRef<HTMLInputElement>
) => {
    return (
        <MaterialTextField type={type} name={name} value={value || ''} autoComplete={autoComplete}
            fullWidth={isFullWidth} size="small" margin="dense" variant="outlined" error={isError} label={label} onChange={onChange}
            inputRef={inputRef}
        />
    );
});

export default TextField;