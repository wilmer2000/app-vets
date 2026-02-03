import { FormControl, FormGroup } from '@angular/forms';
import {
  ADDRESS_FORM_CONSTANT,
  CONTACT_FORM_CONSTANT,
} from '../../../shared/constants/forms.constant';

export const ENTITY_FORM_CONSTANT = () => {
  return new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    isActive: new FormControl(false),
    address: CONTACT_FORM_CONSTANT(),
    contact: ADDRESS_FORM_CONSTANT(),
    configuration: ENTITY_CONFIGURATION_CONSTANT(),
  });
};

export const ENTITY_CONFIGURATION_CONSTANT = () => {
  return new FormGroup({
    logo: new FormControl(''),
    color1: new FormControl(''),
    color2: new FormControl(''),
  });
};
