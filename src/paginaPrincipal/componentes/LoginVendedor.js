import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Link as LinkRoute, useHistory } from 'react-router-dom'

//import Cookies from 'universal-cookie'

import { actionTypes } from '../../reducer'
import { useStateValue } from '../../StateProvider'


import axios from 'axios'


//const borrado variables globales = {
//import { actionTypes } from '../../reducer'
//import { useStateValue } from '../../StateProvider'
// const login = () =>{
//   //antes de mandar al panel, tengo que ver si los datos ingresados se encuentran en la base de datos, si coincide lo mandas, sino mostras mensaje de error.
//   //ademas, el estado global de usuario logueado, lo modificamos aca tambien.

//   //modifico la variable global VENDEDOR. asi en el useEffect del APP.js se crea la ruta con ese valor 
//   dispatch({
//     type: actionTypes.SET_VENDEDOR,
//     vendedor: email, //le pasamos al vendedor, la variable del estado, asi pasa de estar NULL a tener el email que ingreso el usuario
//   })
//   history.push(`/${vendedor}/admin`)

// }

// const login = () => dispatch({ //despachamos el ID del item a eliminar 
//   type: actionTypes.SET_EMAIL,
//   vendedor: email,
// })

//const [{user}, dispatch] = useStateValue()
//}


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function LoginVendedor() {
  const classes = useStyles();

  //para guardar los valores que se ingresen en los inputs 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")



  //en esta url tenemos los datos de todos los vendedores registrados
  const uriVendedor = "https://webapiesuper.azurewebsites.net/api/vendedores/"

  //usamos para que cuando se registre exitosamente, redireccionarlo directamente a su panel de control
  const history = useHistory()

  //variable global que siempre va a ser null o "nombreNegocio", cuando se loguee o registre un vendedor se le asigna ese campo asi se generan las rutas y durante todo el codigo sabemos que vendedor esta usando la app
  const [{ vendedor, idVendedor }, dispatch] = useStateValue()

  //variable para el mensaje de error
  const [msjError, setMsjError] = useState("")
  //variable para cerrar y abrir la ventana de alerta con el boton
  const [modalError, setModalError] = useState(false)

  const modificarModalError = () => {
    setModalError(!modalError)
  }


  //objeto para guardar aca los datos del nuevo vendedor.   CUANDO ESTE EL METODO PARA BUSCAR POR EMAIL EN LA API, ESTO NO VA A SER NECESARIO
  const [objetoVendedor, setObjetoVendedor] = useState({
    Id: 0,
    NombreUsuario: '',
    eMail: '',
    Pwd: '',
    Hash: '',
    Direccion: '',
    Localidad: '',
    Telefono: '',
    Provincia: '',
    Pais: '',
    Estado: '',
    //FechaAlta: '',
    Facebook: '',
    Instagram: '',
    Twiter: '',
    Apellido: '',
    Nombre: '',
    Cbu: '',

  })

  //este array contiene objetos del tipo "nuevoVendedor" y se llenara con la consulta a la api
  const [arrayVendedores, setArrayVendedor] = useState([objetoVendedor])



  // LLENAMOS UN ARRAY CON TODOS LOS VENDEDORES QUE HAY REGISTRADOS EN LA TABLA , CUANDO PAPA CREE EL METODO PARA BUSCAR POR EMAIL(dato unico), NO VA A SER NECESARIO TRAER TODOS, SINO QUE BUSCAR EN LA TABLA EL EMAIL INGRESADO

  const llenarArray = async () => {
    //CONSULTA PARA TRAER LOS DATOS DE LA TABLA DE VENDEDORES los cargo en un array de vendedores ---    
    await axios.get(uriVendedor)
      .then(response => {
        setArrayVendedor(response.data)
      }).catch(error => {
        console.log(error)
      })

  }

  useEffect(() => {

    llenarArray()

  }, [])

  const validaciones = () => {

    //USO UNA VARIABLE, PORQUE SI PONGO DIRECTAMENTE RETURN TRUE O RETURN FALSE, cuando esta dentro del mapeo, sale del mapeo pero no sale de la funcion
    let validacion = {
      correo: true,
      contra: true,
      nombreUser: '',
      idUser: '',
    }

    //validaciones de campos vacios, 
    // if (email == '') { //se podria hacer !nuevoVendedor.NombreUsuario.trim()
    //   setMsjError("El email esta vacio !!")
    //   setModalError(true)
    //   validacion.correo = false

    // } else if (password == '') {
    //   setMsjError("La contraseña esta vacia !!")
    //   setModalError(true)
    //   validacion.contra = false

    // }

    
    //nombre de negocio o email ya utilizados en otros vendedores.
    // TENER CUIDADO CON QUE TE DIGA QUE LA CONTRASEÑA ESTA BIEN Y EL EMAIL MAL, PORQUE ALGUIEN PODRIA PROBAR TODOS LOS EMAILS Y ACCEDER
    arrayVendedores.map(vend => {
      if (vend.email == email) {
        validacion.correo = true

      } else {
        setMsjError("El email es incorrecto!!")
        setModalError(true)
        validacion.correo = false
      }

      if (vend.pwd == password) { //buscar contraseña solo si el email coincide.
        validacion.contra = true
      } else {
        setMsjError("La contraseña es incorrecta!!")
        setModalError(true)
        validacion.contra = false
      }

      if ((validacion.correo == true) && (validacion.contra == true)) { 
        validacion.nombreUser = vend.nombreUsuario
        validacion.idUser = vend.id
      }

    })






    return validacion;
  }



  const login = (e) => {
    //antes de mandar al panel, tengo que ver si los datos ingresados se encuentran en la base de datos, si coincide lo mandas, sino mostras mensaje de error.
    //ademas, el estado global de usuario logueado, lo modificamos aca tambien.
    e.preventDefault()


    let validacion = validaciones()

    // alert(validacion.correo)
    // alert(validacion.contra)
    // alert(validacion.nombreUser)

    if((validacion.correo == true) && (validacion.contra == true)) {

      dispatch({
        type: actionTypes.SET_VENDEDOR,
        vendedor: validacion.nombreUser, //le pasamos al vendedor, la variable del estado, asi pasa de estar NULL a tener el email que ingreso el usuario
      })
      dispatch({
        type: actionTypes.SET_ID_VENDEDOR,
        idVendedor: validacion.idUser, //le pasamos al vendedor, la variable del estado, asi pasa de estar NULL a tener el email que ingreso el usuario
      })
      history.push(`/${validacion.nombreUser}/admin`)

    }

    //modifico la variable global VENDEDOR. asi en el useEffect del APP.js se crea la ruta con ese valor 
    // dispatch({
    //   type: actionTypes.SET_VENDEDOR,
    //   vendedor: email, //le pasamos al vendedor, la variable del estado, asi pasa de estar NULL a tener el email que ingreso el usuario
    // })
    // history.push(`/${email}/admin`)

  }





  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicie su sesion!
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={(e) => (setEmail(e.target.value))}
              autoFocus
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Correo electronico"
              name="email"
              autoComplete="email"
              placeholder="Correo electronico"
            />
            <TextField
              onChange={(e) => (setPassword(e.target.value))}
              variant="outlined"
              required
              fullWidth
              margin="normal"
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="Contraseña"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar"
            />

            {
              modalError ?
                (
                  <div className="alert alert-danger alert-dismissible " role="alert">
                    <strong>Error!</strong> {msjError}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={modificarModalError}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                )
                :
                (
                  <span></span>
                )

            }

            <Button //{/*habia pensado en ponerle in LINK aca, pero es al pedo. si yo tengo que validar que se loguee bien en una funcion, alla lo mando a ADMIN */}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => (login(e))}
            >
              Iniciar sesion
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Se te olvido tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <LinkRoute to='/registerVendedor' variant="body2">
                  {"No tenes cuenta? Create una!!"}
                </LinkRoute>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}



// const [nuevoVendedor, setNuevoVendedor] = useState({
  //   id: 0,
  //   nombrePersonal: '',
  //   email: '',
  //   password: '',
  //   nombreNegocio: '',
  //   direccion: '',
  //   localidad: '',
  //   telefono: '',
  //   provincia: '',
  //   pais: '',
  //   estado: '',
  //   fechaAlta: '',
  //   urlFacebook: '',
  //   urlInstagram: '',
  //   numeroWhatsapp: '',

  // })

  //const cookies = new Cookies()
  // const login = () => {
  //   //antes de mandar al panel, tengo que ver si los datos ingresados se encuentran en la base de datos, si coincide lo mandas, sino mostras mensaje de error.
  //   //ademas, el estado global de usuario logueado, lo modificamos aca tambien.

  //   //puede ser el dato que quieras, la cantidad de datos que quieras, pero siempre el PATH con la barra para que se pueda usar en TODAS las paginas. si quisieras que solo se use en X componente pones path: '/pálabras' por ejemplo
  //   cookies.set("emailUsuario", email, {path: '/'})
  //   cookies.set("passwordUsuario", password, {path: '/'})

  //   history.push(`/${email}/admin`)

  // }
