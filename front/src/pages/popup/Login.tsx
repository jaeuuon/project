import { useRef, useState } from 'react';

import { useAppDispatch } from 'hooks';

import { Alert, Button } from '@mui/material';

import JSEncrypt from 'jsencrypt';

import type LoginType from 'types/pages/popup/login';
import type { Params } from 'types/apis/pages/popup/login';
import type { CodeMessage } from 'types/apis/response';

import { status } from 'enums/apis/response';
import { emailError, passwordError } from 'enums/apis/pages/popup/login';

import { set } from 'store/layout/header/user';
import { success } from 'store/layout/snackbar';

import { login } from 'apis/pages/popup/login';

import { getPayload, getUser, getDelay } from 'common/payload';
import { getOnChange, includesCode } from 'common/utils';

import TextField from 'components/pages/TextField';
import Loading from 'components/Loading';

import styles from 'assets/styles/pages/popup/login.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const jsEncrypt = new JSEncrypt();
jsEncrypt.setPublicKey(import.meta.env.VITE_PUBLIC_KEY || '');

const Login = ({
    setVisibleFalse, scheduler
}: LoginType) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [params, setParams] = useState<Params>({});
    const [error, setError] = useState<CodeMessage>();
    const [isVisibleLoading, setVisibleLoading] = useState(false);

    const dispatch = useAppDispatch();

    const onChange = getOnChange(params, setParams);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validation()) {
            setVisibleLoading(true);

            const { status: responseStatus, data } = await login({
                email: params.email,
                password: jsEncrypt.encrypt(params.password || '').toString()
            });
            const { code, message, content } = data;

            setVisibleLoading(false);

            if (responseStatus === status.SUCCESS) {
                const { access } = content[0];

                const payload = getPayload(access);
                const user = getUser(payload);

                dispatch(set(user));
                dispatch(success({ code, message }));

                setVisibleFalse();
                setTimeout(scheduler, getDelay(payload));
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
            return focusAndSetError(passwordRef, passwordError.DECRYPT_SIZE);
        }

        return true;
    };

    const focusAndSetError = (inputRef: React.RefObject<HTMLInputElement>, error: CodeMessage) => {
        inputRef.current?.focus();

        setError(error);

        return false;
    }

    return (
        <form className={commonStyles.positionRelative} onSubmit={onSubmit}>
            <TextField name="email" value={params.email} autoComplete="email"
                isError={includesCode(emailError, error?.code)} label="Email" onChange={onChange}
                ref={emailRef}
            />
            <TextField type="password" name="password" value={params.password} autoComplete="current-password"
                isError={includesCode(passwordError, error?.code)} label="Password" onChange={onChange}
                ref={passwordRef}
            />
            {error &&
                <Alert id={styles.alert} severity="error">
                    <p className={commonStyles.wordKeep}>{error.message}</p>
                    <p className={commonStyles.wordBreak}>[{error.code}]</p>
                </Alert>
            }
            <Button id={styles.login} type="submit" variant="contained">
                <span>Login</span>
            </Button>
            <Loading isVisible={isVisibleLoading} />
        </form>
    );
};

export default Login;
