const USER_KEY = 'user';
const TIMEOUT = 1500;
const SUCCESS_STATUS = 'OK';

// It reads the local storage to get the user Key
const readUser = () => JSON.parse(localStorage.getItem(USER_KEY));

// It is used to save the user that is received by the param user in local storage
const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso mais futuramente
// --------------------------------------------------------------------

// Request simulator func
const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

// It tests if ther is an user with the func readUser, if there is one it returns an object with user info
// If it doesn't find one it returns an empty Obj
// It is assync - returns a promise that needs to be solved
export const getUser = () => new Promise((resolve) => {
  let user = readUser();
  if (user === null) {
    user = {};
  }
  simulateRequest(user)(resolve);
});

// It receives an obj as param and sets a new user in localStorage wit the func saveUser
//  param obj ={
//  name: '',
//  email: '',
//  image: '',
//  description: '',
// }
// It is assync - returns a promise that needs to be solved
export const createUser = (user) => new Promise((resolve) => {
  const emptyUser = {
    name: '',
    email: '',
    image: '',
    description: '',
  };
  saveUser({ ...emptyUser, ...user });
  simulateRequest(SUCCESS_STATUS)(resolve);
});

// It updates an user's info with the func saveUser
// It is assync - returns a promise that needs to be solved
export const updateUser = (updatedUser) => new Promise((resolve) => {
  saveUser({ ...updatedUser });
  simulateRequest(SUCCESS_STATUS)(resolve);
});
