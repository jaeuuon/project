import { useRef, useState } from 'react';

import { Button, Alert } from '@mui/material';

import { statusCode } from '../../enums/common/status';
import { emailCode, passwordCode } from '../../enums/errors/pages/popup/login';

import type { Params } from '../../types/apis/pages/popup/login';
import type Response from '../../types/common/response';
import type { CodeMessage } from '../../types/common/code';

import { postLogin } from '../../apis/pages/popup/login';

import TextField from '../../components/common/TextField';

import { getOnChange, includesCode } from '../../common/utils';

const Login = () => {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState<Params>({});

    const [code, setCode] = useState<string>();
    const [message, setMessage] = useState<string>();

    const onChange = getOnChange(user, setUser);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validation()) {
            const response: Response = await postLogin(user);

            if (response.status === statusCode.SUCCESS) {
                const content: Content = response.data.content[0];













                var base64Url = content.access.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

                console.log(jsonPayload);

            } else {
                const error = response.errors[0];
                const code = error.code;

                if (includesCode(emailCode, code)) {
                    email.current?.focus();
                } else if (includesCode(passwordCode, code)) {
                    password.current?.focus();
                }

                setCode(code);
                setMessage(error.message);
            }
        }
    };

    const validation = () => {
        if (!user.email) {
            return error(email, emailCode.BLANK);
        } else if (user.email.length < 4 || user.email.length > 100) {
            return error(email, emailCode.SIZE);
        } else if (!user.email.match(/^.+@.+$/)) {
            return error(email, emailCode.FORMAT);
        } else if (!user.password) {
            return error(password, passwordCode.BLANK);
        } else if (user.password.length < 4 || user.password.length > 50) {
            return error(password, passwordCode.SIZE);
        }

        return true;
    };

    const error = (ref: React.RefObject<HTMLInputElement>, codeMessage: CodeMessage) => {
        ref.current?.focus();

        setCode(codeMessage.CODE);
        setMessage(codeMessage.MESSAGE);

        return false;
    }

    return (
        <form id="form-login" onSubmit={onSubmit}>
            <div>
                <TextField name="email" label="Email" isFullWidth={true} autoComplete="email" value={user.email} isError={includesCode(emailCode, code)} ref={email} onChange={onChange} />
            </div>
            <div>
                <TextField type="password" name="password" label="Password" isFullWidth={true} autoComplete="current-password" value={user.password} isError={includesCode(passwordCode, code)} ref={password} onChange={onChange} />
            </div>
            <div id="div-login-alert">
                {message &&
                    <Alert severity="error">
                        <p>{message}</p>
                    </Alert>
                }
            </div>
            <div id="div-login-submit">
                <Button type="submit" variant="contained">Login</Button>
            </div>
        </form>
    );
};

export default Login;
