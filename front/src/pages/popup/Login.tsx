import { useRef, useState } from 'react';

import { Button, Alert } from '@mui/material';

import { statusCode } from '../../enums/apis/status';
import { emailErrorCode, passwordErrorCode } from '../../enums/apis/pages/popup/login';

import type { Params, default as Content } from '../../types/apis/pages/popup/login';
import type Response from '../../types/apis/response';
import type { CodeMessage } from '../../types/apis/code';
import type Payload from '../../types/pages/popup/login';

import { postLogin } from '../../apis/pages/popup/login';

import TextField from '../../components/common/TextField';

import { getOnChange, getPayload, includesCode } from '../../common/utils';

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
                const payload: Payload = getPayload(content.access);

                console.log(payload);

                /*
                    User에 이름 및 역할 세팅.
                */
            } else {
                const error = response.errors[0];
                const code = error.code;

                if (includesCode(emailErrorCode, code)) {
                    email.current?.focus();
                } else if (includesCode(passwordErrorCode, code)) {
                    password.current?.focus();
                }

                setCode(code);
                setMessage(error.message);
            }
        }
    };

    const validation = () => {
        if (!user.email) {
            return error(email, emailErrorCode.BLANK);
        } else if (user.email.length < 4 || user.email.length > 100) {
            return error(email, emailErrorCode.SIZE);
        } else if (!user.email.match(/^.+@.+$/)) {
            return error(email, emailErrorCode.FORMAT);
        } else if (!user.password) {
            return error(password, passwordErrorCode.BLANK);
        } else if (user.password.length < 4 || user.password.length > 50) {
            return error(password, passwordErrorCode.SIZE);
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
                <TextField name="email" label="Email" isFullWidth={true} autoComplete="email" value={user.email} isError={includesCode(emailErrorCode, code)} ref={email} onChange={onChange} />
            </div>
            <div>
                <TextField type="password" name="password" label="Password" isFullWidth={true} autoComplete="current-password" value={user.password} isError={includesCode(passwordErrorCode, code)} ref={password} onChange={onChange} />
            </div>
            <div id="div-login-alert">
                {message &&
                    <Alert severity="error">
                        <p id="p-message">{message}</p>
                        <p id="p-code">[{code}]</p>
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
