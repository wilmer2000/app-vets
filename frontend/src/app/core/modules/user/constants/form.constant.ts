import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ADDRESS_FORM_CONSTANT,
  CONTACT_FORM_CONSTANT,
} from '../../../../shared/constants/forms.constant';
import { Roles } from '../enums/roles.enum';

export const USER_FORM_CONSTANT = () => {
  return new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    role: new FormControl(Roles.User, [Validators.required]),
    isActive: new FormControl(false),
    address: ADDRESS_FORM_CONSTANT(),
    contact: CONTACT_FORM_CONSTANT(),
  });
};
