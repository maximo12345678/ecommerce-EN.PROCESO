import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


// IMPORTS PARA PODER USAR MIS VARIABLES GLOBALES
import { actionTypes } from '../../reducer'
import { useStateValue } from '../../StateProvider'



const useStyles = makeStyles((theme) => ({

  root: {
    marginLeft: theme.spacing(46),
    margin: 40, //separa de la parte superior de la pagina
    padding: 10, //lo baja un poco pero tambien lo acerca a la derecha
  },

}))

function DiseñoAdmin() {

  const classes = useStyles();

  const [{ eleccionDiseño }, dispatch] = useStateValue()

  const cambiarDiseño1 = () => {
    dispatch({
      type: actionTypes.MODIFICAR_ELECCION_DISEÑO,
      eleccionDiseño: 1
    })
  }

  const cambiarDiseño2 = () => {
    dispatch({
      type: actionTypes.MODIFICAR_ELECCION_DISEÑO,
      eleccionDiseño: 2
    })
  }

  const cambiarDiseño3 = () => {
    dispatch({
      type: actionTypes.MODIFICAR_ELECCION_DISEÑO,
      eleccionDiseño: 3
    })
  }

  const cambiarDiseño4 = () => {
    dispatch({
      type: actionTypes.MODIFICAR_ELECCION_DISEÑO,
      eleccionDiseño: 4
    })
  }

  // const cambiarDiseño5 = () => {
  //   dispatch({
  //     type: actionTypes.MODIFICAR_ELECCION_DISEÑO,
  //     eleccionDiseño: 5
  //   })
  // }

  // const cambiarDiseño6 = () => {
  //   dispatch({
  //     type: actionTypes.MODIFICAR_ELECCION_DISEÑO,
  //     eleccionDiseño: 6
  //   })
  // }

  // const cambiarDiseño7 = () => {
  //   dispatch({
  //     type: actionTypes.MODIFICAR_ELECCION_DISEÑO,
  //     eleccionDiseño: 7
  //   })
  // }

  // const cambiarDiseño8 = () => {
  //   dispatch({
  //     type: actionTypes.MODIFICAR_ELECCION_DISEÑO,
  //     eleccionDiseño: 8
  //   })
  // }


  return (
    <div className={classes.root}>
      <h1>Diseño</h1>
      <Grid container spacing={5} className="mt-5"> {/* spacing es como el pading entre los cards */}

        <Grid item xs={12} sm={6} md={4} lg={3}>{/* cuando sea pequeño que ocupe todo, un poco mas grande solo la mitad de la tarjeta, un poco mas grande que cada tarjeta ocupe 1/3 de la pantalla, cuando sea grande que cada tarjeta ocupe 1/4 de la pantalla              este breakpoint dice que pase lo que pae con el tamaño de la resolucion, este card ocupa toda la columna igual .  XS extra small, SM small. el numero es la cantidad e columnas  -  poniendole a todos lo mismo todos se comportan igual*/}
          <button type="submit" className="btn btn-success" onClick={cambiarDiseño1}> 1 </button>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>{/* cuando sea pequeño que ocupe todo, un poco mas grande solo la mitad de la tarjeta, un poco mas grande que cada tarjeta ocupe 1/3 de la pantalla, cuando sea grande que cada tarjeta ocupe 1/4 de la pantalla              este breakpoint dice que pase lo que pae con el tamaño de la resolucion, este card ocupa toda la columna igual .  XS extra small, SM small. el numero es la cantidad e columnas  -  poniendole a todos lo mismo todos se comportan igual*/}
          <button type="submit" className="btn btn-success" onClick={cambiarDiseño2}> 2 </button>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>{/* cuando sea pequeño que ocupe todo, un poco mas grande solo la mitad de la tarjeta, un poco mas grande que cada tarjeta ocupe 1/3 de la pantalla, cuando sea grande que cada tarjeta ocupe 1/4 de la pantalla              este breakpoint dice que pase lo que pae con el tamaño de la resolucion, este card ocupa toda la columna igual .  XS extra small, SM small. el numero es la cantidad e columnas  -  poniendole a todos lo mismo todos se comportan igual*/}
          <button type="submit" className="btn btn-success" onClick={cambiarDiseño3}> 3 </button>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>{/* cuando sea pequeño que ocupe todo, un poco mas grande solo la mitad de la tarjeta, un poco mas grande que cada tarjeta ocupe 1/3 de la pantalla, cuando sea grande que cada tarjeta ocupe 1/4 de la pantalla              este breakpoint dice que pase lo que pae con el tamaño de la resolucion, este card ocupa toda la columna igual .  XS extra small, SM small. el numero es la cantidad e columnas  -  poniendole a todos lo mismo todos se comportan igual*/}
          <button type="submit" className="btn btn-success" onClick={cambiarDiseño4}> 4 </button>
        </Grid>


        <h2>Diseño elegido: {eleccionDiseño}</h2>

      </Grid>

      <br/><br/><br/><br/><br/>
      <h2 className="mt-5">Subir logo</h2>


    </div>

  );

}

export default DiseñoAdmin
