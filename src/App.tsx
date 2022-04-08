import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// import './App.css';

// Pages & Components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';

const App = () => {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>

          <Navbar />

          <Switch>
            <Route exact path='/'>
              {!user && <Redirect to='/login' />}
              {user && <Home />}
            </Route>
          </Switch>

          <Switch>
            <Route path='/login'>
              {user && <Redirect to='/' />}
              {!user && <Login />}
            </Route>
          </Switch>

          <Switch>
            <Route path='/signup'>
              {user && <Redirect to='/' />}
              {!user && <Signup />}
            </Route>
          </Switch>

        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
