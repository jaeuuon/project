import { TextField as MaterialTextField } from '@mui/material';

import TextFieldType from '../../types/components/common/textField';

const TextField = ({
    type, name, label, isFullWidth, autoComplete
}: TextFieldType) => {
    return (
        <MaterialTextField type={type} name={name} label={label} variant="outlined" margin="dense" size="small" fullWidth={isFullWidth} autoComplete={autoComplete} />
    );
};

export default TextField;
