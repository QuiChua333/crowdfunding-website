
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
}

const slice = createSlice({
    name: 'globalApp',
    initialState,
    reducers: {
        setLoading: (state,action) => {
            state.loading = action.payload;
        },
    },
    
})

export default slice.reducer;
export const {setLoading} = slice.actions