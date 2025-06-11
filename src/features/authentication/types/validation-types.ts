type falsyOrInputValue = false | string;

export interface I_strategy {
  validate: (input: HTMLInputElement) => boolean;
}

export interface I_validation {
  usernameValidation: boolean | string;
  emailValidation: boolean | string;
  passwordValidation: boolean | string;
  confirmValidation: boolean;
}

export interface I_validationCheck {
  username: falsyOrInputValue;
  email: falsyOrInputValue;
  password: falsyOrInputValue;
  confirmPassword: boolean;
}
