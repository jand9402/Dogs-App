import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from './comoponents/Landing/Landing';
import Home from './comoponents/Home/Home';
import Create from './comoponents/Create/Create'
import Detail from './comoponents/Detail/Detail'

function App() {
  return (
    <BrowserRouter>
       <div className="App">
         <Switch>
           <Route exact path= '/' component={Landing}/>
           <Route exact path= '/home' component={Home}/>
           <Route exact path='/home/:id' component={Detail}/> 
           <Route path='/create_dog' component={Create}/>
         </Switch>
       </div>
    </BrowserRouter>
  );
}

export default App;
