import React, { useEffect, useState } from "react";
import { createCard, updateCard } from "../utils/api";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorMessage from "./ErrorMessage";

function EditAddCard({deckId, card , addCard, deck,}){
  const [error, setError] = useState(undefined);
  const history = useHistory();

  let initialFormCard
  if(addCard ===true){
   initialFormCard={
      front: "",
      back:"",
    }
  }else{
     initialFormCard={
    front:card.front,
    back:card.back,
    deckId: Number(deckId),
    }
  }
  
const [formData, setFormData] = useState({...initialFormCard});

const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value});
};

const handleSubmit = async(event)=>{
  event.preventDefault();
  const abortController = new AbortController();
   if(addCard===true){
      createCard(deck.id, formData, abortController.signal)
        .then((data)=> setFormData(data))
        .catch(setError)
   }else{
      formData.id = card.id
      updateCard(formData, abortController.signal)
      .then((data)=> setFormData(data))
      .catch(setError)
   }
}

//when the card is edited it will send the user to the deck page
useEffect(()=>{
    if (formData.id){
      addCard===true?window.location.reload() : history.push(`/decks/${deckId}`);
        
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
        {addCard===true? 
          <div className="mt-3">
            <NavLink to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">Done</NavLink>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
          :
          <div className="mt-3">
            <NavLink to={`/decks/${deckId}`} className="btn btn-secondary mr-2">Cancel</NavLink>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        }
        </form>
    </div>
}
export default EditAddCard;