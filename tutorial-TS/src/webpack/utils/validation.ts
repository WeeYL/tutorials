

  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLen?: number;
    maxLen?: number;
    min?: number;
    max?: number;
  }

  
  export function validate(validatableInput: Validatable) {
    let isValid = true; // truthsy toggler
    if (validatableInput.required) {
      isValid =
        isValid && validatableInput.value.toString().trim().length !== 0;
    }

    if (
      validatableInput.minLen != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length >= validatableInput.minLen;
    }
    if (
      validatableInput.maxLen != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length <= validatableInput.maxLen;
    }

    if (
      validatableInput.min != null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    if (
      validatableInput.max != null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid;
  }
