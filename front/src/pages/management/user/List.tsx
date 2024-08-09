import { memo, useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Table, TableHead, TableBody, TableRow } from '@mui/material';

import type { Params, Content } from 'types/apis/security/user';
import type { Data } from 'types/apis/response';

import { list } from 'apis/security/user';

import Typography from 'components/pages/Typography';
import TableCell from 'components/pages/TableCell';
import Pagination from 'components/pages/Pagination';
import Loading from 'components/Loading';

import styles from 'assets/styles/pages/management/user/list.module.scss';

const List = memo(() => {
    const [params, setParams] = useState<Params>({});
    const onChange = useCallback((_event: React.ChangeEvent<unknown>, page: number) => setParams({ ...params, page }), [params]);

    const [data, setData] = useState<Data<Content>>();
    const { isLoading, data: response } = useQuery({
        queryKey: ['security/user/list', params],
        queryFn: () => list(params)
    });

    useEffect(() => {
        if (response) {
            setData(response.data);
        }
    }, [response]);

    return (
        <div id={styles.list}>
            <Typography content="User List" />
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell width="65%">Email</TableCell>
                        <TableCell width="35%">Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.content.map(({ email, name }, index) =>
                        <TableRow key={`table-login-history-${index}`}>
                            <TableCell>{email}</TableCell>
                            <TableCell>{name}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination totalPages={data?.totalPages} onChange={onChange} />
            <Loading isVisible={isLoading} />
        </div>
    );
});

export default List;
