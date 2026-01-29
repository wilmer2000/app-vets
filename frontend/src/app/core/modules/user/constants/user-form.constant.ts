import { FormControl, FormGroup } from '@angular/forms';

export const USER_FORM_CONSTANT = () => {
  return new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    isActive: new FormControl(false)
  });
}
