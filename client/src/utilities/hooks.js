import { useState } from 'react';

export const useForm = ( callback, initialState = {} ) => {

    const [values, setValues] = useState({initialState});

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        //depending on what page this hook is used in, this callback function might be different so defining it just as a general callback function makes this more generic
        callback(); 
    }

    return {
        onChange,
        onSubmit,
        values
    }
}


