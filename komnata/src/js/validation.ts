import IMask from 'imask';

interface FormElement extends HTMLInputElement {
    parentElement: HTMLElement;
}

const usernameEls = document.querySelectorAll('input[name="username"]') as NodeListOf<FormElement>;
const lastnameEls = document.querySelectorAll('input[name="lastname"]') as NodeListOf<FormElement>;
const emailEls = document.querySelectorAll('input[name="email"]') as NodeListOf<FormElement>;
const passwordEls = document.querySelectorAll('input[name="password"]') as NodeListOf<FormElement>;
const phoneEls = document.querySelectorAll('input[name="phone"]') as NodeListOf<FormElement>;
const radioButtons = document.querySelectorAll('input[type="radio"][name="room"]') as NodeListOf<FormElement>;
const termsCheckboxEl = document.querySelector('#terms-checkbox') as  FormElement;

const forms = document.querySelectorAll('form') as NodeListOf<HTMLFormElement>;

const maskOptions = {
    mask: '+{375}(29)000-00-00'
};
phoneEls.forEach(phoneEl => {
    IMask(phoneEl, maskOptions);
});


const checkElements = (elements: NodeListOf<FormElement>, validationFunction: (element: FormElement) => boolean): boolean => {
    let isValid = true;

    elements.forEach(element => {
        if (!isExistingField(element)) {
            return;
        }

        isValid = validationFunction(element) && isValid;
    });

    return isValid;
};

const checkUsername = (): boolean => {
    const min = 3;
    const max = 40;
    return checkElements(usernameEls, (usernameEl) => {
            const username = usernameEl.value.trim();
            if (!isNotEmpty(username)) {
                showError(usernameEl, 'Имя не может быть пустым');
                return false;
            } else if (!isBetween(username.length, min, max)) {
                showError(usernameEl, `Имя должно быть от ${min} до ${max} символов.`);
                return false;
            } else {
                showSuccess(usernameEl);
                return true;
            }
    });
};

const checkLastname = (): boolean => {
    const min = 3;
    const max = 40;
    return checkElements(lastnameEls, (lastnameEl) => {
        const username = lastnameEl.value.trim();
        if (!isNotEmpty(username)) {
            showError(lastnameEl, 'Фамилия не может быть пустой');
            return false;
        } else if (!isBetween(username.length, min, max)) {
            showError(lastnameEl, `Фамилия должна быть от ${min} до ${max} символов.`);
            return false;
        } else {
            showSuccess(lastnameEl);
            return true;
        }
    });
};

const checkEmail = (): boolean => {
    return checkElements(emailEls, (emailEl) => {
        const email = emailEl.value.trim();
        if (!isNotEmpty(email)) {
            showError(emailEl, 'Email не может быть пустым');
            return false;
        } else if (!isEmailValid(email)) {
            showError(emailEl, 'Email не валидный');
            return false;
        } else {
            showSuccess(emailEl);
            return true;
        }
    });
};

const checkPassword = (): boolean => {
    return checkElements(passwordEls, (passwordEl) => {
        const password = passwordEl.value.trim();
        if (!isNotEmpty(password)) {
            showError(passwordEl, 'Пароль не может быть пустым');
            return false;
        } else if (!isPasswordSecure(password)) {
            showError(passwordEl, 'Пароль должен быть не меньше 8 символов, минимум 1 большая буква, 1 маленькая и 1 спец символ (!@#$%^&*).');
            return false;
        } else {
            showSuccess(passwordEl);
            return true;
        }
    });
};

const checkPhone = (): boolean => {
    return checkElements(phoneEls, (phoneEl) => {
        const phone = phoneEl.value.trim();
        if (!isNotEmpty(phone)) {
            showError(phoneEl, 'Телефон не может быть пустым');
            return false;
        } else if (!isPhoneValid(phone)) {
            showError(phoneEl, 'Номер телефона не валидный');
            return false;
        } else {
            showSuccess(phoneEl);
        }
    });
};

const checkTermsCheckbox = (): boolean => {
    if (!isExistingField(termsCheckboxEl)) {
        return true;
    }

    if (!termsCheckboxEl.checked) {
        showError(termsCheckboxEl, 'You must accept the terms and conditions.');
        return false;
    } else {
        showSuccess(termsCheckboxEl);
        return true;
    }
};
const checkRadioButtons = (): boolean => {
    return checkElements(radioButtons, (item) => {
        if ((item as HTMLInputElement).checked) {
            return  true;
        }
    });
}
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

const isNotEmpty = (value: string): boolean => value.trim() !== '';

const isExistingField = (field: FormElement | null): boolean => {
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

forms.forEach(form => {
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const isUsernameValid = checkUsername();
        const isLastnameValid = checkLastname();
        const isEmailValid = checkEmail();
        const isPasswordValid = checkPassword();
        const isPhoneValid = checkPhone();
        const isTermsAccepted = checkTermsCheckbox();
        const isRadioButtonChecked = checkRadioButtons();

        const isFormValid = (
            isUsernameValid &&
            isLastnameValid &&
            isEmailValid &&
            isPasswordValid  &&
            isPhoneValid &&
            isTermsAccepted &&
            isRadioButtonChecked
        );

        if (isFormValid) {
            console.log("FORM valid")
            // Form submission logic goes here
        }
    });
})

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

forms.forEach(form => {
    form.addEventListener('input', debounce((e: Event) => {
        const target = e.target as FormElement;
        switch (target.name) {
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
            case 'lastname':
                checkLastname();
                break;
            case 'room':
                checkRadioButtons();
                break;
        }
    }));
})
