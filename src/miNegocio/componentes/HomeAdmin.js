import React from 'react';
//import {auth} from './firebase'
// import { actionTypes } from './reducer'
// import {useStateValue} from './StateProvider'


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

  root: {
    marginLeft: theme.spacing(46),
    margin: 40, //separa de la parte superior de la pagina
    padding: 10, //lo baja un poco pero tambien lo acerca a la derecha
  },

}))

const HomeAdmin = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Home</h1>
    </div>
  );
}


export default HomeAdmin;