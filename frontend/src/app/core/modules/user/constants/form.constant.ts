import { FormControl, FormGroup } from '@angular/forms';
import {
  ADDRESS_FORM_CONSTANT,
  CONTACT_FORM_CONSTANT,
} from '../../../../shared/constants/forms.constant';

export const USER_FORM_CONSTANT = () => {
  return new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    isActive: new FormControl(false),
    address: ADDRESS_FORM_CONSTANT(),
    contact: CONTACT_FORM_CONSTANT(),
  });
};
