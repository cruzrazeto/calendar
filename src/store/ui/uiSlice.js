import { createSlice } from '@reduxjs/toolkit'

const initialStateUi = {
  isDateModalOpen: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialStateUi,
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions