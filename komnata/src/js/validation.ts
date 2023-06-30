import IMask from 'imask';

interface FormElement extends HTMLInputElement {
    parentElement: HTMLElement;
}

const usernameEl = document.querySelector('#username') as FormElement;
const emailEl = document.querySelector('#email') as FormElement;
const passwordEl = document.querySelector('#password') as FormElement;
const phoneEl = document.querySelector('#phone') as FormElement;
const termsCheckboxEl = document.querySelector('#terms-checkbox') as  FormElement;
const confirmPasswordEl = document.querySelector('#confirm-password') as FormElement;

const form = document.querySelector('#form') as HTMLFormElement;

const maskOptions = {
    mask: '+{375}(29)000-00-00'
};
const mask = IMask(phoneEl, maskOptions);
const checkUsername = (): boolean => {
    if (!isRequiredField(usernameEl)) {
        return true;
    }

    const min = 3;
    const max = 40;
    const username = usernameEl.value.trim();
    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
        return false;
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`);
        return false;
    } else {
        showSuccess(usernameEl);
        return true;
    }
};

const checkEmail = (): boolean => {
    if (!isRequiredField(emailEl)) {
        return true;
    }

    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
        return false;
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.');
        return false;
    } else {
        showSuccess(emailEl);
        return true;
    }
};

const checkPassword = (): boolean => {
    if (!isRequiredField(passwordEl)) {
        return true;
    }

    const password = passwordEl.value.trim();
    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
        return false;
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must have at least 8 characters, including at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character (!@#$%^&*).');
        return false;
    } else {
        showSuccess(passwordEl);
        return true;
    }
};

const checkPhone = (): boolean => {
    if (!isRequiredField(phoneEl)) {
        return true;
    }

    const phone = phoneEl.value.trim();
    if (!isRequired(phone)) {
        showError(phoneEl, 'Phone number cannot be blank.');
        return false;
    } else if (!isPhoneValid(phone)) {
        showError(phoneEl, 'Phone number is not valid.');
        return false;
    } else {
        showSuccess(phoneEl);
        return true;
    }
};

const checkTermsCheckbox = (): boolean => {
    if (!termsCheckboxEl.checked) {
        showError(termsCheckboxEl, 'You must accept the terms and conditions.');
        return false;
    } else {
        showSuccess(termsCheckboxEl);
        return true;
    }
};
const checkConfirmPassword = (): boolean => {
    if (!isRequiredField(confirmPasswordEl)) {
        return true;
    }

    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();
    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again.');
        return false;
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match.');
        return false;
    } else {
        showSuccess(confirmPasswordEl);
        return true;
    }
};

const isEmailValid = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password: string): boolean => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return re.test(password);
};

const isPhoneValid = (phone: string): boolean => {
    const re = /^\+375\(29\)\d{3}-\d{2}-\d{2}$/;
    return re.test(phone);
};

const isRequired = (value: string): boolean => value.trim() !== '';

const isRequiredField = (field: FormElement | null): boolean => {
    return field !== null;
};

const isBetween = (length: number, min: number, max: number): boolean => length >= min && length <= max;

const showError = (input: FormElement, message: string): void => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small') as HTMLElement;
    error.textContent = message;
};

const showSuccess = (input: FormElement): void => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small') as HTMLElement;
    error.textContent = '';
};

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const isUsernameValid = checkUsername();
    const isEmailValid = checkEmail();
    const isPasswordValid = checkPassword();
    const isConfirmPasswordValid = checkConfirmPassword();
    const isPhoneValid = checkPhone();
    const isTermsAccepted = checkTermsCheckbox();

    const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isPhoneValid && isTermsAccepted;

    if (isFormValid) {
        console.log("FORM valid")
        // Form submission logic goes here
    }
});

const debounce = <F extends (...args: any[]) => void>(fn: F, delay = 500): ((...args: Parameters<F>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<F>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

form.addEventListener('input', debounce((e: Event) => {
    const target = e.target as FormElement;
    switch (target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'phone':
            checkPhone();
            break;
        case 'password':
            checkPassword();
            break;
        case 'terms-checkbox':
            checkTermsCheckbox();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));
