import { BrowserRouter, Route, Switch } from 'react-router-dom';
import initializeFirebase from '../../Firebase/firebase.init';
import NotFound from '../NotFound/NotFound';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import './App.css';

initializeFirebase();


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><SignInForm></SignInForm></Route>
          <Route exact path="/signin"><SignInForm></SignInForm></Route>
          <Route exact path="/signup"><SignUpForm></SignUpForm></Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
