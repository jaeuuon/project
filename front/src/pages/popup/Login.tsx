import { useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Button, Alert } from '@mui/material';

import { status } from '../../enums/apis/status';
import { emailError, passwordError } from '../../enums/apis/pages/popup/login';

import type { Params, default as Content } from '../../types/apis/pages/popup/login';
import type { Detail } from '../../types/apis/codeMessage';

import { set } from '../../modules/user';

import { postLogin } from '../../apis/pages/popup/login';

import TextField from '../../components/common/TextField';

import { getOnChange, getPayload, getUserByPayload, includesCode } from '../../common/utils';

const Login = () => {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    const [params, setParams] = useState<Params>({});

    const [code, setCode] = useState<string>();
    const [message, setMessage] = useState<string>();

    const onChange = getOnChange(params, setParams);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validation()) {
            const response = await postLogin(params);

            if (response.status === status.SUCCESS) {
                const content: Content = response.data.content[0];

                const payload = getPayload(content.access);
                const user = getUserByPayload(payload);

                dispatch(set(user));
            } else {
                const error = response.errors[0];
                const code = error.code;

                if (includesCode(emailError, code)) {
                    email.current?.focus();
                } else if (includesCode(passwordError, code)) {
                    password.current?.focus();
                }

                setCode(code);
                setMessage(error.message);
            }
        }
    };

    const validation = () => {
        if (!params.email) {
            return error(email, emailError.BLANK);
        } else if (params.email.length < 4 || params.email.length > 100) {
            return error(email, emailError.SIZE);
        } else if (!params.email.match(/^.+@.+$/)) {
            return error(email, emailError.FORMAT);
        } else if (!params.password) {
            return error(password, passwordError.BLANK);
        } else if (params.password.length < 4 || params.password.length > 50) {
            return error(password, passwordError.SIZE);
        }

        return true;
    };

    const error = (ref: React.RefObject<HTMLInputElement>, detail: Detail) => {
        ref.current?.focus();

        setCode(detail.CODE);
        setMessage(detail.MESSAGE);

        return false;
    }

    return (
        <form id="form-login" onSubmit={onSubmit}>
            <div>
                <TextField name="email" label="Email" isFullWidth={true} autoComplete="email" value={params.email} isError={includesCode(emailError, code)} ref={email} onChange={onChange} />
            </div>
            <div>
                <TextField type="password" name="password" label="Password" isFullWidth={true} autoComplete="current-password" value={params.password} isError={includesCode(passwordError, code)} ref={password} onChange={onChange} />
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
                <Button type="submit" variant="contained">
                    <span>Login</span>
                </Button>
            </div>
        </form>
    );
};

export default Login;
