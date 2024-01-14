import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import {putRatingStars} from '../../redux/services/postRatingStars'

export const ReviewsProfile = ({rating, productId, userId})=>{

  const dispatch = useDispatch();

    const [readOnly, setReadOnly] = useState(true)

    const handleRating = (newRate) => {
        dispatch(putRatingStars(newRate, productId, userId));
        rating = newRate;
        setReadOnly(true)
    }
    const handleOnClick = () => {
       setReadOnly(false) 
    }

  
  return (
    <div className='App'>
      <Rating
        readonly={readOnly}
        onClick={handleRating}
        initialValue={rating}
        SVGstyle={{ display: 'inline-block' }}
        size={25}
      />
      <button onClick={handleOnClick}>
      <FaRegEdit />
      </button>
    </div>
  )   
}