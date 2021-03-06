import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthProvider from '../../Contexts/AuthProvider';
import Header from '../Header/Header';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Profile from '../Profile/Profile';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header></Header>
          <Switch>
            <Route exact path="/"><Home></Home></Route>
            <Route exact path="/home"><Home></Home></Route>
            <Route exact path="/signin"><SignInForm></SignInForm></Route>
            <Route exact path="/signup"><SignUpForm></SignUpForm></Route>
            <PrivateRoute exact path="/profile"><Profile></Profile></PrivateRoute>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
