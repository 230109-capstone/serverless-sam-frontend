import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Reimbursement } from "../../models/Reimbursement";
import { remoteUrl } from "../../models/URL";

export const createReimbursement = createAsyncThunk(
    "create reimbursement",
    async (reimbursement: Reimbursement, thunkAPI) => {
        try {
            const res = await axios.post(`${remoteUrl}/reimbursements`, reimbursement);
            console.log(res.data);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Failed to create Reimbursement');
        }
    }
);

export const getReimbursements = createAsyncThunk(
    "create reimbursement",
    async (reimbursement: Reimbursement[], thunkAPI) => {
        try {
            const res = await axios.get(`${remoteUrl}/reimbursements`);
            console.log(res.data);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Failed to get Reimbursements');
        }
    }
);

export const updateReimbursement = createAsyncThunk(
    'update reimbursement',
    async (reimbursement: Reimbursement, thunkAPI) => {
        try {
            const res = await axios.patch(`${remoteUrl}/reimbursements`, reimbursement, {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
            console.log(res.data);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Not Authorized');
        }
    }
);

export const reimbursementSlice = createSlice({
    name: "user",
    initialState: {reimbursements: []},
    reducers: {
        setReimbursements: (state, action) => {
            state.reimbursements = action.payload;
            return state;
        }
    }
});

export const { setReimbursements } = reimbursementSlice.actions;

export default reimbursementSlice.reducer;