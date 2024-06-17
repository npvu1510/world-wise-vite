/* eslint-disable */
import { createContext, useContext, useReducer } from 'react';

const FAKE_USER = {
  name: 'Tester',
  email: 'test@gmail.com',
  password: '123',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'logged in':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'logged out':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error('Reducer case not foun');
  }
}

const authContext = createContext();

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = function (email, password) {
    if (!email || !password) return;

    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'logged in', payload: FAKE_USER });
    }
  };

  const logout = function () {
    if (!isAuthenticated) return;

    dispatch({ type: 'logged out' });
  };

  console.log(`AuthProvider: ${isAuthenticated}`);
  return (
    <authContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);

  if (!context) throw new Error('Context not found!');

  return context;
}

export { AuthProvider, useAuth };
