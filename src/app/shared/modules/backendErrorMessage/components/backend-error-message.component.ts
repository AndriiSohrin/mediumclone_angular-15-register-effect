import {Component, Input, OnInit} from '@angular/core';
import {BackendErrors} from '../../../../auth/types/backendErrors';

@Component({
  selector: 'mc-backend-error-message',
  templateUrl: './backend-error-message.component.html',
  styleUrls: ['./backend-error-message.component.scss']
})
export class BackendErrorMessageComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrors;
  errorMessages: string[];

  constructor() {
  }

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map(
      (name: string) => {
        const messages = this.backendErrorsProps[name].join(', ');
        return `${name} ${messages}`;
      }
    );
  }

}
