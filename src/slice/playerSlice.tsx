import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null, // Thông tin bài hát hiện tại
  isPlaying: false, // Trạng thái phát/tạm dừng
  playlist: [], // Danh sách bài hát
  currentIndex: 0, // Vị trí bài hát hiện tại trong danh sách
  repeat: false, // Trạng thái lặp bài hát
  currentTime: 0, // Thời gian phát hiện tại
  duration: 0, // Thời lượng bài hát
  volume: 100, // Âm lượng
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlaylist(state, action) {
      state.playlist = action.payload;
    },
    playSong(state, action) {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.currentIndex =0;
    },
    togglePlayPause(state) {
      state.isPlaying = !state.isPlaying;
    },
    nextSong(state) {
      // Nếu bài hiện tại là bài đầu tiên, chuyển sang bài thứ 2 (index 1)
      if (state.currentIndex === 0 && state.playlist.length > 1) {
        state.currentIndex = 1; // Chuyển đến bài thứ 2
        state.currentSong = state.playlist[state.currentIndex];
        state.isPlaying = true; // Tiếp tục phát nhạc
      } else if (state.currentIndex < state.playlist.length - 1) {
        // Nếu không phải bài đầu tiên, chuyển đến bài tiếp theo
        state.currentIndex += 1;
        state.currentSong = state.playlist[state.currentIndex];
        state.isPlaying = true; // Tiếp tục phát nhạc
      } else {
        // Nếu không còn bài nào để phát, dừng phát nhạc
        state.isPlaying = false;
        state.currentSong = null; // Đảm bảo currentSong là null khi không có bài hát nào
      }
    },
    
    prevSong(state) {
      // Nếu bài hiện tại không phải bài đầu tiên, quay lại bài trước đó
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currentSong = state.playlist[state.currentIndex];
        state.isPlaying = true; // Tiếp tục phát nhạc
      } else {
        // Nếu bài hát đang phát là bài đầu tiên, không làm gì
        state.isPlaying = false;
        state.currentSong = null; // Đảm bảo currentSong là null khi không có bài hát nào
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
