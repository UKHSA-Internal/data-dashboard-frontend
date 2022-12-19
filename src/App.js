import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.scss";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import HomePage from "./components/HomePage";
import InfluenzaPage from "./components/InfluenzaPage";
function App() {
  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <div className="govuk-main-wrapper">
          <div className="dashboard-container">
            <SideNav></SideNav>
            <main className="main">
              <div className="main-inner">
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="influenza" element={<InfluenzaPage />}></Route>
                  </Routes>
                </BrowserRouter>
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
