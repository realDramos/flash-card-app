import React, {useState, useEffect} from "react";
import { createDeck} from "../../utils/api";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorMessage from "../ErrorMessage";

function CreateDeckView(){ 

    const initialFormDeck={
        name: "",
        description:"",
    }
    const [formData, setFormData] = useState({...initialFormDeck});
    const [error, setError] = useState(undefined);
    const history = useHistory();

    //when the forms are changed it will be reflected on the formData
    const handleChange = ({ target }) => {
        const value = target.value;
        setFormData({
            ...formData,
            [target.name]:value,
        });
    };

    //will call createDeck when submit button is clicked. 
    const handleSubmit = (event)=>{
        event.preventDefault();
        const abortController = new AbortController();

        createDeck(formData, abortController.signal)
        .then((data)=> setFormData(data))
        .catch(setError)
    }
    //when the deck is created it will send the user to the deck page
    useEffect(()=>{
        if (formData.id){
            history.push(`/decks/${formData.id}`);
        }
    },[formData.id, history])

    if(error){
        return <ErrorMessage error={error}/>;
    }


    if(formData) 
        return<div>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" 
                    placeholder="Deck Name" style={{width:'100%'}}
                    onChange={handleChange} value={formData.name}
                />
            </div>
            <div className="mt-3">
                <label htmlFor="description">Description</label>
                <textarea type="textarea" name="description" id="description" 
                    placeholder="Brief description of the deck"  
                    style={{width:'100%',height:'50px'}}
                    onChange={handleChange} value={formData.description}
                />
            </div>
            <div className="mt-3">
                <NavLink to={`/`} className="btn btn-secondary mr-2">Cancel</NavLink>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </form>

        </div>
}

export default CreateDeckView;