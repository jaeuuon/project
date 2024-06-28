import { useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Button, Alert } from '@mui/material';

import JSEncrypt from "jsencrypt";

import { status } from 'enums/apis/status';
import { emailError, passwordError } from 'enums/apis/pages/popup/login';

import type LoginType from 'types/pages/popup/login';
import type { Params, default as Content } from 'types/apis/pages/popup/login';
import type { Error } from 'types/apis/common';

import { setUser } from 'modules/user';

import { postLogin } from 'apis/pages/popup/login';

import TextField from 'components/common/TextField';

import { getPayload, getUser, getDelay } from 'common/payload';
import { getOnChange, includesCode } from 'common/utils';

const jsEncrypt = new JSEncrypt();
jsEncrypt.setPublicKey(process.env.REACT_APP_PUBLIC_KEY || '');

const Login = ({
    setVisibleFalse, reissuance
}: LoginType) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    const [params, setParams] = useState<Params>({});
    const [error, setError] = useState<Error>();

    const onChange = getOnChange(params, setParams);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validation()) {
            const { status: responseStatus, data, errors } = await postLogin({
                email: params.email,
                password: jsEncrypt.encrypt(params.password || '').toString()
            });

            if (responseStatus === status.SUCCESS) {
                const { access }: Content = data.content[0];

                const payload = getPayload(access);
                const user = getUser(payload);

                dispatch(setUser(user));

                setVisibleFalse();
                setTimeout(reissuance, getDelay(payload));
            } else {
                const error = errors[0];

                if (includesCode(emailError, error.code)) {
                    emailRef.current?.focus();
                } else if (includesCode(passwordError, error.code)) {
                    passwordRef.current?.focus();
                }

                setError(error);
            }
        }
    };

    const validation = () => {
        const { email, password } = params;

        if (!email) {
            return focusAndSetError(emailRef, emailError.BLANK);
        } else if (email.length < 4 || email.length > 100) {
            return focusAndSetError(emailRef, emailError.SIZE);
        } else if (!email.match(/^.+@.+$/)) {
            return focusAndSetError(emailRef, emailError.FORMAT);
        } else if (!password) {
            return focusAndSetError(passwordRef, passwordError.BLANK);
        } else if (password.length < 4 || password.length > 50) {
            return focusAndSetError(passwordRef, passwordError.SIZE);
        }

        return true;
    };

    const focusAndSetError = (inputRef: React.RefObject<HTMLInputElement>, error: Error) => {
        inputRef.current?.focus();

        setError(error);

        return false;
    }

    return (
        <form id="form-login" onSubmit={onSubmit}>
            <div>
                <TextField name="email" label="Email" isFullWidth={true} autoComplete="email" value={params.email} isError={includesCode(emailError, error?.code)} ref={emailRef} onChange={onChange} />
            </div>
            <div>
                <TextField type="password" name="password" label="Password" isFullWidth={true} autoComplete="current-password" value={params.password} isError={includesCode(passwordError, error?.code)} ref={passwordRef} onChange={onChange} />
            </div>
            <div id="div-login-alert">
                {error &&
                    <Alert severity="error">
                        <p id="p-message">{error.message}</p>
                        <p id="p-code">[{error.code}]</p>
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
