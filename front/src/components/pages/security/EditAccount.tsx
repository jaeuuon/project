import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Grid } from '@mui/material';

import type Component from 'types/components/pages/security/editAccount';
import type { Content } from 'types/apis/security/user';

import { useAppSelector } from 'hooks';

import { detail } from 'apis/security/user';

import TextField from 'components/pages/TextField';
import Loading from 'components/Loading';

import styles from 'assets/styles/components/pages/security/edit-account.module.scss';

const EditAccount = ({ isManagement }: Component) => {
    const id = useAppSelector(({ user: { id } }) => id);
    const { isLoading, data: response } = useQuery({
        queryKey: ['editAccount/detail', id],
        queryFn: () => detail(id)
    });

    const [content, setContent] = useState<Content>();

    useEffect(() => {
        if (response) {
            setContent(response.data.content[0]);
        }
    }, [response]);

    return (
        <Grid id={styles.editAccount} container>
            <Grid item xs={12} sm={isManagement ? 12 : 4}>
                <p>Image</p>
            </Grid>
            <Grid item xs={12} sm={isManagement ? 12 : 8}>
                <p>Text</p>
            </Grid>
            <Loading isVisible={isLoading} />
        </Grid>
    );
};

export default EditAccount;
