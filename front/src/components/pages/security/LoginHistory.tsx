import { useState, useCallback, useEffect, memo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Grid, Table, TableHead, TableBody, TableRow } from '@mui/material';

import type Component from 'types/components/pages/security/loginHistory';
import type { Params, Content } from 'types/apis/security/history';
import type { Data } from 'types/apis/response';

import { list } from 'apis/security/history';

import Typography from 'components/pages/Typography';
import TableCell from 'components/pages/TableCell';
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
            {isSimple &&
                <Typography content="Recent Login History" />
            }
            <Grid container>
                <Grid item xs={12}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell rowSpan={2} content="Request IP" />
                                <TableCell colSpan={2} content="Result" />
                                <TableCell rowSpan={2} content="Created time" />
                            </TableRow>
                            <TableRow>
                                <TableCell content="Code" />
                                <TableCell content="Value" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.content.map(({ requestIp, result: { code, value }, createdTime }, index) =>
                                <TableRow key={`table-login-history-${index}`}>
                                    <TableCell content={requestIp} />
                                    <TableCell content={code} />
                                    <TableCell content={value} />
                                    <TableCell content={createdTime} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
            {!isSimple &&
                <Pagination totalPages={data?.totalPages} onChange={onChange} />
            }
            <Loading isVisible={isLoading} />
        </div>
    );
};

export default memo(LoginHistory);
