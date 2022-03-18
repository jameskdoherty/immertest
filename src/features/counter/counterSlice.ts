import {
  bindActionCreators,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchCount } from "./counterAPI";
import React, { useCallback, useState } from "react";
import { original, isDraft, produce, current, produceWithPatches, enablePatches} from "immer";


import { enableMapSet } from "immer";
import { isPropertyName } from "typescript";
import { DRAFT_STATE, WritableDraft } from "immer/dist/internal";

enableMapSet();
enablePatches();

export interface CounterState {
  id: string;
  value: number;
  users: Array<any>
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
  id:"345",
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

      for (const propName of Object.keys(initialState)) {
        if (propName === action.payload[0]) {
          let itemToBeRemoved = action.payload[1];
          const newData = produce(state, (draft: any) => {
            console.log("🚀 ~ file: counterSlice.ts ~ line 93 ~ itemToBeRemoved", itemToBeRemoved)
            draft[propName].splice(draft[propName].findIndex((a: any) => a.id === itemToBeRemoved.id), 1);
          })
          return {...newData};
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
      //draft[propName].push('c');
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

     
      let splitt = Array.isArray(action.payload[0])
      console.log("🚀 ~ UpdateState: counterSlice.ts ~ line 106 ~ splitKeyPath", splitt)
      let splitKeyPath = Array.isArray(action.payload[0])
      ? action.payload[0]
      : action.payload[0].split("."); // ["a", "b", "c"]

        let splitUp = splitKeyPath
          .reverse()
          .reduce(


            (obj: object, next: string, i: number) => 
              
              console.log(obj)
              
              
            //   i !== action.payload[0].indexOf(action.payload[0][0])
            //     ? { [next]: obj }
            //     : {
            //         [next]:
            //           typeof action.payload[1] === "boolean" ||
            //           typeof action.payload[1] === "string" ||
            //           typeof action.payload[1] === "number"
            //             ? action.payload[1]
            //             : console.log("not a primitive")
            //       },
            // {}


          );
        return {...state, ...splitUp}
    },
    nestedHandlerOrig: (state, action: PayloadAction<any>) => {
      
      function arrayHandle() {
        let arrayLogic;
        switch (action.payload[2]) {
          case "update":
            arrayLogic = produce(state, (draft: any) => {
              console.log('UPDATE');
              console.log("🚀 ~ file: counterSlice.ts ~ line 216 ~ arrayLogic=produce ~ action.payload[0]", action.payload[0])
              console.log("🚀 ~ file: counterSlice.ts ~ line 215 ~ arrayLogic=produce ~ action.payload[1]", action.payload[1].id)


              //const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];
              
             
              //const getDraftName = getKeyValue<keyof CounterState, CounterState>("users")(state);
              //const copy = current(getDraftName);
              // console.log("🚀 ~ file: counterSlice.ts ~ line 217 ~ arrayLogic=produce ~ copy", copy)

              //draft.action.payload[0].id[0].done = action.payload[1].done;

              //update the id of the target
              draft[action.payload[0]][1].id = action.payload[1].id;

              //update the body
              //draft[action.payload[0]][1].body = action.payload[1].body;

               //update the body
              if (draft[action.payload[0]][1].body) {
                draft[action.payload[0]][1].body = action.payload[1].body;
              }

              for (const propName of Object.keys(initialState)) {
                if (propName === action.payload[0]) {
                console.log("🚀 ~ file: counterSlice.ts ~ line 228 ~ arrayLogic=produce ~ propName", propName)
                  
                }
              }
              
                //update the user name
              // if (draft.get("17")) {
              //     console.log('FOUND 17')
              //   }
             
              //const todo = draft.find((todosArray: any) => todosArray.id === action.payload[0].id)
              
              // if (todo) {
              //   console.log('todo is what')
              //   todo.done = false;
              // }
              //const currentDrafty = current(draft[action.payload[0]]);
              //console.log("🚀 ~ file: counterSlice.ts ~ line 214 ~ arrayLogic=produce ~ currentDrafty", currentDrafty)
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
        console.log(
          "🚀 ~ file: counterSlice.ts ~ line 152 ~ arrayHandle ~ arrayLogic",
          arrayLogic
        );

        let ArrayLogicDraft = isDraft(arrayLogic);
        console.log("🚀 ~ file: counterSlice.ts ~ line 230 ~ arrayHandle ~ ArrayLogicDraft", ArrayLogicDraft)
        // let currentArrayLogic = current(arrayLogic);
        // console.log("🚀 ~ file: counterSlice.ts ~ line 229 ~ arrayHandle ~ currentArrayLogic=====", currentArrayLogic);
        //console.log("🚀 ~ file: counterSlice.ts ~ line 215 ~ arrayHandle ~ ArrayLogicDraft", ArrayLogicDraft)

        // return produce(state, draft => {
        //   draft.todosArray.push(action.payload[1]);
        // })
        return arrayLogic;
      }
      
      
      
      // let splitKeyPath = Array.isArray(action.payload[0])
      // ? action.payload[0]
      // : action.payload[0].split("."); // ["a", "b", "c"]
      // console.log("🚀 ~ file: counterSlice.ts ~ line 269 ~ splitKeyPath", splitKeyPath)

      const newData = produce(state, (draft) => {
        let copyNew = current(draft);
        console.log("🚀 ~ file: counterSlice.ts ~ line 273 ~ newData ~ copyNew", copyNew);

        let finalResult = arrayHandle();
        return finalResult;


      });

      console.log("🚀 ~ file: counterSlice.ts ~ line 301 ~ newData ~ newData", newData)
      let newObj = { ...newData };
      console.log("🚀 ~ file: counterSlice.ts ~ line 193 ~ newObj", newObj)
      return newObj;

      // return produce(state, draft => {
      //   draft.todosArray.push(action.payload[1]);
      // });
    },
    nestedHandler: (state, action: PayloadAction<any>) => {

      // const [nextState, patches, inversePatches] = produceWithPatches(
      //   {
      //     age: 33
      //   },
      //   draft => {
      //     draft.age++
      //   }
      //   )
        
      //   console.log("🚀 ~ file: counterSlice.ts ~ line 299 ~ patches", patches)
      //   console.log("🚀 ~ file: counterSlice.ts ~ line 299 ~ nextState", nextState)
      //   console.log("🚀 ~ file: counterSlice.ts ~ line 299 ~ inversePatches", inversePatches)
      
   


     

      

      
      function arrayHandle() {
        let arrayLogic;
        console.log("🚀 ~ file: counterSlice.ts ~ line 324 ~ arrayHandle ~ action.payload[2]", action.payload[2])
        
        switch (action.payload[2]) {
          case "update":
            arrayLogic = produce(state, (draft: any) => {
              const todo = current(draft);
              console.log("🚀 ~ file: counterSlice.ts ~ line 330 ~ arrayLogic=produce ~ todo", todo)
              console.log('===== nestedHandler ==== ');
            
              for (const propName of Object.keys(initialState)) {
                if (propName === action.payload[0]) {
                  console.log("🚀 ~ file: counterSlice.ts ~ line 228 ~ arrayLogic=produce ~ propName", propName)
                  console.log("🚀 ~ file: counterSlice.ts ~ line 216 ~ arrayLogic=produce ~ action.payload[0]", action.payload[0])
                  console.log("🚀 ~ file: counterSlice.ts ~ line 215 ~ arrayLogic=produce ~ action.payload[1]", action.payload[1].id)

                  let splitKeyPath = Array.isArray(action.payload[0])
                  ? action.payload[0]
                  : action.payload[0].split(".");
                  
                  console.log("🚀 ~ file: counterSlice.ts ~ line 313 ~ arrayLogic=produce ~ splitKeyPath", splitKeyPath)
                  //update the id of the target
                  //draft[propName][1].id = action.payload[1].id;

                  let itemToBeActedUpon = splitKeyPath;

                  //draft[splitKeyPath].splice(draft[propName].findIndex((a: any) => a.id === itemToBeActedUpon.id), 1);


                


                  // const theFilter = draft.get("17");
                  // console.log("🚀 ~ file: counterSlice.ts ~ line 331 ~ arrayLogic=produce ~ theFilter", theFilter)

                  //update whole obj
                  //draft[propName] = action.payload[1];
              

                  //update the body
                  //draft[action.payload[0]][1].body = action.payload[1].body;

               //update the body
              // if (draft[action.payload[0]][1].body) {
              //   draft[action.payload[0]][1].body = action.payload[1].body;
              // }
                  
                }
              }
                
            });
            break;
          case "add":
            arrayLogic = produce(state, (draft: any) => {
              draft.todosArray.push(action.payload[1]);
            });
            break;
          case "specialbranch":

            let fork = initialState;
            let changes:any = [];
            let inverseChanges:any = [];
            
            fork = produce(
              fork,
              draft => {
                draft.tomosArray[0].done = true;
              },
              (patches, inversePatches) => {
                changes.push(...patches)
                inverseChanges.push(...inversePatches)
              }
              )
              
              console.log("🚀 ~ file: counterSlice.ts ~ line 379 ~ arrayHandle ~ fork", fork)
              console.log("🚀 ~ file: counterSlice.ts ~ line 391 ~ arrayHandle ~ changes", changes)
              console.log("🚀 ~ file: counterSlice.ts ~ line 383 ~ arrayHandle ~ inverseChanges", inverseChanges)
            
            
              break;
          default:
            break;
        }
        

        return arrayLogic;
      }
      
      const newData = produce(state, (draft) => {
        let finalResult = arrayHandle();
        return finalResult;
      });

      let newObj = { ...newData };
      console.log("🚀 ~ file: counterSlice.ts ~ line 193 ~ newObj", newObj)
      return newObj;

    },
    nestedHandlerWithSplit: (state, action: PayloadAction<any>) => {
    
      function arrayHandle(endNodeOnKeyPath: any) {
        console.log("🚀 ~ file: counterSlice.ts ~ line 299 ~ arrayHandle ~ endNodeOnKeyPath", endNodeOnKeyPath)
        let arrayLogic;
      
        switch (action.payload[2]) {
          case "update":
            arrayLogic = produce(state, (draft: any) => {
              console.log('nestedHandlerWithSplit');
              
              //update the id of the target
              draft[action.payload[0]][1].id = action.payload[1].id;

            });
              console.log("🚀 ~ file: counterSlice.ts ~ line 310 ~ arrayLogic=produce ~ arrayLogic", arrayLogic)
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

        let ArrayLogicDraft = isDraft(arrayLogic);
        console.log("🚀 ~ file: counterSlice.ts ~ line 230 ~ arrayHandle ~ ArrayLogicDraft", ArrayLogicDraft)
      
        return arrayLogic;
      }
      
      
      
      let splitKeyPath = Array.isArray(action.payload[0])
      ? action.payload[0]
      : action.payload[0].split("."); // ["a", "b", "c"]
      console.log("🚀 ~ file: counterSlice.ts ~ line 330 ~ splitKeyPath", splitKeyPath)

      console.log("🚀 ~ file: counterSlice.ts ~ line 337 ~ action.payload[0][0]", action.payload[0][0])

     
      console.log("🚀 ~ file: counterSlice.ts ~ line 339 ~ action.payload[0].indexOf(action.payload[0][0])", action.payload[0].indexOf(action.payload[0][0]))
      
      let splitUp = splitKeyPath
        .reverse()
        .reduce(
          (obj: object, next: string, i: number) => 
          
          
          i !== action.payload[0].indexOf(action.payload[0][0]) ? { [next]: obj } : {
            [next]:
                      typeof action.payload[1] === "boolean" ||
                      typeof action.payload[1] === "string" ||
                      typeof action.payload[1] === "number"
                      ? action.payload[1]
                      : arrayHandle(action.payload[0][0]), // needs non primitive for action.payload[1],
                    },
                    {},
                    
                    );
                    console.log("🚀 ~ file: counterSlice.ts ~ line 292 ~ newData ~ splitUp", splitUp)
      return { ...state, ...splitUp };
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
  nestedHandlerOrig,
  nestedHandlerWithSplit,
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
