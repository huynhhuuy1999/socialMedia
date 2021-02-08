const initState = {
  username: "",
  password: "",
  name: "",
  email: "",
  userId: "",
  avatar: "",
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        name: action.payload.name,
        email: action.payload.email,
        userId: action.payload.userId,
        avatar: action.payload.avatar,
      };
    case "EDITUSER":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      };
    case "EDITAVATAR":
      return {
        ...state,
        avatar: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        username: "",
        password: "",
        name: "",
        email: "",
        userId: "",
        avatar: "",
      };
    default:
      return state;
  }
};

export default userReducer;
