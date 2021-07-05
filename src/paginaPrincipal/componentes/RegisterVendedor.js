import React, { useEffect, useState } from 'react';
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

// TEMPORALMENTE PARA DARLE UN ID UNICO A CADA VENDEDOR QUE AGREGO 
import uniqid from 'uniqid'

//para consultar a las apis
import axios from 'axios'

//para poder acceder a las variables globales
import { actionTypes } from '../../reducer'
import { useStateValue } from '../../StateProvider'

//para el mensaje de alerta
import Alert from '@material-ui/lab/Alert';
import { VerticalAlignTopRounded } from '@material-ui/icons';



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

export default function RegisterVendedor() {
  const classes = useStyles();

  //objeto para guardar aca los datos del nuevo vendedor
  const [nuevoVendedor, setNuevoVendedor] = useState({
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
  const [arrayVendedores, setArrayVendedor] = useState([nuevoVendedor])

  //para guardar los states de los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevoVendedor({ ...nuevoVendedor, [name]: value })
  }

  //en esta url tenemos los datos de todos los vendedores registrados
  const uriVendedor = "https://webapiesuper.azurewebsites.net/api/vendedores/"

  //usamos para que cuando se registre exitosamente, redireccionarlo directamente a su panel de control
  const history = useHistory()

  //variable global que siempre va a ser null o "nombreNegocio", cuando se loguee o registre un vendedor se le asigna ese campo asi se generan las rutas y durante todo el codigo sabemos que vendedor esta usando la app
  const [{ vendedor, idVendedor }, dispatch] = useStateValue()

  const [msjError, setMsjError] = useState("")
  const [modalError, setModalError] = useState(false)

  const modificarModalError = () => {
    setModalError(!modalError)
  }


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


  const validaciones = () =>{ 

    //USO UNA VARIABLE, PORQUE SI PONGO DIRECTAMENTE RETURN TRUE O RETURN FALSE, cuando esta dentro del mapeo, sale del mapeo pero no sale de la funcion
    let validacion = true

    //validaciones de campos vacios, 
    if (nuevoVendedor.NombreUsuario == '') { //se podria hacer !nuevoVendedor.NombreUsuario.trim()
      setMsjError("El nombre del negocio esta vacio !!")
      setModalError(true)
      validacion = false

    } else if (nuevoVendedor.eMail == '') {
      setMsjError("El email esta vacio !!")
      setModalError(true)
      validacion = false

    }

    
    //contraseña insegura o que cumpla con ciertos requisitos,
    if (nuevoVendedor.Pwd.length < 6) {

      setMsjError("Tu contraseña debe tener al menos 6 caracteres. Prueba con otra.")
      setModalError(true)
      validacion = false

    }

    //nombre de negocio o email ya utilizados en otros vendedores.
    arrayVendedores.map(vend => {
      if (vend.nombreUsuario == nuevoVendedor.NombreUsuario) {
        setMsjError("El nombre de tu negocio ya existe :( ")
        setModalError(true)
        validacion = false

      }
      else if (vend.email == nuevoVendedor.eMail) {
        setMsjError("El email ya existe :( ")
        setModalError(true)
        validacion = false

      }
    })


    return validacion;
  }


  // faltan mas validaciones, tema de fecha de alta, doble contraseña, recordar contraseña, acuerdos y terminos . ENCRIPTAR CONTRASEÑA. mayusculas, caracteres raros, espacios en blanco.   
  // HACER EL REGISTER ASI, CON MAS VALIDACIONES Y ESE DISEÑO 
  // https://www.youtube.com/watch?v=tli5n_NqQW8&ab_channel=FalconMasters 
  // https://github.com/falconmasters/validacion-formularios-react
  const crearNuevoVendedor = async (e) => {
    e.preventDefault()

    let validacion = validaciones()

    if (validacion == true){
      await axios.post(uriVendedor, nuevoVendedor) //metodo POST, recibe 2 parametros. la url y el objeto a agregar.
      .then(response => { //si se agrego bien, entra aca.
        
        // MOSTRAR ALERTA DE FELICITACIONES EN VERDE 

        dispatch({
          type: actionTypes.SET_VENDEDOR,
          vendedor: nuevoVendedor.NombreUsuario, //le pasamos al vendedor, la variable del estado, asi pasa de estar NULL a tener el email que ingreso el usuario
        })


        
        let ultimaPosicion = (arrayVendedores.length) - 1
        dispatch({
          type: actionTypes.SET_ID_VENDEDOR,
          idVendedor: (arrayVendedores[ultimaPosicion].id) + 1 , //le pasamos al vendedor, la variable del estado, asi pasa de estar NULL a tener el email que ingreso el usuario
        })

        history.push(`/${nuevoVendedor.NombreUsuario}/admin`)


      }).catch(error => { //si no se logro agregar a la tabla, mostramos por consola el error
        console.log(error)
        console.log(nuevoVendedor)
      })
    }


    // borramos el campo id del objeto antes de subirlo a la base de datos, ya que tiene un ID autoincrementable y daria error
    // delete nuevoVendedor.Id;
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
            Registre su negocio!
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>

              {/* inicio inputs */}

              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleChange}
                  autoComplete="fname"
                  name="NombreUsuario"
                  value={nuevoVendedor.NombreUsuario}
                  variant="outlined"
                  required
                  fullWidth
                  id="NombreUsuario"
                  label="Nombre Negocio"
                  placeholder="Nombre Negocio"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="nombrePersonal"
                  label="Nombre personal"
                  name="Nombre"
                  value={nuevoVendedor.Nombre}
                  autoComplete="lname"
                  placeholder="Nombre personal"
                  onChange={handleChange}

                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Correo electronico"
                  name="eMail"
                  value={nuevoVendedor.eMail}
                  autoComplete="email"
                  placeholder="Correo electronico"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Pwd"
                  value={nuevoVendedor.Pwd}
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="Contraseña"
                  onChange={handleChange}
                />
              </Grid>

              {/* sin inputs */}

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Acepto los terminos"
                />
              </Grid>

            </Grid>
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


            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => (crearNuevoVendedor(e))}
            >
              Crear mi negocio
            </Button>


            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Se te olvido tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <LinkRoute to='/loginVendedor' variant="body2">
                  {"Ya tenes una cuenta? Inicia sesion!!"}
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


