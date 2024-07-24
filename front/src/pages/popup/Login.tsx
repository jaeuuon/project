import { useRef, useState } from 'react';
import JSEncrypt from 'jsencrypt';

import { Button } from '@mui/material';

import type Page from 'types/pages/popup/login';
import type { Params } from 'types/apis/pages/popup/login';
import type { CodeMessage } from 'types/apis/response';

import { emailError, passwordError } from 'enums/apis/pages/popup/login';
import { status } from 'enums/apis/response';

import { useAppDispatch } from 'hooks';
import { set } from 'store/layout/header/user';
import { success } from 'store/layout/snackbar';

import { login } from 'apis/pages/popup/login';

import { getPayload, getUser, getDelay } from 'common/jwt';
import { getOnChange, includesCode } from 'common/utils';

import TextField from 'components/pages/TextField';
import Error from 'components/pages/Error';
import Loading from 'components/Loading';

import styles from 'assets/styles/pages/popup/login.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const jsEncrypt = new JSEncrypt();
jsEncrypt.setPublicKey(import.meta.env.VITE_PUBLIC_KEY || '');

const Login = ({
    scheduler, setVisibleFalse
}: Page) => {
    const [params, setParams] = useState<Params>({});
    const { email, password } = params;

    const onChange = getOnChange(params, setParams);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<CodeMessage>();

    const focusAndSetError = (inputRef: React.RefObject<HTMLInputElement>, error: CodeMessage) => {
        inputRef.current?.focus();

        setError(error);

        return false;
    };

    const validation = () => {
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

    const [isVisibleLoading, setVisibleLoading] = useState(false);
    const dispatch = useAppDispatch();

    const onSubmit = async ({ preventDefault }: React.FormEvent<HTMLFormElement>) => {
        preventDefault();

        if (validation()) {
            setVisibleLoading(true);

            const { status: responseStatus, data } = await login({
                email, password: jsEncrypt.encrypt(password || '').toString()
            });
            const { code, message, content } = data;

            setVisibleLoading(false);

            if (responseStatus === status.SUCCESS) {
                const payload = getPayload(content[0].access);
                const user = getUser(payload);

                dispatch(set(user));
                dispatch(success({ code, message }));

                setTimeout(scheduler, getDelay(payload));
                setVisibleFalse();
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

    return (
        <form className={commonStyles.positionRelative} onSubmit={onSubmit}>
            <TextField name="email" value={email} autoComplete="email"
                isError={includesCode(emailError, error?.code)} label="Email" onChange={onChange}
                ref={emailRef}
            />
            <TextField type="password" name="password" value={password} autoComplete="current-password"
                isError={includesCode(passwordError, error?.code)} label="Password" onChange={onChange}
                ref={passwordRef}
            />
            <Error codeMessage={error} />
            <Button id={styles.login} type="submit" variant="contained">
                <span>Login</span>
            </Button>
            <Loading isVisible={isVisibleLoading} />
        </form>
    );
};

export default Login;
