const initialState = {
    token : null,
    login_data : null,
    signup_success: null,
    userprofileupdate_success: null,
    error : null,
    projectInserted: null,
    employerNameClicked: null
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
            login_data : action.payload.data[0]
        }
        
    }

    if(action.type === 'UPDATE_PROFILE_SUCCESS') {
        return {
            ...state,
            token: 'new token value',
            userprofileupdate_success : action.payload.data
        }
    }
    
    if(action.type === 'PROJECT_INSERTED_SUCCESS') {
        return {
            ...state,
            token: 'new token value',
            projectInserted : action.payload.data
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