import {createSlice , PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export interface DungeonState {
  dungeon: string;
}

const initialState: DungeonState = {
  dungeon: 'test'
}

export const dungeonSlice = createSlice({
  name: 'dungeon',
  initialState,
  reducers: {
    setDungeon: (state, action: PayloadAction<string>) => {
      state.dungeon = action.payload;
    },
  },
});

export const { setDungeon } = dungeonSlice.actions;

export const selectDungeon = (state: RootState) => state.dungeon.dungeon;

export default dungeonSlice.reducer;