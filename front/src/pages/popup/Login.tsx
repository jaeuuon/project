import { useRef, useState } from 'react';

import { Button, Alert } from '@mui/material';

import TextField from '../../components/common/TextField';

import { postLogin } from '../../apis/pages/popup/login';
import LoginParams from '../../types/data/request/pages/popup/login';

import Response from '../../types/common/response';
import { statusCode } from '../../enums/common/status';
import { emailCode, passwordCode } from '../../enums/errors/pages/popup/login';

import { getOnChange, includes } from '../../common/utils';

const Login = () => {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState<LoginParams>({});

    const [code, setCode] = useState<string>();
    const [message, setMessage] = useState<string>();

    const onChange = getOnChange(user, setUser);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response: Response = await postLogin(user);

        if (response.status === statusCode.SUCCESS) {
            console.log("성공 : ", response);
        } else {
            const error = response.errors[0];
            const code = error.code;

            if (includes(emailCode, code)) {
                email.current?.focus();
            } else if (includes(passwordCode, code)) {
                password.current?.focus();
            }

            setCode(code);
            setMessage(error.message);
        }
    };

    return (
        <form id="form-login" onSubmit={onSubmit}>
            <div>
                <TextField name="email" label="Email" isFullWidth={true} autoComplete="email" value={user.email} isError={includes(emailCode, code)} ref={email} onChange={onChange} />
            </div>
            <div>
                <TextField type="password" name="password" label="Password" isFullWidth={true} autoComplete="current-password" value={user.password} isError={includes(passwordCode, code)} ref={password} onChange={onChange} />
            </div>
            <div id="div-login-alert">
                {message &&
                    <Alert severity="error">{message}</Alert>
                }
            </div>
            <div id="div-login-submit">
                <Button type="submit" variant="contained">Login</Button>
            </div>
        </form>
    );
};

export default Login;
