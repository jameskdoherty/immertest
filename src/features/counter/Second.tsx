import React, { useEffect, useState, useRef } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { workingHandler, selectCount, selectNestedCount } from "./secondSlice";

import styles from "./Counter.module.css";

import { produce } from "immer";

export interface ThirdState {
  id: string;
  value: number;
  todosArray: any;
}

export function Second() {
  const count = useAppSelector(selectCount);
  const nestedCount = useAppSelector(selectNestedCount);
  const dispatch = useAppDispatch();
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
  };

  useEffect(() => {
    //console.log("🚀 ~ file: Counter.tsx ~ line 28 ~ useEffect ~ keyPath", keyPath)
    //console.log("🚀 ~ file: Counter.tsx ~ line 29 ~ useEffect ~ count", count)
  }, [keyPath, count]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyPath(e.target.value);
  };
  //console.log("🚀 ~ file: Counter.tsx ~ line 35 ~ Counter ~ nestedCount", nestedCount)

  const updateState = (payload: any) => {
    const newData = produce(initialState, draft => { 
      console.log(payload);
      draft.todosArray.push(payload);
  });
    console.log(initialState);
  };

  return (
    <div>
      <div className={styles.row}>
        <div>
          initialState:
          {
            <div>
              <pre>{JSON.stringify(initialState, null, 10)}</pre>
            </div>
          }
        </div>
      </div>
      <div className={styles.row}>
      <button
          onClick={() => updateState({ id: "id4", done: false, body: "Get Car Washed" })}
          // should change the body to whatever has been put into textbox
          // make update state function that dispatches and its action.payload accepts function
          //
        >
            immer import direct
        </button>
        <button
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
        </button>
        
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
