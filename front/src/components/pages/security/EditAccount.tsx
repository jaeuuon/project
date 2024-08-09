import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Grid } from '@mui/material';

import type Component from 'types/components/pages/security/editAccount';
import type { Content } from 'types/apis/security/user';
import type { CodeMessage } from 'types/apis/response';

import { EMAIL_ERROR, NAME_ERROR, POSTAL_CODE_ERROR, ADDRESS_ERROR, DETAIL_ADDRESS_ERROR } from 'constants/apis/security/codeMessage';

import { isOffSize, isNot } from 'common/validation/apis/security';

import { detail } from 'apis/security/user';

import { getOnChange, getFocusAndSetError, includesCode } from 'common/util';

import TextField from 'components/pages/TextField';
import Error from 'components/pages/Error';
import Loading from 'components/Loading';

import styles from 'assets/styles/components/pages/security/edit-account.module.scss';

const EditAccount = ({
    id,
    isManagement
}: Component) => {
    const { isLoading, data: response } = useQuery({
        queryKey: ['security/user/detail', id],
        queryFn: () => detail(id)
    });

    const [content, setContent] = useState<Content>({ id: 0, email: '', name: '', address: {} });
    useEffect(() => {
        if (response) {
            setContent(response.data.content[0]);
        }
    }, [response]);

    const { email, name, address: { postalCode, address, detailAddress } } = content;

    const onChange = getOnChange(content, setContent);
    const onChangeAddress = ({ target: { name: key, value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (value !== '') {
            const address = { ...content.address, [key]: value };

            setContent({ ...content, address });
        } else {
            delete content.address[key];

            setContent({ ...content });
        }
    };

    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const postalCodeRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const detailAddressRef = useRef<HTMLInputElement>(null);

    const [{ code, message }, setError] = useState<CodeMessage>({ code: '', message: '' });

    const focusAndSetError = getFocusAndSetError(setError);

    const validation = () => {
        if (!email) {
            return focusAndSetError(emailRef, EMAIL_ERROR.BLANK);
        } else if (isOffSize.email(email)) {
            return focusAndSetError(emailRef, EMAIL_ERROR.SIZE);
        } else if (isNot.email(email)) {
            return focusAndSetError(emailRef, EMAIL_ERROR.FORMAT);
        } else if (!name) {
            return focusAndSetError(nameRef, NAME_ERROR.BLANK);
        } else if (isOffSize.name(name)) {
            return focusAndSetError(nameRef, NAME_ERROR.SIZE);
        } else if (isOffSize.address.postalCode(postalCode)) {
            return focusAndSetError(postalCodeRef, POSTAL_CODE_ERROR.SIZE);
        } else if (isOffSize.address.address(address)) {
            return focusAndSetError(addressRef, ADDRESS_ERROR.SIZE);
        } else if (isOffSize.address.detailAddress(detailAddress)) {
            return focusAndSetError(detailAddressRef, DETAIL_ADDRESS_ERROR.SIZE);
        }

        return true;
    };

    return (
        <Grid id={styles.editAccount} container>
            <Grid item xs={12} sm={isManagement ? 12 : 4}>
                <p>Image</p>
            </Grid>
            <Grid item xs={12} sm={isManagement ? 12 : 8}>
                <div id={styles.input}>
                    <TextField name="email" value={email} label="Email" autoComplete="email"
                        isError={includesCode(EMAIL_ERROR, code)} onChange={onChange}
                        ref={emailRef}
                    />
                    <TextField name="name" value={name} label="Name" autoComplete="name"
                        isError={includesCode(NAME_ERROR, code)} onChange={onChange}
                        ref={nameRef}
                    />
                    <TextField name="postalCode" value={postalCode} label="Postal Code"
                        isError={includesCode(POSTAL_CODE_ERROR, code)} onChange={onChangeAddress}
                        ref={postalCodeRef}
                    />
                    <TextField name="address" value={address} label="Address"
                        isError={includesCode(ADDRESS_ERROR, code)} onChange={onChangeAddress}
                        ref={addressRef}
                    />
                    <TextField name="detailAddress" value={detailAddress} label="Detail Address"
                        isError={includesCode(DETAIL_ADDRESS_ERROR, code)} onChange={onChangeAddress}
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
