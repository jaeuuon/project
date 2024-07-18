import { CircularProgress } from '@mui/material';

import type LoadingType from 'types/components/loading';

const Loading = ({ isVisible }: LoadingType) => {
    return (
        <>
            {isVisible &&
                <div id="div-loading">
                    <CircularProgress />
                </div>
            }
        </>
    );
};

export default Loading;
