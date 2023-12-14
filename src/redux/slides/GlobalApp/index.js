
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    messageBox: {
        title: '',
        content: '',
        contentCancel: '',
        contentOK: '',
        result: null,
        type: '',
        isShow: false
    }
}

const slice = createSlice({
    name: 'globalApp',
    initialState,
    reducers: {
        setLoading: (state,action) => {
            state.loading = action.payload;
        },
        setMessageBox: (state,action) => {
            state.messageBox = {
                ...state.messageBox,
                ...action.payload
            };
        },
    },
    
})

export default slice.reducer;
export const {setLoading, setMessageBox} = slice.actions