import { FormControl, FormGroup } from '@angular/forms';

export const CONTACT_FORM_CONSTANT = () => {
  return new FormGroup({
    phone: new FormControl(''),
    email: new FormControl(''),
  });
};

export const ADDRESS_FORM_CONSTANT = () => {
  return new FormGroup({
    street: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
  });
};
