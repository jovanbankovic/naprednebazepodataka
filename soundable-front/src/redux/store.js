import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appReducer'
import albumsReducer from './albumReducer'
import awardsReducer from './awardsReducer'
import genreReducer from './genresReducer'
import labelsReducer from './labelsReducer'
import userReducer from './userReducer'
import playlistReducer from './playlistReducer'
import songReducer from './songReducer'

export default configureStore({
  reducer: {
    appReducer: appReducer,
    albumsReducer: albumsReducer,
    awardsReducer: awardsReducer,
    genreReducer: genreReducer,
    labelsReducer: labelsReducer,
    userReducer: userReducer,
    playlistReducer: playlistReducer,
    songReducer: songReducer
  },
});