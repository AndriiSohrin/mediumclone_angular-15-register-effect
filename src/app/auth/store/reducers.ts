import {createReducer, on, Action} from '@ngrx/store';

import {AuthStateInterface} from 'src/app/auth/types/authState.interface';
import {registerAction, registerFailureAction, registerSuccessAction} from 'src/app/auth/store/actions/register.action';
import {loginAction, loginFailureAction, loginSuccessAction} from './actions/login.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoginIn: null,
  validationsErrors: null
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationsErrors: null
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoginIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationsErrors: action.errors
    })
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationsErrors: null
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
      isLoginIn: true
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationsErrors: action.errors
    })
  )
);


export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
