import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    count: number;
    imageUri: string | null;
}

const initialState: CounterState = {
    count: 0,
    imageUri: null,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        setImage: (state, action: PayloadAction<string | null>) => {
            state.imageUri = action.payload;
        },
    },
});

export const { increment, decrement, setImage } = counterSlice.actions;
export default counterSlice.reducer;
