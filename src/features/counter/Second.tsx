import React, { useEffect, useState, useRef, useReducer } from "react";
import delve from 'dlv'; 
import { useAppSelector } from "../../app/hooks";

import { selectCount, selectNestedCount } from "./secondSlice";

import styles from "./Counter.module.css";

import { produce } from "immer";

export interface ThirdState {
  id: string;
  value: number;
  todosArray: any;
  a: object;
}

export function Second() {
  const count = useAppSelector(selectCount);
  const nestedCount = useAppSelector(selectNestedCount);
  //const dispatch = useAppDispatch();

  //const [incrementAmount, setIncrementAmount] = useState('2');

  const keyPathRef = useRef<any>(null);
  const [keyPath, setKeyPath] = useState<any>("");
  //const incrementValue = Number(incrementAmount) || 0;

  const initialState: ThirdState = {
    id: "345",
    value: 0,
    todosArray: [
      { id: "id1", done: true, body: "Take out the garbage" },
      { id: "id2", done: false, body: "Do Homework" },
      { id: "id3", done: false, body: "Check Coffee" },
    ],
    a: {
      b: {
        tomosArray: [
          { id: "id4", done: true, body: "Brush Teethh" },
          { id: "id5", done: false, body: "Do Homework" },
          { id: "id6", done: false, body: "Read Book" },
        ],
      },
    },
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "push":
        const pushData = produce(state, (draft: any) => {
            let nestedNodes = delve(draft, action.path);
            console.log(JSON.stringify(nestedNodes)); 
            nestedNodes.push(action.payload);
        })
        return pushData;
      case "pop":
        const popData = produce(state, (draft: any) => {
            let nestedNodes = delve(draft, action.path);
            console.log(JSON.stringify(nestedNodes)); 
            nestedNodes.pop();
        })
        return popData;
      default:
        console.error(`Unhandled action type ${action.type}`);
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyPath(e.target.value);
  };

  return (
    <div>
      <div className={styles.row}>
        <div>
          initialState:
          {
            <div>
              <pre>{JSON.stringify(state, null, 10)}</pre>
            </div>
          }
        </div>
      </div>
      <div className={styles.row}>
        <button
          onClick={() =>
            dispatch({
              type: "push",
              payload: { id: "id7", done: false, body: "Get Car Cleaned" },
              path: keyPath,
            })
          }
          // should change the body to whatever has been put into textbox
          // make update state function that dispatches and its action.payload accepts function
          //
        >
          traverse and push
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "pop",
              path: keyPath,
            })
          }
          // should change the body to whatever has been put into textbox
          // make update state function that dispatches and its action.payload accepts function
          //
        >
          traverse and pop
        </button>
        {/* <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() =>
            dispatch(
              workingHandler([
                keyPath,
                {
                  id: "id3",
                  done: true,
                  body: "Coffee consumed",
                },
                "update",
              ])
            )
          }
        >
          Update non-nested non primitive
        </button>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() =>
            dispatch(
              workingHandler([
                keyPath,
                {
                  id: "id2",
                  done: false,
                  body: "homework isn't done, but lets pretend it is",
                },
                "update",
              ])
            )
          }
        >
          Setting nested path, borrowing a non prim in our state
        </button>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() =>
            dispatch(
              workingHandler([
                keyPath,
                { id: "id2", done: true, body: "Homework is FINITO!!!" },
                "updateSetPath",
              ])
            )
          }
        >
          Update set path
        </button> */}
      </div>
      <div className={styles.row}>
        <form className={styles.input}>
          <input
            placeholder="key path"
            value={keyPath}
            ref={keyPathRef}
            onChange={handleInput}
          />
        </form>
      </div>
    </div>
  );
}
