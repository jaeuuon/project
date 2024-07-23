import { memo } from 'react';

import type { StringIndex } from 'types/signature';
import type ListType from 'types/components/pages/list';

import Table from 'components/pages/list/Table';
import Pagination from 'components/pages/list/Pagination';
import Loading from 'components/Loading';

import styles from 'assets/styles/common.module.scss';

const List = <T extends StringIndex>({
    id, columns, data, isFullWidth = true, isLoading = false, onChange
}: ListType<T>) => {
    return (
        <div className={styles.positionRelative}>
            <Table id={id} columns={columns} content={data?.content} isFullWidth={isFullWidth} />
            <Pagination totalPages={data?.totalPages} onChange={onChange} />
            <Loading isVisible={isLoading} />
        </div>
    );
};

export default memo(List);
