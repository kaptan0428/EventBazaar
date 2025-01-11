import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user state
interface UserState {
    email: string | null;
}

// Set the initial state
const initialState: UserState = {
    email: null
};

const userSlice = createSlice({
    name: 'user', // slice name
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{email: string|null}>) => {
            state.email = action.payload.email;
        },
        logout: (state) => {
            state.email = null;
            // persistor.purge(); // Clear the persisted state
        }
    }
});


// Export actions and reducer
export const {login, logout} = userSlice.actions;
export default userSlice.reducer;