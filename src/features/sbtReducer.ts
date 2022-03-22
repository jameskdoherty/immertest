import { produce } from "immer";
import {render} from "@testing-library/react";

const initialState = {
  todosArray: [
    { id: "id1", done: true, body: "Take out the garbage" },
    { id: "id2", done: false, body: "Do Homework" },
    { id: "id3", done: false, body: "Check Coffee" },
  ]
}

export const UPDATE_SBT_STATE = 'UPDATE_SBT_STATE';

export function sbtReducer(state:any = initialState, action:any) {
    switch(action.type) {
        case UPDATE_SBT_STATE: {
            return action.payload;
        }
        default:
            return state;
    }
}

export const actions = {UPDATE_SBT_STATE}

export function createUpdateSbtStateAction(
    payload: any,
): any {
    return {
        type: 'UPDATE_SBT_STATE',
        payload,
    };
}