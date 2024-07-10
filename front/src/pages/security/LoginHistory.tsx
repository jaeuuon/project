import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { status } from 'enums/apis/status';
import { column } from 'enums/apis/pages/security/loginHistory';

import type { Params, Content } from 'types/apis/pages/security/loginHistory';

import { setSnackbarError } from 'modules/layout/snackbar';

import { list } from 'apis/pages/security/loginHistory';

import { getResponseDataEmpty } from 'common/utils';

import Table from 'components/pages/Table';
import Loading from 'components/pages/Loading';

const queryKey = {
    LIST: 'loginHistory/list',
} as const;

const LoginHistory = () => {
    const dispatch = useDispatch();

    const [params, setParams] = useState<Params>({});
    const [data, setData] = useState(getResponseDataEmpty<Content>());

    const onChange = (_event: React.ChangeEvent<unknown>, page: number) => setParams({ ...params, page });

    const { isLoading, data: response } = useQuery([queryKey.LIST, params], () => list(params));

    useEffect(() => {
        if (response) {
            const { status: responseStatus, data } = response;

            setData(data);

            if (responseStatus !== status.SUCCESS) {
                dispatch(setSnackbarError({ code: data.code, message: data.message }));
            }
        }
    }, [response, dispatch]);

    return (
        <>
            <Table { ...data } column={column} onChange={onChange} />
            {isLoading &&
                <Loading />
            }
        </>
    );
};

export default LoginHistory;
