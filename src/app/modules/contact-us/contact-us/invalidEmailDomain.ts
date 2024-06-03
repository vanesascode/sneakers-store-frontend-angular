import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createInvalidDomainValidator(hosts: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value?.toLowerCase();

    if (!email) {
      return null;
    }

    const matches = hosts.some((host) => email.endsWith(host));

    return matches ? { invalidEmailDomain: true } : null;
  };
}
