import React, { useEffect, useState, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  decrement,
  increment,
  //incrementByAmount,
  //incrementAsync,
  //incrementIfOdd,
  selectCount,
  nestedHandler,
  deleteItem,
  patchItemDeep,
  addItem,
  updateItem,
  updateState,
  selectNestedCount,
} from './counterSlice';

import styles from './Counter.module.css';

export function Counter() {
  const count = useAppSelector(selectCount);
  const nestedCount = useAppSelector(selectNestedCount);
  const dispatch = useAppDispatch();
  //const [incrementAmount, setIncrementAmount] = useState('2');

  const keyPathRef = useRef<any>(null);
  const [keyPath, setKeyPath] = useState<any>("");
  //const incrementValue = Number(incrementAmount) || 0;

  // const [baseState, setDatas] = useState([

  //   { 
  //     title: "Learn Typescript",
  //     done: true
  //   },
  //   {
  //     title: "Try immer",
  //     done: false,
  //     todosArray: [
  //       { id: "id1", done: false, body: "Take out the trash" },
  //       { id: "id2", done: false, body: "Check Email" },
  //     ]
  //   }
  
  // ])
  
  
  // updateState('address.mainStreet["12"].apartment.1A', (currentValue, draft, produce) => {
    
  // })
  
  useEffect(() => {
    //console.log("🚀 ~ file: Counter.tsx ~ line 28 ~ useEffect ~ keyPath", keyPath)
    //console.log("🚀 ~ file: Counter.tsx ~ line 29 ~ useEffect ~ count", count)
  }, [keyPath, count])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyPath(e.target.value)
  }
  //console.log("🚀 ~ file: Counter.tsx ~ line 35 ~ Counter ~ nestedCount", nestedCount)


  return (
    <div>
      <div className={styles.row}>
        <div>
        initialState:
          {JSON.stringify(nestedCount)}
          
        </div>
      </div>
      <div className={styles.row}>
        {/* <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button> */}
        {/* <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(nestedHandler([keyPath, {id: "id3", done: true, body: "Go to work"}, "add"]))}
        >
          {`[todosArray, {id: "id3", done: false, body: "Go to work"}, "add"]`}
        </button> */}

        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(nestedHandler([keyPath, {id: "id3", done: true, body: "Go to work"}, "add"]))}
        >
          {`NestedHandler`}
        </button>

        <button
          className={styles.button}
          aria-label="Delete"
          onClick={() => dispatch(deleteItem([keyPath, {"id":"id2","done":true,"body":"Take out the trash payload COunter"}, "delete"]))}
        >
          {`Del`}
        </button>

        <button
          className={styles.button}
          aria-label="Update Item"
          onClick={() => dispatch(updateItem([keyPath, {id: "id3", done: true, body: "Go to work"}, "delete"]))}
        >
          {`Update Item`}
        </button>

        <button
          className={styles.button}
          aria-label="Patch Item Deep"
          onClick={() => dispatch(patchItemDeep([keyPath, {id: "id3", done: true, body: "Go to work"}, "345","tomosArray[1]" ]))}
        >
          {`Patch item Deep`}
        </button>

        {/* <button
          className={styles.button}
          aria-label="Remove First Item"
          onClick={() => dispatch(patchItem([keyPath, {id: "id3", done: true, body: "Go to work"}, "delete"]))}
        >
          {`Remove First Item`}
        </button> */}


        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(nestedHandler([keyPath, {"id":"id2","done":true,"body":"Check Email"}, "update"]))}
        >
          nestedHandler to filter todos
        </button>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(updateState([keyPath, 'MichaelTwo']))}
        >
          testing updateState
        </button>
      </div>
      <div className={styles.row}>
        <form className={styles.input}>
          <input placeholder='key path' value={keyPath} ref={keyPathRef} onChange={handleInput}/>
        </form>
        
      </div>
      
    </div>
  );
}


// dispatch(updateState('todosArray, {id:done2: true}, "add"))

// todosArray['id1'] split(regex), const regex = /[.\[\]]