import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', 
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state ) => {
            state.status = 'checking';
            state.user   = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            // console.log({payload})
            state.status  = 'authenticated';
            state.user    = payload;
            state.errorMessage = undefined;
        },
        onLoginOther: (state, {payload}) =>{
            state.status       = 'authenticatedOther';
            state.user         = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, {payload} ) => {
            state.status = 'not-authenticated';
            state.user   = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
        notRegisterUser: (state,{payload}) => {
            state.user   = {};
            state.errorMessage = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin,onLoginOther, onLogout, clearErrorMessage, notRegisterUser} = authSlice.actions;