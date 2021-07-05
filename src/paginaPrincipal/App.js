import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import React, { useEffect } from 'react';

// IMPORTS DE LA PAGINA PRINCIPAL
import Home from './componentes/Home'
import NavBar from './componentes/NavBar'
import LoginVendedor from './componentes/LoginVendedor'
import RegisterVendedor from './componentes/RegisterVendedor'


//import Cookies from 'universal-cookie'
import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'


// IMPORTS DE LA ADMINISTRACION DEL VENDEDOR
import NavBarAdmin from '../miNegocio/NavBarAdmin';
import HomeAdmin from '../miNegocio/componentes/HomeAdmin';
import ProductosAdmin from '../miNegocio/componentes/ProductosAdmin'
import DiseñoAdmin from '../miNegocio/componentes/DiseñoAdmin'
import ConfigFormasPagoAdmin from '../miNegocio/componentes/ConfigFormasPagoAdmin'
import Clientes from '../miNegocio/componentes/Clientes';
import Ventas from '../miNegocio/componentes/Ventas';
import Pedidos from '../miNegocio/componentes/Pedidos';


//IMPORTS DE LA INTERFAZ PARA EL COMPRADOR
import NavBarComprador from '../paginaComprador/NavBarComprador';


function App() {

  const [{ vendedor }, setVendedor] = useStateValue();//hacer el destructory para obtener el basket que ahora esta vacio, y la funcion dispatch que usamos para despachar los datos


  //const cookies = new Cookies()

  useEffect(() => {
    //metodo para ver si el usuario cambio en algun momoento
    // ACA HACER UNA CONSULTA A LA BASE DE DATOS Y VER SI HAY UN USUARIO LOGUEAD? ?? Y AHI LO PONES EN LA VARIABLE GLOBAL??
    // auth.onAuthStateChanged((authUser)=>{
    //   console.log(authUser)
    //   if (authUser){
    //     dispatch({
    //       type: actionTypes.SET_USER,
    //       user: authUser,
    //     })
    //   }
    // })


  }, []) //2 parametros, una funcion flecha y un array vacio, si esta vacio el array la funcion flecha se va a ejecutar solo 1 vez, si tiene una variable el array, la flecha se ejecutara esa N cant de veces




  return (
    <div className="App">

      <Router>

        {/* VALIDAR CON && PARA MOSTRAR NAVEGADOR  COMPRADOR */}
        { 
          vendedor ? //si hay un vendedor logueado, mostramos su panel de control
            (
              <NavBarAdmin></NavBarAdmin>

            )
            :
            ( //si no hay ninguno logueado, mostramos el navbar para qe se ingrese o registre el vendedor
              
              <NavBar></NavBar>
            )
        }

        <Switch>

          <Route exact path='/'>
            <Home></Home>
          </Route>

          <Route path='/loginVendedor'>
            <LoginVendedor></LoginVendedor>
          </Route>


          <Route path='/registerVendedor'>
            <RegisterVendedor></RegisterVendedor>
          </Route>


          {/* <Route path={`/${cookies.get("emailUsuario")}/admin`}>
          <Admin></Admin>
          </Route>  */}


          <Route exact path={`/${vendedor}/admin`}>{/*si o si con exact path, sino no entra*/}
            <HomeAdmin></HomeAdmin>
          </Route>

          <Route exact path={`/${vendedor}/admin/productos`}>
            <ProductosAdmin></ProductosAdmin>
          </Route>

          <Route exact path={`/${vendedor}/admin/diseño`}>
            <DiseñoAdmin></DiseñoAdmin>
          </Route>

          <Route exact path={`/${vendedor}/admin/formasDePago`}>
            <ConfigFormasPagoAdmin></ConfigFormasPagoAdmin>
          </Route>
          
          <Route exact path={`/${vendedor}/admin/clientes`}>
            <Clientes></Clientes>
          </Route>
          
          <Route exact path={`/${vendedor}/admin/ventas`}>
            <Ventas></Ventas>
          </Route>

          <Route exact path={`/${vendedor}/admin/pedidos`}>
            <Pedidos></Pedidos>
          </Route>


          {/* RUTAS PARA LA PAGINA DEL COMPRADOR */}
          <Route exact path={`/${vendedor}`}>
            <NavBarComprador></NavBarComprador>
          </Route>



        </Switch>
      </Router>

    </div>

  );

}

export default (App)


