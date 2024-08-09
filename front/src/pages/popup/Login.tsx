import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import JSEncrypt from 'jsencrypt';

import { Button } from '@mui/material';

import type Page from 'types/pages/popup/login';
import type { Params } from 'types/apis/security/authentication';
import type { CodeMessage } from 'types/apis/response';

import { EMAIL_ERROR, PASSWORD_ERROR } from 'constants/apis/security/codeMessage';
import { STATUS } from 'constants/apis/response';

import { useAppDispatch } from 'hooks';
import { set } from 'store/user';
import { success } from 'store/layout/snackbar';

import { isOffSize, isNot } from 'common/validation/apis/security';

import { login } from 'apis/security/authentication';

import { getPayload, getUser, getDelay } from 'common/jwt';
import { getOnChange, getFocusAndSetError, includesCode } from 'common/util';

import TextField from 'components/pages/TextField';
import Error from 'components/pages/Error';
import Loading from 'components/Loading';

import styles from 'assets/styles/pages/popup/login.module.scss';

const jsEncrypt = new JSEncrypt();
jsEncrypt.setPublicKey(import.meta.env.VITE_PUBLIC_KEY);

const Login = ({
    scheduler, setVisibleFalse
}: Page) => {
    const [params, setParams] = useState<Params>({});
    const { email, password } = params;

    const onChange = getOnChange(params, setParams);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [{ code, message }, setError] = useState<CodeMessage>({ code: '', message: '' });

    const focusAndSetError = getFocusAndSetError(setError);

    const validation = () => {
        if (!email) {
            return focusAndSetError(emailRef, EMAIL_ERROR.BLANK);
        } else if (isOffSize.email(email)) {
            return focusAndSetError(emailRef, EMAIL_ERROR.SIZE);
        } else if (isNot.email(email)) {
            return focusAndSetError(emailRef, EMAIL_ERROR.FORMAT);
        } else if (!password) {
            return focusAndSetError(passwordRef, PASSWORD_ERROR.BLANK);
        } else if (isOffSize.password(password)) {
            return focusAndSetError(passwordRef, PASSWORD_ERROR.DECRYPT_SIZE);
        }

        return true;
    };

    const dispatch = useAppDispatch();

    const { mutate, isPending } = useMutation({
        mutationFn: async (params: Params) => await login(params),
        onSuccess: ({ status, data: { code, message, content: [content] } }) => {
            if (status === STATUS.SUCCESS) {
                const payload = getPayload(content.access);
                const user = getUser(payload);

                dispatch(set(user));
                dispatch(success({ code, message }));

                setTimeout(scheduler, getDelay(payload));
                setVisibleFalse();
            } else {
                if (includesCode(EMAIL_ERROR, code)) {
                    emailRef.current?.focus();
                } else if (includesCode(PASSWORD_ERROR, code)) {
                    passwordRef.current?.focus();
                }

                setError({ code, message });
            }
        }
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validation()) {
            mutate({ email, password: jsEncrypt.encrypt(password ?? '').toString() });
        }
    };

    return (
        <form id={styles.login} onSubmit={onSubmit}>
            <TextField name="email" value={email} label="Email" autoComplete="email"
                isError={includesCode(EMAIL_ERROR, code)} onChange={onChange}
                ref={emailRef}
            />
            <TextField type="password" name="password" value={password} label="Password" autoComplete="current-password"
                isError={includesCode(PASSWORD_ERROR, code)} onChange={onChange}
                ref={passwordRef}
            />
            <Error code={code} message={message} />
            <Button type="submit" variant="contained">Login</Button>
            <Loading isVisible={isPending} />
        </form>
    );
};

export default Login;
