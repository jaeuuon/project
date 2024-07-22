import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { Params, Content } from 'types/apis/pages/security/loginHistory';
import type { Data } from 'types/apis/response';

import { query, columns } from 'enums/apis/pages/security/loginHistory';

import { list } from 'apis/pages/security/loginHistory';

import List from 'components/pages/List';

const LoginHistory = () => {
    const [params, setParams] = useState<Params>({});
    const [data, setData] = useState<Data<Content>>();

    const { isLoading, data: response } = useQuery({
        queryKey: [query.LIST, params],
        queryFn: () => list(params)
    });

    const onChange = useCallback((_event: React.ChangeEvent<unknown>, page: number) => setParams({ ...params, page }), [params]);

    useEffect(() => {
        if (response) {
            setData(response.data);
        }
    }, [response]);

    return (
        <List id="list-login-hisory" columns={columns} data={data} isFullWidth={false} isLoading={isLoading} onChange={onChange} />
    );
};

export default LoginHistory;
