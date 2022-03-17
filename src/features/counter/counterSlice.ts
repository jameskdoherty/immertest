import {
  bindActionCreators,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchCount } from "./counterAPI";
import React, { useCallback, useState } from "react";
import { original, isDraft, produce, current } from "immer";

import { enableMapSet } from "immer";
import { isPropertyName } from "typescript";
import { DRAFT_STATE, WritableDraft } from "immer/dist/internal";

enableMapSet();

export interface CounterState {
  id: string;
  value: number;
  //status: 'idle' | 'loading' | 'failed';
  //ArticleOneProps: object;
  todosArray: Array<any>;
  // tomosArray: Array<any>;
  // aaa: object;
  // users: any[];

}

type State = {
  value: number;
};

const initialState: CounterState = {
  id: "345",
  value: 0,
  todosArray: [
    { id: "id1", done: true, body: "Take out the trash" },
    { id: "id2", done: false, body: "Check Email" },
    { id: "id3", done: false, body: "Check Coffee" },
   ],
  // tomosArray: [
  //   { id: "id1", done: false, body: "Take out the trashed" },
  //   { id: "id2", done: false, body: "Check EmailZZZZ" },
  // ],
  // aaa: {
  //   bbb: {
  //     ccc: 10,
  //     done: false,
  //   },
  // },
  // users: [
  //   "17",
  //   {
  //     name: "Michael",
  //     todos: [
  //       {
  //         title: "Get Coffee",
  //         done: false,
  //       },
  //     ],
  //   },
  // ],
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
      console.log("🚀 ~ file: counterSlice.ts ~ line 98 ~ state", state.value);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },

    deleteItem: (state, action: PayloadAction<any>) => {
      //state.filter

      console.log("🚀 ~ file: counterSlice.ts ~ line 93 ~ action", action);
      for (const propName of Object.keys(initialState)) {
        if (propName === action.payload[0]) {
          console.log(
            "🚀 ~ file: counterSlice.ts ~ line 108 ~ FOUND propName",
            propName
          );
          let itemToBeRemoved = action.payload[1];

          const newData = produce(state, (draft: any) => {
            console.log(
              "🚀 ~ file: counterSlice.ts ~ line 93 ~ itemToBeRemoved",
              itemToBeRemoved
            );
            //draft[propName].push('c');

            //const targetNode = draft.find((propName:any) => propName.id === action.payload)
            //console.log("🚀 ~ file: littleSlice.ts ~ line 48 ~ newData ~ targetNode", targetNode)

            draft[propName].splice(
              draft[propName].findIndex(
                (a: any) => a.id === itemToBeRemoved.id
              ),
              1
            );
          });
          return { ...newData };
        }
      }
    },

    updateItem: (initialState, action: PayloadAction<any>) => {
      for (const propName of Object.keys(initialState)) {
        if (propName === action.payload[0]) {
          console.log(
            "🚀 ~ file: counterSlice.ts ~ line 108 ~ FOUND propName",
            propName
          );
          const newData = produce(initialState, (draft: any) => {
            draft[action.payload[0]] = action.payload[1];
          });
          return { ...newData };
        }
      }
    },

    patchItemDeep: (store, action: PayloadAction<any>) => {
      console.log("🚀 ~ file: littleSlice.ts ~ line 40 ~ action", action);

      let targetItem = action.payload[0];
      let getItem = action.payload[2];
      let thingToChange = action.payload[3];

      const newData = produce(store, (draft: any) => {
        //draft.todosArray.get(getItem).thingToChange.done = true;
        const targetNode = draft.users.get("17");
        console.log(
          "🚀 ~ file: littleSlice.ts ~ line 48 ~ newData ~ targetNode",
          targetNode
        );
      });
      return { ...newData };
      //state.todosArray.splice(0,1,'')
    },

    addItem: (initialState, action: PayloadAction<any>) => {
      for (const propName of Object.keys(initialState)) {
        if (propName === action.payload[0]) {
          console.log(
            "🚀 ~ file: counterSlice.ts ~ line 108 ~ FOUND propName",
            propName
          );
          const newData = produce(initialState, (draft: any) => {
            draft[action.payload[0]] = action.payload[1];
          });
          return { ...newData };
        }
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    updateState: (state, action: PayloadAction<any>) => {
      let splitt = Array.isArray(action.payload[0]);
      console.log(
        "🚀 ~ UpdateState: counterSlice.ts ~ line 106 ~ splitKeyPath",
        splitt
      );
      let splitKeyPath = Array.isArray(action.payload[0])
        ? action.payload[0]
        : action.payload[0].split("."); // ["a", "b", "c"]
      console.log(
        "🚀 ~ UpdateState: counterSlice.ts ~ line 190 ~ splitKeyPath",
        splitKeyPath
      );

      let splitUp = splitKeyPath.reverse().reduce(
        (obj: object, next: string, i: number) =>
          i !== action.payload[0].indexOf(action.payload[0][0])
            ? { [next]: obj }
            : {
                [next]:
                  typeof action.payload[1] === "boolean" ||
                  typeof action.payload[1] === "string" ||
                  typeof action.payload[1] === "number"
                    ? action.payload[1]
                    : console.log("not a primitive"),
              },
        {}
      );
      console.log(
        "🚀 ~ UpdateState: counterSlice.ts ~ line 209 ~ splitUp",
        splitUp
      );

      return { ...state, ...splitUp };
    },
    nestedHandler: (state, action: PayloadAction<any>) => {
      // let splitKeyPath = Array.isArray(JSON.parse(action.payload[0]))
      // ? JSON.parse(action.payload[0])
      // : action.payload[0].split(".");

      function arrayHandle(endNodeOnKeyPath: any) {
        let arrayLogic;
        switch (action.payload[2]) {
          case "update":
            // const filtered = produce(state as CounterState & { endNodeOnKeyPath: any }, (draft: any) => {
            //   console.log(state.todosArray);
            //   console.log(draft);
            //   return )
            // });
            console.log(state.todosArray.filter, 'isDraft direct access')
            console.log(state['todosArray']['filter'], 'isDraft key access')
            return state['todosArray'] = {...state['todosArray'][0], done: false};
          


            //const filtered = state.todosArray.filter((item: any) => item['id'] !== action.payload[1]['id']);
            //console.log("filtered", filtered);


            //const isADraft = isDraft(state.todosArray);
            //console.log(isADraft);
            // console.log("we hit the update path");
            //return [ ...filtered, action.payload[1] ]
            //arrayLogic = arrayLogic.todosArray;
            //arrayLogic = state.todosArray[1];
            break;
          case "add":
            arrayLogic = produce(state, (draft: any) => {
              draft.todosArray.push(action.payload[1]);
            });
            break;
          default:
            break;
        }
        console.log(
          "🚀 ~ file: counterSlice.ts ~ line 152 ~ arrayHandle ~ arrayLogic",
          arrayLogic
        );

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

      let splitKeyPath = Array.isArray(action.payload[0]) //action.payload[0] = keyPath
        ? action.payload[0]
        : action.payload[0].split("."); // ["a", "b", "c"]
      let splitUp = splitKeyPath.reverse().reduce(
        (obj: object, next: string, i: number) =>
          i !== action.payload[0].indexOf(action.payload[0][0])
            ? { [next]: obj }
            : {
                [next]:
                  typeof action.payload[1] === "boolean" ||
                  typeof action.payload[1] === "string" ||
                  typeof action.payload[1] === "number"
                    ? action.payload[1]
                    : arrayHandle(action.payload[0][0]), // needs non primitive for action.payload[1]
              },
        {},
        console.log("action", action.payload[1])
      );

      return { ...state, ...splitUp };

      // return produce(state, draft => {
      //   draft.todosArray.push(action.payload[1]);
      // });
    },
    arrayHandler: (state, action: PayloadAction<any>) => {
      console.log("🚀 ~ file: counterSlice.ts ~ line 192 ~ action", action);
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
  updateState,
  deleteItem,
  updateItem,
  addItem,
  patchItemDeep,
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
