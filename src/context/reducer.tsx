export const initialState = {
  user: null,
  token: null,
};

const reducer = (state, action): any => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    default:
      return state;
  }
};

export default reducer;
