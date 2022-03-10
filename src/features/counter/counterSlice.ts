import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchCount } from "./counterAPI";
import React, { useCallback, useState } from "react";
import produce from "immer";
import { enableMapSet } from "immer";

enableMapSet();







const otherTodosArray = {
  users: new Map([
    [
      "17",
      { 
        name: "Michel",
        todos: [
          {
            title: "Get coffee",
            done: false,
            id: "id3",
            body: "Take out the trash"

          }
        ]
      }
    ]
  ])
}







export interface CounterState {
  value: number;
  //status: 'idle' | 'loading' | 'failed';
  //ArticleOneProps: object;
  todosArray: any;
  aaa: object;
}

const initialState: CounterState = {
  value: 0,
  todosArray: [
    { id: "id1", done: false, body: "Take out the trash" },
    { id: "id2", done: false, body: "Check Email" },
  ],
  aaa: {
    bbb: {
      ccc: 10
    }
  }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
    console.log("🚀 ~ file: counterSlice.ts ~ line 98 ~ state", state.value)
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    updateState: (state, action: PayloadAction<any>) => {
      let splitKeyPath = Array.isArray(action.payload[0])
      ? action.payload[0]
      : action.payload[0].split("."); // ["a", "b", "c"]

        let splitUp = splitKeyPath
          .reverse()
          .reduce(
            (obj: object, next: string, i: number) =>
              i !== action.payload[0].indexOf(action.payload[0][0])
                ? { [next]: obj }
                : {
                    [next]:
                      typeof action.payload[1] === "boolean" ||
                      typeof action.payload[1] === "string" ||
                      typeof action.payload[1] === "number"
                        ? action.payload[1]
                        : console.log("not a primitive")
                  },
            {}
          );
        return {...state, ...splitUp}
    },
    nestedHandler: (state, action: PayloadAction<any>) => {
    
      // let splitKeyPath = Array.isArray(JSON.parse(action.payload[0]))
      // ? JSON.parse(action.payload[0])
      // : action.payload[0].split(".");

      // const nextState = produce(initialState, draftState => {
      //   draftState.todosArray.push({ title: 'resolvedz', done: true })
      //  // draftState[1].done = action.payload[1];
      // });

      // const nextTodo = produce(otherTodosArray, draft  => {
      //   draft.users.get("17").todos[0].done = action.payload[1];
      // })
      
      function arrayHandle() {
        let arrayLogic;
        
        
        switch (action.payload[2]) {
          case "update":
            arrayLogic = produce(state, (draft: any) => {
              draft.todosArray[1].done = action.payload[1];
            });
            break;
          case "add":
            arrayLogic = produce(state, (draft: any) => {
              draft.todosArray.push(action.payload[1]);
            });
            break;
          default:
            break;
        }
        console.log("🚀 ~ file: counterSlice.ts ~ line 152 ~ arrayHandle ~ arrayLogic", arrayLogic)

        // return produce(state, draft => {
        //   draft.todosArray.push(action.payload[1]);
        // })
        return arrayLogic;
      }

      // function objectHandle() {
      //   let objectLogic as ;
      //   switch (action.payload[2]) {
      //     case "add":
      //       objectLogic = produce(state, (draft: any) => {
      //         console.log(state)
      //         console.log(action.payload[1])
      //         draft[action.payload[0]] = action.payload[1]
      //       });
      //       break;
      //     default:
      //       break;
      //   }
      //   console.log(objectLogic.)
      //   return objectLogic;
      // }

      let splitKeyPath = Array.isArray(action.payload[0])
      ? action.payload[0]
      : action.payload[0].split("."); // ["a", "b", "c"]
      console.log("🚀 ~ file: counterSlice.ts ~ line 158 ~ payload", action.payload)
      
      console.log("🚀 ~ file: counterSlice.ts ~ line 156 ~ action.payload[2]", action.payload[2]);
      console.log("🚀 ~ file: counterSlice.ts ~ line 159 ~ splitKeyPath", splitKeyPath);
      // const newData = produce(state, (draft) => {
      //   let splitUp = splitKeyPath
      //     .reverse()
      //     .reduce(
      //       (obj: object, next: string, i: number) =>
      //         i !== action.payload[0].indexOf(action.payload[0][0])
      //           ? { [next]: obj }
      //           : {
      //               [next]:
      //                 typeof action.payload[1] === "boolean" ||
      //                 typeof action.payload[1] === "string" ||
      //                 typeof action.payload[1] === "number"
      //                   ? action.payload[1]
      //                   : arrayHandle(), // this check is wrong, need to see if state key is an array (or object)
      //             },
      //       {}
      //     );
      //   return (draft = splitUp);
      // });
      // let newObj = { ...newData };
      // console.log("🚀 ~ file: counterSlice.ts ~ line 194 ~ newObj", newObj)
      // return newObj;

      



      return produce(state, draft => {
        draft.todosArray.push(action.payload[1]);
      });
    },
    arrayHandler: (state, action: PayloadAction<any>) => {
    console.log("🚀 ~ file: counterSlice.ts ~ line 192 ~ action", action)
      let arrayLogic;
      switch (action.payload[2]) {
        case "update":
          arrayLogic = produce(state, (draft: any) => {
            draft.todosArray[1].done = action.payload[1];
          });
          break;
        case "add":
          arrayLogic = produce(state, (draft: any) => {
            draft.todosArray.push(action.payload[1]);
          });
          break;
        default:
          break;
      }
      return arrayLogic;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        //state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        //state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  nestedHandler,
  arrayHandler,
  updateState
} = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;

export const selectNestedCount = (state: RootState) => state.counter;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export default counterSlice.reducer;
