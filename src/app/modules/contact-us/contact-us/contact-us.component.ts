import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createInvalidDomainValidator } from '../contact-us/invalidEmailDomain';

const invalidEmailDomain = createInvalidDomainValidator([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
]);

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  contactForm = new FormGroup({
    senderName: new FormControl('', [Validators.required]),
    senderEmail: new FormControl('', [
      Validators.required,
      Validators.email,
      invalidEmailDomain,
    ]),
    senderMessage: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  submitForm() {
    console.log(this.contactForm.valid);
    this.contactForm.reset();
  }
}
