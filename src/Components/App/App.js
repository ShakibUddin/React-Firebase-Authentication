import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthProvider from '../../Contexts/AuthProvider';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
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
            <Route exact path="/"><SignInForm></SignInForm></Route>
            <Route exact path="/signin"><SignInForm></SignInForm></Route>
            <Route exact path="/signup"><SignUpForm></SignUpForm></Route>
            <Route exact path="/profile"><Profile></Profile></Route>
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
