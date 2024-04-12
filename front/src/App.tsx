import Container from '@mui/material/Container';

import Top from './layout/top';
import Center from './layout/center';
import Bottom from './layout/bottom';

import './assets/scss/app.scss';

const App = () => {
    return (
        <Container maxWidth="xl">
            <Top />
            <Center />
            <Bottom />
        </Container>
    );
};

export default App;
