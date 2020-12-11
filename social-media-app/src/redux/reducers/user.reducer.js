const initState = {
    username:"",
    password:"",
    name: "",
    email:"",
    userId:""
}

const userReducer = (state= initState,action)=>{
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                username:action.payload.username,
                password:action.payload.password,
                name:action.payload.name,
                email: action.payload.email,
                userId: action.payload.userId
            };
        default:
            return state;
    }
}

export default userReducer;