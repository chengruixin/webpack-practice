import React, { useEffect, useState } from 'react';
import { createStore, combineAllReducers } from './store/index';

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

const reducer1 = ({ action, payload }) => {
  switch(action) {
  case 'PLUS':
    return state => state.age += payload || 1
  default:
    return null
  }
}

const reducer2 = ({ action, payload }) => {
  switch(action) {
  case 'SET_NAME':
    return state => state.name = payload
  default:
    return null
  }
}

const { useConnector, dispatch } = createStore(obj, combineAllReducers(reducer1, reducer2));
export default function App() {
  const age = useConnector(state => state.age);
  const name = useConnector(state => state.name);
  return (
    <div> 
      Hello, {name} webpack react.
      <div>
        <span>{age}</span>
        <button onClick={() => {
          dispatch({ action: "PLUS"});
        }}>add</button>
      </div>

      <div>
        <input value={name} onInput={e => {
          dispatch({ action: "SET_NAME", payload: e.target.value});
        }}/>
      </div>
    </div>
  )
}
