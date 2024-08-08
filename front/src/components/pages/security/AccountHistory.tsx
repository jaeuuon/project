import { memo } from 'react';

import type Component from 'types/components/pages/security/accountHistory';

import Typography from 'components/pages/Typography';

import styles from 'assets/styles/components/pages/security/account-history.module.scss';

const AccountHistory = memo(({ isSimple }: Component) => {
    return (
        <div id={styles.accountHistory}>
            {isSimple &&
                <Typography content="Recent Account History" />
            }
            <p>AccountHistory</p>
        </div>
    );
});

export default AccountHistory;
