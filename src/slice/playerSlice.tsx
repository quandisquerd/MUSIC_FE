import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null, // Thông tin bài hát hiện tại
  isPlaying: false,  // Trạng thái phát/tạm dừng
  playlist: [],      // Danh sách bài hát
  currentIndex: 0,   // Vị trí bài hát hiện tại trong danh sách
  repeat: false,     // Trạng thái lặp bài hát
  currentTime: 0,    // Thời gian phát hiện tại
  duration: 0,       // Thời lượng bài hát
  volume: 100,       // Âm lượng
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlaylist(state, action) {
      state.playlist = action.payload;
    },
    playSong(state, action) {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.currentIndex = state.playlist.findIndex((song:any) => song.id === action.payload.id);
    },
    togglePlayPause(state) {
      state.isPlaying = !state.isPlaying;
    },
    nextSong(state) {
      // Nếu đang phát bài nào đó trong playlist
      if (state.currentIndex < state.playlist.length - 1) {
        state.currentIndex += 1;  // Chuyển đến bài tiếp theo
        state.currentSong = state.playlist[state.currentIndex];
        state.isPlaying = true;   // Tiếp tục phát nhạc
      } else if (state.repeat) {
        // Nếu repeat đang bật, quay lại bài đầu tiên
        state.currentIndex = 0;
        state.currentSong = state.playlist[state.currentIndex];
        state.isPlaying = true;
      } else {
        // Nếu không có bài nào để phát, dừng phát nhạc
        state.isPlaying = false;
        state.currentSong = null;
      }
    },
    
    prevSong(state) {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currentSong = state.playlist[state.currentIndex];
        state.isPlaying = true;
      }
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    toggleRepeat(state) {
      state.repeat = !state.repeat;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
  },
});

export const {
  setPlaylist,
  playSong,
  togglePlayPause,
  nextSong,
  prevSong,
  setCurrentTime,
  setDuration,
  toggleRepeat,
  setVolume,
} = playerSlice.actions;

export default playerSlice.reducer;
