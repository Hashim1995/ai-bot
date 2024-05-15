/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectOption } from '@/models/common';
import { EmaCombosServices } from '@/services/ema/ema-combos-services';

interface IListState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: unknown | null;
  data: selectOption[];
}

interface RootState {
  jobTitleList: IListState;
  // You can add more lists here
}

// Define the initial state of the Ema module

const initialListState: IListState = {
  status: 'idle',
  error: null,
  data: []
};

const initialState: RootState = {
  jobTitleList: initialListState
};

// Async thunk for fetching jobtitle data
export const fetchJobTitleList = createAsyncThunk(
  'user/fetchJobTitleList',
  async () => {
    try {
      const response = await EmaCombosServices.getInstance().getJobTitleList();
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

// Create the user slice
/**
 * Represents a Redux slice for managing user state.
 *
 * @remarks
 * This slice contains reducers and extra reducers to handle actions related to user data.
 */
const emaMetaSlice = createSlice({
  name: 'ema',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchJobTitleList.pending, state => {
        state.jobTitleList.status = 'loading';
      })
      .addCase(fetchJobTitleList.fulfilled, (state, action) => {
        state.jobTitleList.status = 'succeeded';
        state.jobTitleList.data = action.payload?.jobTitles;
      })
      .addCase(fetchJobTitleList.rejected, (state, action) => {
        state.jobTitleList.status = 'failed';
        state.jobTitleList.error = action.error;
      });
    // Add cases for other lists if necessary
  }
});

// Export the reducer and actions
// export const { setEmaMeta } = emaMetaSlice.actions;
export default emaMetaSlice.reducer;
