import { useEffect } from 'react';

import Header from './layout/header';
import Main from './layout/main';
import Footer from './layout/footer';

import './assets/scss/app.scss';

const App = () => {
    useEffect(() => { 
        window.onbeforeunload = () => window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    );
};

export default App;
