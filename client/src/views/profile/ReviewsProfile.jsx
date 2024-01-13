import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { FaRegEdit } from "react-icons/fa";

export const ReviewsProfile = ()=>{
    const [rating, setRating] = useState(0)
    const [readOnly, setReadOnly] = useState(true)

    const onPointerMove = (value) => setRatingValue(value);

    const handleRating = () => {
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
        //initialValue={ratingValue}
        SVGstyle={{ display: 'inline-block' }}
        onPointerMove={onPointerMove}
        size={25}
      />
      <button onClick={handleOnClick}>
      <FaRegEdit />
      </button>
    </div>
  )   
}