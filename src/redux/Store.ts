import { configureStore } from '@reduxjs/toolkit';
import reimbursementSlice from './slices/reimbursementSlice';
import userSlice from './slices/userSlice';


const store = configureStore({
    reducer: {
        user: userSlice,
        reimbursement: reimbursementSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;