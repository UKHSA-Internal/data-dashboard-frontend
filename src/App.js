
import Footer from './components/Footer';
import Header from './components/Header';
import SideNav from './components/SideNav';

import './app.scss';
import './App.css';
import HomePage from './components/HomePage';

function App() {
  return (
    <>
      <Header></Header>

      <div className="govuk-width-container">
        <div className="govuk-main-wrapper">
          <div className="dashboard-container">
            <SideNav></SideNav>
            <main className="main">
              <div className='main-inner'>
                <HomePage></HomePage>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
