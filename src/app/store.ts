import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import secondReducer from '../features/counter/secondSlice';
import { sbtReducer, actions as sbtActions } from "../features/sbtReducer";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    second: secondReducer,
    sbt: sbtReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
