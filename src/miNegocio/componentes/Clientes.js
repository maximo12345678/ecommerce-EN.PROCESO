import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

  root: {
    marginLeft: theme.spacing(46),
    margin: 40, //separa de la parte superior de la pagina
    padding: 10, //lo baja un poco pero tambien lo acerca a la derecha
  },

}))

function Clientes () {

  const classes = useStyles();

  return (
    <div className={classes.root}>
        <h1>Clientes</h1>

    </div>

  );

}

export default Clientes