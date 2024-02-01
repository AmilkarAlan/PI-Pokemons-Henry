import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postPokemon } from '../../redux/action'
const PokeForm = () => {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types)
    const [ form, setForm ] = useState({
        name: "",
        base_hp: "",
        base_attack: "",
        base_defense: "",
        base_speed: "",
        height: "",
        weight: "",
        types:[]
    })

    const [ typesSelect, setTypesSelect ] = useState([])

    const maxTypes = 2

    console.log(form);
    const handleTypeChange = (e, typeName) => {
        const check = e.target.checked;
        if (check) {
            if (typesSelect.length < maxTypes) {
                // setTypesSelect([ ...typesSelect, {name:typeName} ])
                setForm((prevState)=>({
                    types:[...prevState.types, {name:typeName}]
                }))
            } else {
                alert("No puedes seleccionar más de dos tipos");
            }
        } else {
            setTypesSelect(typesSelect.filter((type) => type !== typeName));
        }
    }
    const handleChange = (e) => {
        setForm({ ...form, [ e.target.name ]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        dispatch(postPokemon(form))
    }
    return (
        <div>
            <h1>Crear un pokemon</h1>
            <form onSubmit={ (e) => handleSubmit(e) }>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={ form.name }
                        onChange={ (e) => handleChange(e) }
                    />
                </label>
                <label>
                    HP base:
                    <input
                        type="number"
                        name="base_hp"
                        value={ form.base_hp }
                        onChange={ (e) => handleChange(e) }
                    />
                </label>
                <label>
                    Ataque base:
                    <input
                        type="number"
                        name="base_attack"
                        value={ form.base_attack }
                        onChange={ (e) => handleChange(e) }
                    />
                </label>
                <label>
                    Defensa base:
                    <input
                        type="number"
                        name="base_defense"
                        value={ form.base_defense }
                        onChange={ (e) => handleChange(e) }
                    />
                </label>
                <label>
                    Velocidad base:
                    <input
                        type="number"
                        name="base_speed"
                        value={ form.base_speed }
                        onChange={ (e) => handleChange(e) }
                    />
                </label>
                <label>
                    Altura:
                    <input
                        type="number"
                        name="height"
                        value={ form.height }
                        onChange={ (e) => handleChange(e) }
                    />
                </label>
                <label>
                    Peso:
                    <input
                        type="number"
                        name="weight"
                        value={ form.weight }
                        onChange={ (e) => handleChange(e) }
                    />
                </label>
                <div >
                    Tipos:
                    <label>
                        { types.map((type) => (
                            <div key={ type.name }>
                                <p>{type.name}</p>
                                <input
                                    type="checkbox"
                                    name='type'
                                    value={ type.name }
                                    checked={ typesSelect.includes(type.name) }
                                    onChange={ (event) => handleTypeChange(event, type.name) } />
                            </div>
                        )) }

                    </label>
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    )
}

export default PokeForm