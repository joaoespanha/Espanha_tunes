const FAVORITE_SONGS_KEY = 'favorite_songs';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY))) {
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
}

// It access th socalStorage and returns an js object that represents the fav Songs
const readFavoriteSongs = () => JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY));

// It sets a favorite Song in localStorage, the favorite song received is an object
const saveFavoriteSongs = (favoriteSongs) => localStorage
  .setItem(FAVORITE_SONGS_KEY, JSON.stringify(favoriteSongs));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso futuramente.
// --------------------------------------------------------------------

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

// It returns an arry of objects containing the favorite songs info
// It is assync - returns a promise that needs to be solved
export const getFavoriteSongs = () => new Promise((resolve) => {
  const favoriteSongs = readFavoriteSongs();
  simulateRequest(favoriteSongs)(resolve);
});

// It receives an objct with a song info as param, checks if that param is given
// If that param is given for the func it gets the favorite songs arry
// and sets a new favorite songs in local storage
// with the destructuring of the previous arry an adding the new fav song to localStorage
// It is assync - returns a promise that needs to be solved
export const addSong = (song) => new Promise((resolve) => {
  if (song) {
    const favoriteSongs = readFavoriteSongs();
    saveFavoriteSongs([...favoriteSongs, song]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

// It gets the current favorite songs seted in localStorage
// and removes a specific song that macthes the trackId of the objct
// that it is given as the param
// It is assync - returns a promise that needs to be solved
export const removeSong = (song) => new Promise((resolve) => {
  const favoriteSongs = readFavoriteSongs();
  saveFavoriteSongs(favoriteSongs.filter((s) => s.trackId !== song.trackId));
  simulateRequest(SUCCESS_STATUS)(resolve);
});
