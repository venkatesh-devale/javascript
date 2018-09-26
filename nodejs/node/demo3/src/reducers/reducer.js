const initialState = {
    token : null,
    login_data : null,
    login_success : null,
    signup_success: null,
    error : null
}

const reducer = (state = initialState, action) => {
    if(action.type === 'SIGNUP_SUCCESS'){

        return{
            ...state,
            token: 'new token value',
            signup_success : action.payload.data
        }
        
    }

    if(action.type === 'LOGIN_SUCCESS'){
        return{
            ...state,
            token: 'new token value',
            login_success: 'LOGIN_SUCCESS',
            login_data : action.payload.data[0]
        }
        
    }

    
    if(action.type === 'ERROR'){
        return{
            ...state,
            error : 'ERROR'
        }
    }

    

    return state;
}

export default reducer;