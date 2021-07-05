import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'


const SubCategorias = () => {

    const [categoria, setCategoria] = useState({
        id: 0,
        nombre: ''
    })
    const [categorias, setCategorias] = useState([categoria])

    const [subcategoria, setSubcategoria] = useState({
        id: 0,
        idcategoria: 0,
        nombre: ""
    })

    const [subsubcategoria, setsubSubcategoria] = useState({
        id: 0,
        idcategoria: 0,
        idsubcategoria:0,
        nombre: ""
    })
    
    const [subsubcategorias, setsubSubCategorias] = useState([subsubcategoria])

    const [subcategorias, setSubcategorias] = useState([subcategoria])
    const [idcat, setIdcat]=useState(0);
    const [idsubcat, setsubIdcat]=useState(0);
    const [idsubsubcat, setIdsubsubcat]=useState(0);
    

    const uriCat = "https://webapiesuper.azurewebsites.net/api/categorias/"
    const uriSubCat = "https://webapiesuper.azurewebsites.net/api/subcategorias/"
    const uriSubSub = "https://webapiesuper.azurewebsites.net/api/subsubcategorias/"

    useEffect(() => {
        peticionGet()
    }, [])

    const peticionGet = async () => {
        await axios.get(uriCat)
            .then(response => {
                setCategorias(response.data)
            }).catch(error => {
                console.log(error)
            })
        await axios.get(uriSubCat)
            .then(response => {
                setSubcategorias(response.data)
            }).catch(error => {
                console.log(error)
            })
        await axios.get(uriSubSub)
            .then(response => {
                setsubSubCategorias(response.data)
            }).catch(error => {
                console.log(error)
            })            
    }
    const categselected = ()=> {
        setIdcat(document.getElementById("optcategorias").value)
    }

    const subcategselected = ()=> {
        setsubIdcat(document.getElementById("optsubcategorias").value)
    }
    const subsubcategselected = ()=> {
        setIdsubsubcat(document.getElementById("optsubsubcategorias").value)
    }
    return (

        <div>

            <div> Categoria:
                <select select={false} onChange={categselected} className="custom-select" id="optcategorias">
                    { categorias.map ( categ => 
                    <option  key={categ.id} value={categ.id}>{categ.nombre}</option>
                    )}
                </select>
            </div>
            <div>
                <div>{idcat}</div>
 
            </div>

            <div> Sub Categoria
                <select onChange={subcategselected} className="custom-select" id="optsubcategorias">
                    { subcategorias.filter(e=>e.idCategoria==idcat).map ( subcateg => 
                    <option  key={subcateg.id} value={subcateg.id}>{subcateg.nombre}</option>
                    )}
                </select>
            </div>
            <div>
                <div>{idsubcat}</div>
           
            </div>
            <div> Sub Sub Categoria
                <select onChange={subsubcategselected} className="custom-select" id="optsubsubcategorias">
                    { subsubcategorias.filter(e=>e.idCategoria==idcat && e.idSubcategoria==idsubcat).map ( subsubcateg => 
                    <option  key={subsubcateg.id} value={subsubcateg.id}>{subsubcateg.nombre}</option>
                    )}
                </select>
            </div>

            <div>{idsubsubcat}</div>

        </div>
    )

}

export default SubCategorias