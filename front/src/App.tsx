import Header from './layout/header';
import Main from './layout/main';
import Footer from './layout/footer';

import './assets/scss/app.scss';

const App = () => {
    return (
        <div id="div-layout">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export default App;
