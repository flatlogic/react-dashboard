import { TOGGLE_SIDEBAR, OPEN_SIDEBAR, CLOSE_SIDEBAR } from '../constants';

const initialState = {
  sidebarOpened: false,
  sidebarStatic: false,
};

export default function runtime(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpened: !state.sidebarOpened,
      };
    case OPEN_SIDEBAR:
      return {
        ...state,
        sidebarOpened: true,
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        sidebarOpened: false,
      };
    default:
      return state;
  }
}
