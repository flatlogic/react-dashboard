/* eslint-disable import/prefer-default-export */

import { TOGGLE_SIDEBAR, OPEN_SIDEBAR, CLOSE_SIDEBAR } from '../constants';

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  };
}

export function openSidebar() {
  return {
    type: OPEN_SIDEBAR,
  };
}

export function closeSidebar() {
  return {
    type: CLOSE_SIDEBAR,
  };
}
