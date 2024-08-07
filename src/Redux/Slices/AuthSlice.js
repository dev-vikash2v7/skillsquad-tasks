import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice  } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
    name: 'auth',

    initialState: {
      user : null,
    },

    reducers: {
      setUser : (state , action) => {
          AsyncStorage.setItem('user_'+action.payload?.id, JSON.stringify(action.payload));
          state.user = action.payload;
      },
      updateUser : (state , action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        AsyncStorage.setItem('user_'+state?.user?.id, JSON.stringify(state.user));
      },
      removeUser : (state ) => {
        AsyncStorage.clear()
          state.user = null
      },
      
    }
  })

export const {setUser , removeUser , updateUser } = AuthSlice.actions;

export default AuthSlice.reducer