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
           <Route path= '/home' component={Home}/>
           <Route path='/create_dog' component={Create}/>
           {/* <Route path='/home/:id'component={Detail}/> */}
         </Switch>
         
         
       </div>
    </BrowserRouter>
  );
}

export default App;
