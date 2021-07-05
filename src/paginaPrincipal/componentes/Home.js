import React from 'react';
//import {auth} from './firebase'
// import { actionTypes } from './reducer'
// import {useStateValue} from './StateProvider'



const Home = () =>{

  return (
    <div className="container">
      <div className="row mt-4">

        <div className="col-md-3">
          <div className="card card-body">
            <div className="form form-group">
              <p>
                ¡Estamos con vos!
                Te ofrecemos una variedad de canales para que elijas cómo querés ser atendido. Además podés acceder a tutoriales detallados sobre cada tema para que puedas resolver tus dudas con autonomía.
              </p>

            </div>
          </div>
        </div>


        <div className="col-md-4">
          <div className="card card-body">
            <div className="form form-group">
              <input type="text" placeholder="Nombre" className="btn btn-block"></input>
              <input type="text" placeholder="Nombre" className="btn btn-block"></input>
              <input type="text" placeholder="Nombre" className="btn btn-block"></input>
            </div>
          </div>
        </div>


        <div className="col-md-5">
          <div className="card card-body">
            <div className="form form-group">
              <input type="text" placeholder="Nombre" className="btn btn-block"></input>
              <input type="text" placeholder="Nombre" className="btn btn-block"></input>
              <input type="text" placeholder="Nombre" className="btn btn-block"></input>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}


export default Home;