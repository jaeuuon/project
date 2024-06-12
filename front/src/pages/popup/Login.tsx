import { useState } from 'react';

import { Button } from '@mui/material';

import TextField from '../../components/common/TextField';

import { postLogin } from '../../apis/pages/popup/login';
import LoginParams from '../../types/data/request/pages/popup/login';

import Response from '../../types/common/response';
import { status } from '../../types/common/response';

import { getOnChange } from '../../common/utils';

const Login = () => {
    const [user, setUser] = useState<LoginParams>({});

    const onChange = getOnChange(user, setUser);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response: Response = await postLogin(user);

        if (response.status === status.SUCCESS) {
            console.log("성공 : ", response);
        } else {
            console.log("실패 : ", response);
        }
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
