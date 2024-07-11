import { useState, useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';

import { query } from 'enums/pages/security/loginHistory';
import { columns } from 'enums/apis/pages/security/loginHistory';

import type { Params, Content } from 'types/apis/pages/security/loginHistory';
import type { Data } from 'types/apis/response';

import { list } from 'apis/pages/security/loginHistory';

import List from 'components/List';
import Loading from 'components/Loading';

const LoginHistory = () => {
    const [params, setParams] = useState<Params>({});
    const [data, setData] = useState<Data<Content>>();

    const onChange = useCallback((_event: React.ChangeEvent<unknown>, page: number) => setParams({ ...params, page }), [params]);

    const { isLoading, data: response } = useQuery([query.LIST, params], () => list(params));

    useEffect(() => {
        if (response) {
            setData(response.data);
        }
    }, [response]);

    return (
        <>
            <List id="list-login-hisory" columns={columns} data={data} onChange={onChange} />
            <Loading isVisible={isLoading} />
        </>
    );
};

export default LoginHistory;
