import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Grid } from '@mui/material';

import type Component from 'types/components/pages/security/editAccount';
import type { Content } from 'types/apis/security/user';
import type { CodeMessage } from 'types/apis/response';

import { EMAIL_ERROR, NAME_ERROR, POSTAL_CODE_ERROR, ADDRESS_ERROR, DETAIL_ADDRESS_ERROR } from 'constants/apis/security/codeMessage';

import { detail } from 'apis/security/user';

import { includesCode } from 'common/util';

import TextField from 'components/pages/TextField';
import Error from 'components/pages/Error';
import Loading from 'components/Loading';

import styles from 'assets/styles/components/pages/security/edit-account.module.scss';

const EditAccount = ({
    id,
    isManagement
}: Component) => {
    const { isLoading, data: response } = useQuery({
        queryKey: ['editAccount/detail', id],
        queryFn: () => detail(id)
    });

    const [content, setContent] = useState<Content>({ id: 0, email: '', name: '', address: {} });
    const { email, name, address: { postalCode, address, detailAddress } } = content;

    useEffect(() => {
        if (response) {
            setContent(response.data.content[0]);
        }
    }, [response]);

    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const postalCodeRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const detailAddressRef = useRef<HTMLInputElement>(null);

    const [{ code, message }, setError] = useState<CodeMessage>({ code: '', message: '' });

    return (
        <Grid id={styles.editAccount} container>
            <Grid item xs={12} sm={isManagement ? 12 : 4}>
                <p>Image</p>
            </Grid>
            <Grid item xs={12} sm={isManagement ? 12 : 8}>
                <div id={styles.input}>
                    <TextField name="email" value={email} label="Email" autoComplete="email"
                        isError={includesCode(EMAIL_ERROR, code)} onChange={() => {}}
                        ref={emailRef}
                    />
                    <TextField name="name" value={name} label="Name" autoComplete="name"
                        isError={includesCode(NAME_ERROR, code)} onChange={() => {}}
                        ref={nameRef}
                    />
                    <TextField name="postalCode" value={postalCode} label="Postal Code"
                        isError={includesCode(POSTAL_CODE_ERROR, code)} onChange={() => {}}
                        ref={postalCodeRef}
                    />
                    <TextField name="address" value={address} label="Address"
                        isError={includesCode(ADDRESS_ERROR, code)} onChange={() => {}}
                        ref={addressRef}
                    />
                    <TextField name="detailAddress" value={detailAddress} label="Detail Address"
                        isError={includesCode(DETAIL_ADDRESS_ERROR, code)} onChange={() => {}}
                        ref={detailAddressRef}
                    />
                    <Error code={code} message={message} />
                </div>
            </Grid>
            <Loading isVisible={isLoading} />
        </Grid>
    );
};

export default EditAccount;
