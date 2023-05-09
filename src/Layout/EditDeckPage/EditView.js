import React, {useState, useEffect}  from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorMessage from "../ErrorMessage";
import { updateDeck } from "../../utils/api/index"

function EditView({deck}){
    //since the deck already exists then the data is already filled in
    const initialFormDeck={
        name: deck.name,
        description: deck.description,
    }
    const [formData, setFormData] = useState({...initialFormDeck});
    const [error, setError] = useState(undefined);
    const history = useHistory();


    const handleChange = ({ target }) => {
        const value = target.value;
        setFormData({
            ...formData,
            [target.name]:value,
        });
    };

    //send the updateDeck function
    const handleSubmit = (event)=>{
        event.preventDefault();
        const abortController = new AbortController();
        formData.id = deck.id
        updateDeck(formData, abortController.signal)
        .then((data)=> setFormData(data))
        .catch(setError)
    }

    //when the deck is updated then it send the user to the deck page
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
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" 
                    placeholder={deck.name} style={{width:'100%'}}
                    onChange={handleChange} value={formData.name}
                />
            </div>
            <div className="mt-3">
                <label htmlFor="description">Description</label>
                <textarea type="textarea" name="description" id="description" 
                    placeholder={deck.description}  
                    style={{width:'100%',height:'50px'}}
                    onChange={handleChange} value={formData.description}
                />
            </div>
            <div className="mt-3">
                <NavLink to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">Cancel</NavLink>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </form>

        </div>
}
export default EditView;