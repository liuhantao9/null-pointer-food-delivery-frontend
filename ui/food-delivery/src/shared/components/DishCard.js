import React, { useState } from 'react'
import { Image, InputGroup, FormControl, Button } from 'react-bootstrap'

export default function DishCard({ dishDetail, handleNumberChange }) {

  const [number, setNumber] = useState(0)

  const handleAdd = () => {
    handleNumberChange( dishDetail.name, dishDetail.number + 1 );
  }

  const handleMinus = () => {
    if (dishDetail.number > 0) {
      handleNumberChange( dishDetail.name, dishDetail.number - 1);
    }
  }

  return (
    <div>
      <Image src={dishDetail.imageUrl} fluid style={{ width: "240px", height: "240px" }}/>
      <p>{dishDetail.name}</p>
      <p style={{color: 'red'}} >{`$${dishDetail.price}`}</p>
      <InputGroup>
        <FormControl
          readOnly
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={dishDetail.number}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleAdd}>+</Button>
          <Button variant="outline-secondary" onClick={handleMinus}>-</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}
