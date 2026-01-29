import { FormControl, FormGroup } from '@angular/forms';

export const USER_FORM_CONSTANT = () => {
  return new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    isActive: new FormControl(false),
    address: USER_ADDRESS_FORM_CONSTANT(),
    contact: USER_CONSTANT_FORM_CONSTANT(),
  });
};

export const USER_CONSTANT_FORM_CONSTANT = () => {
  return new FormGroup({
    phone: new FormControl(''),
    email: new FormControl(''),
  });
};

export const USER_ADDRESS_FORM_CONSTANT = () => {
  return new FormGroup({
    street: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
  });
};
