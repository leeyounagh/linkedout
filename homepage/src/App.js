import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes'; 

function App() {
  return (
    <Router>

    <Routes>
        {routes.map((route, index) => {
          if (route.route && route.component) {
            return <Route key={route.key} path={route.route} element={route.component} />;
          }
          return null;  
        })}
    </Routes>
  </Router>
  );
}

export default App;
