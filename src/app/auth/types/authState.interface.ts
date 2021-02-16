import {CurrentUserInterface} from '../../shared/types/currentUser.interface'
import {BackendErrors} from './backendErrors'

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null
  isLoginIn: boolean | null
  validationsErrors: BackendErrors | null
}
