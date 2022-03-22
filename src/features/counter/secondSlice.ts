import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  isDraft,
  enableMapSet,
  original,
  createDraft,
  current,
} from "immer";

enableMapSet();

export interface SecondState {
  id: string;
  value: number;
  todosArray: any;
  //a: object;
  sbt2: any;
}

const initialState: SecondState = {
  id: "345",
  value: 0,

  todosArray: [
    { id: "id1", done: true, body: "Take out the trash" },
    { id: "id2", done: false, body: "Do Homework" },
    { id: "id3", done: false, body: "Check Coffee" },
  ],
//   a: {
//       b: {
//           tomosArray: [
//             { id: "id4", done: true, body: "Brush Teethh" },
//             { id: "id5", done: false, body: "Do Homework" },
//             { id: "id6", done: false, body: "Read Book" },
//           ]
//       }
//   }

  sbt2: [
    { id: "id1", done: true, body: "Take out the trash" },
    { id: "id2", done: false, body: "Do Homework" },
    { id: "id3", done: false, body: "Check Coffee" }
  ]
};

export const secondSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateSbtState: (state: any, action: PayloadAction<(draft: any) => void>) => {
      console.log(isDraft(current(state)), '<==isDraft');
      action.payload(state);

      //return state;
    },
    workingHandler: (state: any, action: PayloadAction<any>) => {
      //   let splitKeyPath = Array.isArray(action.payload[0]) //action.payload[0] = keyPath
      //     ? action.payload[0]
      //     : action.payload[0].split("."); // ["a", "b", "c"]
      const reversedKeyPath = action.payload[0].includes(".")
        ? action.payload[0].split(".").reverse()
        : [action.payload[0]];

      //const keyPath = action.payload[0];
      //console.log("first node on reversed key path", reversedKeyPath[0]);
      let splitUp = reversedKeyPath.reduce(
        (obj: object, next: string, i: number) =>
          i !== reversedKeyPath.indexOf(reversedKeyPath[0])
            ? { [next]: obj }
            : {
                [next]:
                  typeof action.payload[1] === "boolean" ||
                  typeof action.payload[1] === "string" ||
                  typeof action.payload[1] === "number"
                    ? action.payload[1]
                    : arrayHandle(reversedKeyPath[0]), // needs non primitive for action.payload[1]
              },
        {}
      );

      function arrayHandle(endNodeOnKeyPath: any) {
        let arrayLogic;
        console.log("hit array handle", endNodeOnKeyPath);
        switch (action.payload[2]) {
          case "update":
            console.log("is our initial state a draft in this reducer?", isDraft(state));
            
            const filtered = createDraft(
              state[endNodeOnKeyPath].filter(
                (item: any) => item["id"] !== action.payload[1]["id"]
              )
            );
            console.log("did we create a filtered draft?", isDraft(filtered));
            console.log("we hit the update path");
            arrayLogic = [...original(filtered), action.payload[1]];
            break;
          case "updateSetPath":
            // traverse down previously set path and set action.payload 1
            console.log('hit update set path')
            const traversePath = action.payload[0].split('.');
            let nonPrimitive = state;
            let draftNonPrimitive;
            for (let i = 0; i < traversePath.length; i++) {
                nonPrimitive = nonPrimitive[traversePath[i]]
                console.log("does state persist as a draft?", isDraft(nonPrimitive));
                if (i === traversePath.length - 1) {
                    nonPrimitive = nonPrimitive.filter((item: any) => item['id'] !== action.payload[1]['id'])
                    draftNonPrimitive = createDraft(nonPrimitive)
                    console.log("is the filtered on the last loop a draft?", isDraft(draftNonPrimitive))
                }
            }
            arrayLogic = [...original(draftNonPrimitive), action.payload[1]];
            break;
          default:
            break;
        }
        console.log("arrayLogic", arrayLogic, "initalState", initialState);

        // return produce(state, draft => {
        //   draft.todosArray.push(action.payload[1]);
        // })
        return arrayLogic;
      }

      return { ...state, ...splitUp };

      // return produce(state, draft => {
      //   draft.todosArray.push(action.payload[1]);
      // });
    },

    nestedArrayHandler: (state, action: PayloadAction<any>) => {
      // let splitKeyPath = Array.isArray(JSON.parse(action.payload[0]))
      // ? JSON.parse(action.payload[0])
      // : action.payload[0].split(".");

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

      function arrayHandle(endNodeOnKeyPath: any) {
        let arrayLogic;
        switch (action.payload[2]) {
          case "update":
          // const filtered = produce(state as CounterState & { endNodeOnKeyPath: any }, (draft: any) => {
          //   console.log(state.todosArray);
          //   console.log(draft);
          //   return )
          // });
          // console.log(state.todosArray.filter, "isDraft direct access");
          // console.log(state["todosArray"]["filter"], "isDraft key access");
          // return (state["todosArray"] = {
          //   ...state["todosArray"][0],
          //   done: false,
          // });

          //const filtered = state.todosArray.filter((item: any) => item['id'] !== action.payload[1]['id']);
          //console.log("filtered", filtered);

          //const isADraft = isDraft(state.todosArray);
          //console.log(isADraft);
          // console.log("we hit the update path");
          //return [ ...filtered, action.payload[1] ]
          //arrayLogic = arrayLogic.todosArray;
          //arrayLogic = state.todosArray[1];

        //   case "add":
        //     arrayLogic = produce(state, (draft: any) => {
        //       draft.todosArray.push(action.payload[1]);
        //     });
        //     break;
        //   default:
        //     break;
        }
        console.log(
          "🚀 ~ file: secondSlice.ts ~ line 152 ~ arrayHandle ~ arrayLogic",
          arrayLogic
        );

        // return produce(state, draft => {
        //   draft.todosArray.push(action.payload[1]);
        // })
        return arrayLogic;
      }

      return { ...state, ...splitUp };

      // return produce(state, draft => {
      //   draft.todosArray.push(action.payload[1]);
      // });
    },
  },
});

export const { workingHandler, nestedArrayHandler, updateSbtState } = secondSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.second.value;

export const selectNestedCount = (state: RootState) => state.second;

export default secondSlice.reducer;
