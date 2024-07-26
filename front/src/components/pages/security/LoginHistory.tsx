import { memo, useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import type Component from 'types/components/pages/security/loginHistory';
import type { Params, Content } from 'types/apis/security/history';
import type { Data } from 'types/apis/response';

import { list } from 'apis/security/history';

import Pagination from 'components/pages/Pagination';
import Loading from 'components/Loading';

import styles from 'assets/styles/components/pages/security/login-history.module.scss';

const LoginHistory = ({ isSimple }: Component) => {
    const [params, setParams] = useState<Params>(isSimple ? { size: 5 } : {});
    const onChange = useCallback((_event: React.ChangeEvent<unknown>, page: number) => setParams({ ...params, page }), [params]);

    const [data, setData] = useState<Data<Content>>();
    const { isLoading, data: response } = useQuery({
        queryKey: ['loginHistory/list', params],
        queryFn: () => list(params)
    });

    useEffect(() => {
        if (response) {
            setData(response.data);
        }
    }, [response]);

    return (
        <div id={styles.loginHistory}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Request IP</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Created time</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.content.map(({ requestIp, result: { code, value }, createdTime }, index) =>
                        <TableRow key={`table-login-history-${index}`}>
                            <TableCell>{requestIp}</TableCell>
                            <TableCell>{code}</TableCell>
                            <TableCell>{value}</TableCell>
                            <TableCell>{createdTime}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {!isSimple &&
                <Pagination totalPages={data?.totalPages} onChange={onChange} />
            }
            <Loading isVisible={isLoading} />
        </div>
    );
};

export default memo(LoginHistory);
