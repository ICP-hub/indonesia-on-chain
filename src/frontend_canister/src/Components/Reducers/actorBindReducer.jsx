import { createSlice } from '@reduxjs/toolkit';

const initialActorState = {
  actor: null,
  content:null,
  error: null,
  loading: false,
};

const actorSlice = createSlice({
  name: 'actors',
  initialState: initialActorState,
  reducers: {
    setActor: (state, action) => {
      state.actor = action.payload;
      state.error = null;
      state.loading = false;
    },
    setContent:(state,action)=>{
      state.content = action.payload;
      state.error = null;
      state.loading = false;
    },
    actorError: (state, action) => {
      state.actor = null;
      state.error = action.payload;
      state.loading = false;
    },
    handleActorRequest: (state) => {
      state.actor = null;
      state.error = null;
      state.loading = true;
    },
  },
});

export const { setActor, actorError, handleActorRequest, setContent } = actorSlice.actions;
export default actorSlice.reducer;
