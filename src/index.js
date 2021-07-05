import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'


//desde aca usamos el stateProvider, para que todos los compoenntes de la app accedan a los datos
import { StateProvider} from './StateProvider'
//reducer no necesita llaves porque lo exportamos por defecto, initialState lo exportamos por nombre si necesita llaves
import reducer, {initialState} from './reducer'

import App from './paginaPrincipal/App';


console.log(initialState.vendedor)

ReactDOM.render(

  <React.StrictMode>
    
    <StateProvider initialState={initialState} reducer={reducer} >  
      
      {/* {
        
        
        initialState.vendedor ?
        (
          <Admin/>
        )
        :
        (
          <App/>
        )
      } */}
      <App></App>

       
    </StateProvider>
    

  </React.StrictMode>,
  document.getElementById('root')
);

