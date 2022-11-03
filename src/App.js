import './app.scss';
import Header from "./components/Header"
import Footer from "./components/Footer";
import Main from './components/Main';


function App() {
    document.body.classList.add(
        'govuk-template__body',
        'js-enabled',
    );
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div >
    );
}

export default App;
