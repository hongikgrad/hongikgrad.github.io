const TOGGLE_MENU = "menu/TOGGLE" as const;
const CLOSE_MENU = "menu/CLOSE" as const;

export const ToggleMenu = () => ({
  type: TOGGLE_MENU,
});

export const setMenuClose = () => ({
  type: CLOSE_MENU,
});

type MenuState = {
  open: boolean;
};

const initialState: MenuState = {
  open: false,
};

type MenuAction =
  | ReturnType<typeof ToggleMenu>
  | ReturnType<typeof setMenuClose>;

function menu(state: MenuState = initialState, action: MenuAction) {
  switch (action.type) {
    case TOGGLE_MENU:
      return { open: !state.open };
    case CLOSE_MENU:
      return { open: false };
    default:
      return state;
  }
}

export default menu;
