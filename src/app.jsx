import React, { useEffect } from 'react';
import { useConnector, proxiedObj } from './store/index';
export default function App() {

  const age = useConnector(state => state.age);
  const name = useConnector(state => state.name);

  
  return (
    <div> 
      Hello, {name} webpack react.
      <div>
        <span>{age}</span>
        <button onClick={() => {
          proxiedObj.age++;
        }}>add</button>
      </div>
    </div>
  )
}
