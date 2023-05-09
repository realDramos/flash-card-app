import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import ErrorMessage from "../ErrorMessage";
import { createCard } from "../../utils/api";

function AddCardView({deck}){ 
    const initialFormCard={
        front: "",
        back:"",
    }
    //
    const [formData, setFormData] = useState({...initialFormCard});
    //for the errors
    const [error, setError] = useState(undefined);


    const handleChange = ({ target }) => {
        const value = target.value;
        setFormData({
            ...formData,
            [target.name]:value,
        });
    };
    //sends the request to create the card
    const handleSubmit = (event)=>{
        event.preventDefault();
        const abortController = new AbortController();
        createCard(deck.id, formData, abortController.signal)
        .then((data)=> setFormData(data))
        .catch(setError)
    }
    //when the card is created reload the page
    useEffect(()=>{
        if (formData.id){
            window.location.reload();
        }
    },[formData.id])
    
    if(error){
        return <ErrorMessage error={error}/>;
    }

//if formData exists then render all the the form on the page
    if(formData) 
        return<div>
            <h1>Add Card</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="front">Front</label>
                <textarea type="textarea" id="front" name="front" 
                    placeholder="Front side of card" style={{width:'100%'}}
                    onChange={handleChange} value={formData.front}
                />
            </div>
            <div className="mt-3">
                <label htmlFor="back">Back</label>
                <textarea type="textarea" name="back" id="back" 
                    placeholder="Back side of card"  
                    style={{width:'100%',height:'50px'}}
                    onChange={handleChange} value={formData.back}
                />
            </div>
            <div className="mt-3">
                <NavLink to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">Done</NavLink>
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
            </form>

        </div>
}
export default AddCardView;