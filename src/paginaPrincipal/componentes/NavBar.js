import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import { red } from '@material-ui/core/colors';

import { Link } from 'react-router-dom'
import { CommuteRounded, SentimentDissatisfiedOutlined, VerticalAlignTopSharp } from '@material-ui/icons';


// IMPORTS PARA PODER USAR MIS VARIABLES GLOBALES
import { actionTypes } from '../../reducer'
import { useStateValue } from '../../StateProvider'

//import {auth} from './firebase'
// import { actionTypes } from './reducer'
// import {useStateValue} from './StateProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  navegador: {
    background: "white",
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(10),
    color: "#b71c1c",
  },
  buttonLogin: {
    marginRight: theme.spacing(3),
    color: "blue",
  },
  buttonRegister: {
    marginRight: theme.spacing(3),
    color: "blue"
  }
}));

export default function NavBar() {
  const classes = useStyles();

  const [{ vendedor }, setVendedor] = useStateValue();//hacer el destructory para obtener el basket que ahora esta vacio, y la funcion dispatch que usamos para despachar los datos


  return (
    <div className={classes.root}>
      {/* <link href="https://bootswatch.com/4/sketchy/bootstrap.min.css" rel="stylesheet" /> */}

      <AppBar position="static" className={classes.navegador}>
        <Toolbar>

          <Link to='/' > {/* para que cuando se toque el logo te lleve al inicio */}
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <strong>Tu negocio</strong>
            </IconButton>
          </Link>

          {/*con este div decis, que el logo ocupe lo que tnga que ocupar, y luego lo siguiente que viene, boton, login, etc ocupen lo que quieran pero todo el espacio que hay entre medio crezca lo mas que pueda */}
          <div class={classes.grow}></div>

          <Link to='/loginVendedor'>
            <Button color="inherit" className={classes.buttonLogin} type="submit">Ingresar</Button>
          </Link>

          <Link to='/registerVendedor'>
            <Button variant="outlined" color="primary" className={classes.buttonRegister} type="submit">Crea tu Negocio</Button>
          </Link>

        </Toolbar>
      </AppBar>

      {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
        </div>
      </nav> */}


    </div>
  );
}

