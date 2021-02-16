import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {BackendErrors} from '../../types/backendErrors';
import {select, Store} from '@ngrx/store';
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {LoginRequestInterface} from '../../types/loginRequest.interface';
import {loginAction} from '../../store/actions/login.action';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrors | null>;

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeForm(): void {
    console.log('initializeForm');
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid);
    const request: LoginRequestInterface = {
      user: this.form.value
    };
    this.store.dispatch(loginAction({request}));
  }
}
