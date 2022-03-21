import React, { useEffect, useState, useRef } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  workingHandler,
  selectCount,
  selectNestedCount,
} from "./secondSlice";

import styles from "./Counter.module.css";

export function Second() {
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
  }, [keyPath, count]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyPath(e.target.value);
  };
  //console.log("🚀 ~ file: Counter.tsx ~ line 35 ~ Counter ~ nestedCount", nestedCount)

  return (
    <div>
      <div className={styles.row}>
        <div>
          initialState:
          {
            <div>
              <pre>{JSON.stringify(nestedCount, null, 10)}</pre>
            </div>
          }
        </div>
      </div>
      <div className={styles.row}>
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
