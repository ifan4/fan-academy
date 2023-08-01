'use client'
import { theme } from '@/types/interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState:theme = {
    name: 'dark'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeToDark:(state) => {
            state.name = 'dark'
        },
        changeToLight:(state) => {
            state.name = 'light'
        }
    }
})



export default themeSlice.reducer
export const { changeToDark, changeToLight } = themeSlice.actions