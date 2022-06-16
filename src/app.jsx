import React, { useEffect, useState } from 'react';
import { createStore } from './store/index';

const obj = {
  name: 'ruixin',
  age: 24,
  detail: {
    info1: 'info1',
    info2: 'info2',
    deeperDetail: {
      deeperInfo1: '1',
      deeperInfo2: '2'
    },
    list: [1, 2, 3, 4]
  }
}

const { useConnector, proxied } = createStore(obj);
export default function App() {
  console.log('start')
  const age = useConnector(state => state.age);
  const name = useConnector(state => state.name);
  // const [val, setVal] = useState(1);
  return (
    <div> 
      Hello, {name} webpack react.
      <div>
        <span>{age}</span>
        <button onClick={() => {
          proxied.age++;
          // proxied.name += ' , '
        }}>add</button>
      </div>

      <div>
        <input value={name} onInput={e => {
          proxied.name = e.target.value;
        }}/>
      </div>
    </div>
  )
}
