import { useState } from 'react';

import Modal from './layout/modal';
import Header from './layout/header';
import Main from './layout/main';
import Footer from './layout/footer';

import './assets/scss/app.scss';

const App = () => {
    const [isOpenSidebar, setOpenSidebar] = useState(false);

    const handleSidebar = (isOpenSidebar: boolean): void => {
        document.body.style.overflow = isOpenSidebar ? 'hidden' : 'initial';

        setOpenSidebar(isOpenSidebar);
    };

    return (
        <>
            <Modal isOpenSidebar={isOpenSidebar} handleSidebar={handleSidebar} />
            <Header />
            <Main isOpenSidebar={isOpenSidebar} handleSidebar={handleSidebar}/>
            <Footer />
        </>
    );
};

export default App;
