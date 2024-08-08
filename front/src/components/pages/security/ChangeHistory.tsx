import type Component from 'types/components/pages/security/changeHistory';

import Typography from 'components/pages/Typography';

import styles from 'assets/styles/components/pages/security/change-history.module.scss';

const ChangeHistory = ({ isSimple }: Component) => {
    return (
        <div id={styles.changeHistory}>
            {isSimple &&
                <Typography content="Recent Change History" />
            }
        </div>
    );
};

export default ChangeHistory;
