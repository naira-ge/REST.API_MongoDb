import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'AGBU' },
  { id: '1', name: 'GrantQuickStart' },
  { id: '2', name: 'Codics' },
  { id: '3', name: 'ServiceTitan' },
  { id: '4', name: 'Picsart' },
  { id: '5', name: 'Preezma' },
  { id: '6', name: 'AOByte' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer
