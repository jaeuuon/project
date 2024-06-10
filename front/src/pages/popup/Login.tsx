import { Button } from '@mui/material';

import TextField from '../../components/common/TextField';

const Login = () => {
    return (
        <div id="div-login">
            <div>
                <TextField name="email" label="Email" isFullWidth={true} autoComplete="email" />
            </div>
            <div>
                <TextField type="password" name="password" label="Password" isFullWidth={true} autoComplete="current-password" />
            </div>
            <div id="div-login-submit">
                <Button variant="contained">Login</Button>
            </div>
        </div>
    );
};

export default Login;
