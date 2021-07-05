import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import { red } from '@material-ui/core/colors';

import { Link, useHistory } from 'react-router-dom'
import { CommuteRounded, SentimentDissatisfiedOutlined, VerticalAlignTopSharp } from '@material-ui/icons';

import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'

const useStyles = makeStyles((theme) => ({

  nav: {
    display: "block",
    position: "absolute", /* para que sea encima de todo*/
    top: 0, /* para que este en la esquina*/
    left: 0, /*para que este del lado izquierdo */
    background: "white",
    height: "100%", /*para que abarque todo el largo de la pagina */
    width: "20%",
    padding: "30px", /* mas espaciado entre cada elemento*/
    opacity: .9, /* le da transparencia al menu*/
    borderStyle: "ridge", //le damos un borde gris para que se diferencia del resto de la pagina 
    //transform: "translateX(-400px)", /* PARA QUE DESAPAREZCA TOTALMENTE DE LA VISTA.   /// estaba levemente separado del costado izquierdo de la pagina, con -20px lo corremos para que quede en el borde. eje X*/
    //transition: "transform .5s ease-in-out", /*(5 segundos) una transicion, un efecto para que no sea tan brusco */
  },


  nav2: {
    marginLeft: theme.spacing(39.6), //para que se separe del navegador vertical
    display: "flex", //asi cada elemento se ordena uno al lado del otro
    //opacity: .9, 
    //borderStyle: "ridge",
    right: 0, //para que este del lado derecho
    height: "5%", //ancho del navegador
    width: "80.3%", //no es del 100% porq sino estaria por encima del navegador vertical
    borderStyle: "groove", //le damos un borde gris para que se diferencia del resto de la pagina 
    paddingTop: 9,
    //opacity: .5, /* le da transparencia al menu*/


  },
  boton2: {
    color: "#2f3640",
  },
  elemento2: {
    marginRight: theme.spacing(3),
  },
  elemento3: {//este lo uso para que los botones clientes, ventas, no esten tan carca del otro nav
    marginLeft: theme.spacing(6),
  },

  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  navegador: {
    background: "white",
  },
  boton: {
    
    color: "blue",
  },
  elemento: {
    marginTop: theme.spacing(7),
    padding: "20px",
    borderBottom: "#ccc solid 1px", /* pone como una linea blanca entre cada uno*/
  },
  botonCerrar: {
    marginTop: theme.spacing(55),
  },
  logo: {
    marginLeft: theme.spacing(2),
    color: "#2f3640",
  },
  miSitio: {
    borderRadius: "5px",
    padding: "10px 15px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#333",
    margin: "10px",
  },


}));

export default function NavBarAdmin() {
  const classes = useStyles();

  const history = useHistory()


  const [{ vendedor, idVendedor }, dispatch] = useStateValue();//hacer el destructory para obtener el basket que ahora esta vacio, y la funcion dispatch que usamos para despachar los datos


  const cerrarSesion = () => {
    dispatch({
      type: actionTypes.SET_VENDEDOR,
      vendedor: null
    })

    dispatch({
      type: actionTypes.SET_ID_VENDEDOR,
      idVendedor: 0
    })

    history.push('/')
  }

  return (
    <div className={classes.root}>
      <ul className={classes.nav}>
        <p> {/* lo dejo con P y no usando LI porque me pone los puntos al inicio como si fueran items*/}
          <Link to={`/${vendedor}/admin`}> {/* para que cuando se toque el logo te lleve al inicio */}
            <IconButton edge="start"  color="inherit" className={classes.logo} aria-label="menu">
              <strong >{vendedor}</strong>
            </IconButton>
          </Link>
        </p>

        <p className={classes.elemento}>
          <Link to={`/${vendedor}/admin/productos`}>
            <Button color="inherit" className={classes.boton} >Productos</Button>
          </Link>
        </p>

        <p className={classes.elemento}>
          <Link to={`/${vendedor}/admin/diseño`}>
            <Button color="primary" className={classes.boton} >Diseño</Button>
          </Link>
        </p>

        <p className={classes.elemento}>
          <Link to={`/${vendedor}/admin/formasDePago`}>
            <Button color="primary" className={classes.boton} >Formas de pago</Button>
          </Link>
        </p>

        <p className={classes.elemento}>
          <Button variant="outlined" color="primary" className={classes.botonCerrar} >Configuraciones</Button>
        </p>

      </ul>



      <ul className={classes.nav2}>

        <p className={classes.elemento3}>
          <Link to={`/${vendedor}/admin/clientes`}>
            <Button color="primary" className={classes.boton2}>Clientes</Button>
          </Link>
        </p>

        <p className={classes.elemento3}>
          <Link to={`/${vendedor}/admin/ventas`}>
            <Button color="primary" className={classes.boton2}>Ventas</Button>
          </Link>
        </p>

        <p className={classes.elemento3}>
          <Link to={`/${vendedor}/admin/pedidos`}>
            <Button color="primary" className={classes.boton2}>Pedidos</Button>
          </Link>
        </p>

        <p className={classes.elemento3}>
          <Link to={`/${vendedor}`} className={classes.miSitio}>Ver mi Sitio</Link> {/*target="_blank"   para que te mande a otra pestaña */}
        </p>

        <p class={classes.grow}></p> {/*asi SE Va bien para la derecha el nav y sus items*/}


        <p className={classes.elemento2}>
          <Link to={`/${vendedor}/admin`}>
            <Button color="primary" className={classes.boton2}>Ayuda</Button>
          </Link>
        </p>

        <p className={classes.elemento2}>
          <Button variant="outlined" color="primary" onClick={cerrarSesion} className={classes.boton2} >Cerrar sesion</Button>
        </p>

      </ul>
    </div>
  );
}



// <AppBar position="static" className={classes.nav}>
// <Toolbar>

//   <Link to='/' > {/* para que cuando se toque el logo te lleve al inicio */}
//     <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//       <strong>{vendedor}</strong>
//     </IconButton>
//   </Link>

//   {/*con este div decis, que el logo ocupe lo que tnga que ocupar, y luego lo siguiente que viene, boton, login, etc ocupen lo que quieran pero todo el espacio que hay entre medio crezca lo mas que pueda */}
//   {/* <div class={classes.grow}></div> */}

//   <Link to={`/${vendedor}/admin/productos`}>
//     <Button color="inherit" className={classes.buttonLogin} >Productos</Button>
//   </Link>

//   <Link to={`/${vendedor}/admin/diseño`}>
//     <Button  color="primary" className={classes.buttonRegister} >Diseño</Button>
//   </Link>

//   <Link to={`/${vendedor}/admin/formasDePago`}>
//     <Button  color="primary" className={classes.buttonRegister} >Formas de pago</Button>
//   </Link>


//   <Button variant="outlined" color="primary" onClick={cerrarSesion} className={classes.buttonRegister} >Cerrar sesion</Button>


// </Toolbar>
// </AppBar>

