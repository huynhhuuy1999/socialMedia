export const login = (user)=>{
    return {
        type: "LOGIN",
        payload: user
    }
}
export const edituser = (user)=>{
    return  {
        type:"EDITUSER",
        payload:user
    }
}

export const editavatar = (avatar) =>{
    return {
        type:"EDITAVATAR",
        payload:avatar
    }
}

export const logout = ()=>{
    return {
        type:"LOGOUT"
    }
}