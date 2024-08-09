import { useAppSelector } from 'hooks';

import Grid from 'components/pages/Grid';
import EditAccountComponent from 'components/pages/security/EditAccount';

const EditAccount = () => {
    const id = useAppSelector(({ user: { id } }) => id);

    return (
        <Grid>
            <EditAccountComponent id={id} />
        </Grid>
    );
};

export default EditAccount;
