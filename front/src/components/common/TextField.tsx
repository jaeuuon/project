import { forwardRef, ForwardedRef } from 'react';

import { TextField as MaterialTextField } from '@mui/material';

import type TextFieldType from 'types/components/common/textField';

const TextField = forwardRef((
    {
        type, name, label,
        isFullWidth, autoComplete,
        value, isError, onChange
    }: TextFieldType,
    inputRef: ForwardedRef<HTMLInputElement>
) => {
    return (
        <MaterialTextField type={type} name={name} label={label}
            variant="outlined" margin="dense" size="small" fullWidth={isFullWidth} autoComplete={autoComplete}
            value={value || ''} error={isError} inputRef={inputRef} onChange={onChange} />
    );
});

export default TextField;
