import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { isDraft, produce, enableMapSet, castDraft, createDraft } from "immer";

enableMapSet();

export interface SecondState {
  id: string;
  value: number;
  todosArray: Array<any>;
}

const initialState: SecondState = {
  id: "345",
  value: 0,
  todosArray: [
    { id: "id1", done: true, body: "Take out the trash" },
    { id: "id2", done: false, body: "Check Email" },
    { id: "id3", done: false, body: "Check Coffee" },
  ],
};

export const secondSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    wrongHandler: (state: any, action: PayloadAction<any>) => {
      //   let splitKeyPath = Array.isArray(action.payload[0]) //action.payload[0] = keyPath
      //     ? action.payload[0]
      //     : action.payload[0].split("."); // ["a", "b", "c"]
      const reversedKeyPath = action.payload[0].split(".").reverse();
      //const keyPath = action.payload[0];
      console.log("first node on reversed key path", reversedKeyPath[0]);
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
            // const filtered = produce(state as SecondState & { endNodeOnKeyPath: any }, (draft: any) => {
            //   console.log(state.todosArray);
            //   console.log(draft);
            //   return draft
            // });
            //console.log(state.todosArray.filter, "isDraft direct access");
            //console.log(state["todosArray"]["filter"], "isDraft key access");
            // return (state["todosArray"] = {
            //   ...state["todosArray"][0],
            //   done: false,
            // });
            const proxyOfProxy = state;
            console.log("proxyOfProxy", proxyOfProxy[endNodeOnKeyPath]);
            const isADraft = isDraft(proxyOfProxy);
            console.log(isADraft);
            const filtered = proxyOfProxy[endNodeOnKeyPath].filter(
              (item: any) => item["id"] !== action.payload[1]["id"]
            );

            console.log("filtered", filtered, "initialState", initialState);
            
            const filteredDraft = createDraft(filtered);
            const isADraft2 = isDraft(filteredDraft);
            console.log(isADraft2);
            console.log("we hit the update path");
            arrayLogic = [...filtered, action.payload[1]];
            // arrayLogic = arrayLogic.todosArray;
            // arrayLogic = state.todosArray[1];
            break;
          case "add":
            arrayLogic = produce(state, (draft: any) => {
              draft.todosArray.push(action.payload[1]);
            });
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
            console.log(state.todosArray.filter, "isDraft direct access");
            console.log(state["todosArray"]["filter"], "isDraft key access");
            return (state["todosArray"] = {
              ...state["todosArray"][0],
              done: false,
            });

          //const filtered = state.todosArray.filter((item: any) => item['id'] !== action.payload[1]['id']);
          //console.log("filtered", filtered);

          //const isADraft = isDraft(state.todosArray);
          //console.log(isADraft);
          // console.log("we hit the update path");
          //return [ ...filtered, action.payload[1] ]
          //arrayLogic = arrayLogic.todosArray;
          //arrayLogic = state.todosArray[1];

          case "add":
            arrayLogic = produce(state, (draft: any) => {
              draft.todosArray.push(action.payload[1]);
            });
            break;
          default:
            break;
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

export const { wrongHandler, nestedArrayHandler } = secondSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.second.value;

export const selectNestedCount = (state: RootState) => state.second;

export default secondSlice.reducer;
