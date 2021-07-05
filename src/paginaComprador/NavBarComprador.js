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


import { actionTypes } from '../reducer'
import {useStateValue} from '../StateProvider'

const useStyles = makeStyles((theme) => ({

  root: {
    marginLeft: theme.spacing(46),
    margin: 40, //separa de la parte superior de la pagina
    padding: 10, //lo baja un poco pero tambien lo acerca a la derecha
  },

}));

export default function NavBarComprador() {

  const classes = useStyles();

  const [{ eleccionDiseño }, dispatch] = useStateValue()


  return (
    <div className={classes.root}>
      <h1>MI SITIO</h1>

      {
        eleccionDiseño == 1 ?
        (
          <link href="https://bootswatch.com/5/materia/bootstrap.min.css" rel="stylesheet"/>

        )
        :
        eleccionDiseño == 2 ?
        (
          <link href="https://bootswatch.com/4/sketchy/bootstrap.min.css" rel="stylesheet"/>

        )
        :
        eleccionDiseño == 3 ?
        (
          <link href="https://bootswatch.com/5/lux/bootstrap.min.css" rel="stylesheet"/>

        )
        :
        eleccionDiseño == 4 ?
        (
          <link href="https://bootswatch.com/5/united/bootstrap.min.css" rel="stylesheet"/>

        )
        :
        (
          <span></span>
        )


      }



      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </div>
  );
}
