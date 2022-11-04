import { Footer, TopNav } from 'govuk-react';
import './App.css';
import Graph from './components/Graph/Graph';

function App() {
  return (
    <div className="App">
      <TopNav/>
       <Graph></Graph>  
       <Footer/>
    </div>
  );
}

export default App;
