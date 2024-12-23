import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Profile } from '../../lib/types';
import { getCurrentUserProfile } from '../../api/services';

interface UserState {
  user: Profile;
  loading: boolean;
}

const initialState: UserState = {
  user: {
    id: 0,
    username: '',
    email: '',
    date: '',
    isBlocked: false,
    isAdmin: false,
    phoneNumber: '',
  },
  loading: false,
};

export const fetchUser = createAsyncThunk<Profile>(
  'user/fetchUser',
  async () => {
    try {
      const user = await getCurrentUserProfile();
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
