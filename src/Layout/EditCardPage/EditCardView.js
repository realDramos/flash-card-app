import React, {useState, useEffect}  from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorMessage from "../ErrorMessage";
import { updateCard } from "../../utils/api/index"


 function EditCardView({card, deckId}){
     const [error, setError] = useState(undefined);
     const history = useHistory();

    //since the card already has data the initial data is already filled in with deckId
    const initialFormCard={
        front:card.front,
        back:card.back,
        deckId: Number(deckId),
    }

    const [formData, setFormData] = useState({...initialFormCard});

    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value});
    };

    const handleSubmit = async(event)=>{
        event.preventDefault();
        const abortController = new AbortController();
        //calling card.id so that card has the same id
        formData.id = card.id
        updateCard(formData, abortController.signal)
        .then((data)=> setFormData(data))
        .catch(setError)
    }

    //when the card is edited it will send the user to the deck page
    useEffect(()=>{
        if (formData.id){
            history.push(`/decks/${deckId}`);
        }
    },[formData.id, history])

    if(error){
        return <ErrorMessage error={error}/>;
    }


    if(formData) 
        return<div>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="front">Front</label>
                <textarea type="textarea" id="front" name="front" 
                   placeholder="Front side of card"  style={{width:'100%'}}
                    onChange={handleChange} value={formData.front}
                />
            </div>
            <div className="mt-3">
                <label htmlFor="back">Back</label>
                <textarea type="textarea" name="back" id="back" placeholder="Back side of card" 
                    style={{width:'100%',height:'50px'}}
                    onChange={handleChange} value={formData.back}
                />
            </div>
            <div className="mt-3">
                <NavLink to={`/decks/${deckId}`} className="btn btn-secondary mr-2">Cancel</NavLink>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </form>
        </div>
        
        // if(formData) 
        // return<div>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //         <label htmlFor="front">Front</label>
        //         <textarea type="textarea" id="front" name="front" 
        //            placeholder="Front side of card"  style={{width:'100%'}}
        //             onChange={handleChange} value={formData.front}
        //         />
        //     </div>
        //     <div className="mt-3">
        //         <label htmlFor="back">Back</label>
        //         <textarea type="textarea" name="back" id="back" placeholder="Back side of card" 
        //             style={{width:'100%',height:'50px'}}
        //             onChange={handleChange} value={formData.back}
        //         />
        //     </div>
        //     <div className="mt-3">
        //         <NavLink to={`/decks/${deckId}`} className="btn btn-secondary mr-2">Cancel</NavLink>
        //         <button type="submit" className="btn btn-primary">Submit</button>
        //     </div>
        //     </form>
        // </div>
}
export default EditCardView;