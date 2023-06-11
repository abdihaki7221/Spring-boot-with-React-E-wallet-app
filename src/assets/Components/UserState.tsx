import React, { useState } from 'react'
import Button from './Button';

function UserState() {
   const [count, setCount] = useState(0);
   function setHandler(){
    setCount(count + 1);
   }
    return (
        <button onClick={setHandler}> i have been clicked {count} times</button>
    );
  }

export default UserState
