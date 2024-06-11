import { useState } from 'react';

import { Button } from '@mui/material';

import TextField from '../../components/common/TextField';

import LoginParams from '../../types/params/pages/popup/login';

import { getOnChange } from '../../common/utils';

const Login = () => {
    const [user, setUser] = useState<LoginParams>({});

    const onChange = getOnChange(user, setUser);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(user);
    };

    return (
        <form id="form-login" onSubmit={onSubmit}>
            <div>
                <TextField name="email" label="Email" isFullWidth={true} autoComplete="email" value={user.email} onChange={onChange} />
            </div>
            <div>
                <TextField type="password" name="password" label="Password" isFullWidth={true} autoComplete="current-password" value={user.password} onChange={onChange} />
            </div>
            <div id="div-login-submit">
                <Button type="submit" variant="contained">Login</Button>
            </div>
        </form>
    );
};

export default Login;
