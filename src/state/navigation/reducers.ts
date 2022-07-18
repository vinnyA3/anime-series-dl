import { AnyAction as Action } from "redux";

import actionTypes from "./actions";

interface NavigationState {
  currentScreen: string | null;
  previousScreen: string | null;
  registeredScreens: Record<string, unknown>;
  stack: Screen[];
}

const initialState: NavigationState = {
  currentScreen: null,
  previousScreen: null,
  registeredScreens: {},
  stack: [],
};

const navigationReducer = (
  state = initialState,
  action: Action
): NavigationState => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.REGISTER_SCREENS: {
      return {
        ...state,
        registeredScreens: { ...state.registeredScreens, ...payload },
      };
    }
    case actionTypes.PUSH_SCREEN: {
      const screenToInit = state.registeredScreens[action.screen];
      // @ts-ignore
      const initializedScreen = new screenToInit(action?.params);

      return {
        ...state,
        stack: [...state.stack, initializedScreen],
      };
    }

    default:
      return state;
  }
};

export default navigationReducer;
