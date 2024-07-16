import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Alert } from '@mui/material';

import JSEncrypt from "jsencrypt";

import { status } from 'enums/apis/status';
import { emailError, passwordError } from 'enums/apis/pages/popup/login';

import type LoginType from 'types/pages/popup/login';
import type { Params } from 'types/apis/pages/popup/login';
import type { CodeMessage } from 'types/apis/response';

import { setUser } from 'modules/layout/header/user';
import { setSnackbarSuccess } from 'modules/layout/snackbar';

import { login } from 'apis/pages/popup/login';

import { getPayload, getUser, getDelay } from 'common/payload';
import { getOnChange, includesCode } from 'common/utils';

import TextField from 'components/TextField';

const jsEncrypt = new JSEncrypt();
jsEncrypt.setPublicKey(process.env.REACT_APP_PUBLIC_KEY || '');

const Login = ({
    setVisibleFalse, reissuance
}: LoginType) => {
    const dispatch = useDispatch();

    const [params, setParams] = useState<Params>({});
    const [error, setError] = useState<CodeMessage>();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const onChange = getOnChange(params, setParams);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validation()) {
            const { status: responseStatus, data } = await login({
                email: params.email,
                password: jsEncrypt.encrypt(params.password || '').toString()
            });
            const { code, message } = data;

            if (responseStatus === status.SUCCESS) {
                const { access } = data.content[0];

                const payload = getPayload(access);
                const user = getUser(payload);

                dispatch(setUser(user));
                dispatch(setSnackbarSuccess({ code, message }));

                setVisibleFalse();
                setTimeout(reissuance, getDelay(payload));
            } else {
                if (includesCode(emailError, code)) {
                    emailRef.current?.focus();
                } else if (includesCode(passwordError, code)) {
                    passwordRef.current?.focus();
                }

                setError({ code, message });
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

    const focusAndSetError = (inputRef: React.RefObject<HTMLInputElement>, error: CodeMessage) => {
        inputRef.current?.focus();

        setError(error);

        return false;
    }

    return (
        <form id="form-login" onSubmit={onSubmit}>
            <TextField name="email" value={params.email} autoComplete="email"
                isFullWidth={true} isError={includesCode(emailError, error?.code)} label="Email" onChange={onChange}
                ref={emailRef}
            />
            <TextField type="password" name="password" value={params.password} autoComplete="current-password"
                isFullWidth={true} isError={includesCode(passwordError, error?.code)} label="Password" onChange={onChange}
                ref={passwordRef}
            />
            {error &&
                <Alert severity="error">
                    <p>{error.message}</p>
                    <p>[{error.code}]</p>
                </Alert>
            }
            <Button id="button-login-submit" type="submit" variant="contained">
                <span>Login</span>
            </Button>
        </form>
    );
};

export default Login;
