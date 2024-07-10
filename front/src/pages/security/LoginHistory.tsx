import { useState } from 'react';

import { useQuery } from 'react-query';

import { Pagination } from '@mui/material';

import type { Params } from 'types/apis/pages/security/loginHistory';

import { list } from 'apis/pages/security/loginHistory';

import Loading from 'components/pages/Loading';

const queryKey = {
    LIST: 'loginHistory/list',
} as const;

const LoginHistory = () => {
    const [params, setParams] = useState<Params>({});

    const onChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setParams({ ...params, page });
    };

    const { isLoading, data } = useQuery([queryKey.LIST, params], () => list(params));

    return (
        <>
            <Pagination count={17} shape="rounded" size="small" siblingCount={2} onChange={onChange} />
            {isLoading &&
                <Loading />
            }
        </>
    );
};

export default LoginHistory;
