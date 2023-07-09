import IMask from 'imask';

interface FormElement extends HTMLInputElement {
    parentElement: HTMLElement;
}

const phoneEls = document.querySelectorAll('input[name="phone"]') as NodeListOf<FormElement>;
const termsCheckboxEl = document.querySelector('#terms-checkbox') as  FormElement;

const forms = document.querySelectorAll('form') as NodeListOf<HTMLFormElement>;

const maskOptions = {
    mask: '+{375}(00)000-00-00'
};
phoneEls.forEach(phoneEl => {
    IMask(phoneEl, maskOptions);
});


const checkElements = (form: HTMLFormElement, elements: NodeListOf<FormElement>, validationFunction: (element: FormElement) => boolean): boolean => {
    let isValid = true;

    elements.forEach(element => {
        if (!isExistingField(element)) {
            return;
        }

        isValid = validationFunction(element) && isValid;
    });

    return isValid;
};

const checkUsername = (form: HTMLFormElement): boolean => {
    const min = 3;
    const max = 40;
    const usernameEls = form.querySelectorAll('input[name="username"]') as NodeListOf<FormElement>;
    return checkElements(form, usernameEls, (usernameEl) => {
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

const checkLastname = (form: HTMLFormElement): boolean => {
    const min = 3;
    const max = 40;
    const lastnameEls = form.querySelectorAll('input[name="lastname"]') as NodeListOf<FormElement>;
    return checkElements(form, lastnameEls, (lastnameEl) => {
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

const checkEmail = (form: HTMLFormElement): boolean => {
    const emailEls = form.querySelectorAll('input[name="email"]') as NodeListOf<FormElement>;
    return checkElements(form ,emailEls, (emailEl) => {
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

const checkPassword = (form: HTMLFormElement): boolean => {
    const passwordEls = form.querySelectorAll('input[name="password"]') as NodeListOf<FormElement>;
    return checkElements(form, passwordEls, (passwordEl) => {
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

const checkPhone = (form: HTMLFormElement): boolean => {
    const phoneEls = form.querySelectorAll('input[name="phone"]') as NodeListOf<FormElement>;
    return checkElements(form ,phoneEls, (phoneEl) => {
        const phone = phoneEl.value.trim();
        if (!isNotEmpty(phone)) {
            showError(phoneEl, 'Телефон не может быть пустым');
            return false;
        } else if (!isPhoneValid(phone)) {
            showError(phoneEl, 'Номер телефона не валидный');
            return false;
        } else {
            showSuccess(phoneEl);
            return true;
        }
    });
};

const checkTermsCheckbox = (form: HTMLFormElement): boolean => {
    const termsCheckboxEls = form.querySelectorAll('input[type="checkbox"][name="terms-checkbox"]') as NodeListOf<FormElement>;
    return checkElements(form, termsCheckboxEls, (termsCheckboxEl) => {
        if (!termsCheckboxEl.checked) {
            showError(termsCheckboxEl, 'Вы должны принять условия обработки <br/> персональных данных');
            return false;
        } else {
            showSuccess(termsCheckboxEl);
            return true;
        }
    });

};
const checkRadioButtons = (form: HTMLFormElement): boolean => {
    const radioButtons = form.querySelectorAll('input[type="radio"][name="room"]') as NodeListOf<FormElement>;
    return checkElements(form ,radioButtons, (radioButton) => {
        let isChecked = false;
        radioButtons.forEach(item => {
            if ((item as HTMLInputElement).checked) {
                isChecked = true;
            }
        });

        if (!isChecked) {
            showError(radioButtons[0], 'Пожалуйста выберите комнату');
        } else {
            showSuccess(radioButtons[0])
        }
        return isChecked;
    });
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
    const re = /^\+375\((29|25|44|33)\)\d{3}-\d{2}-\d{2}$/;
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
    error.innerHTML = message;
};

const showSuccess = (input: FormElement): void => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small') as HTMLElement;
    error.textContent = '';
};

function getData(form: any) {
    var formData = new FormData(form);

    // iterate through entries...
    for (var pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }

    // ...or output as an object
    console.log(Object.fromEntries(formData));
}

forms.forEach(form => {
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const isUsernameValid = checkUsername(form);
        const isLastnameValid = checkLastname(form);
        const isEmailValid = checkEmail(form);
        const isPasswordValid = checkPassword(form);
        const isPhoneValid = checkPhone(form);
        const isTermsAccepted = checkTermsCheckbox(form);
        const isRadioButtonChecked = checkRadioButtons(form);

        const isFormValid = (
            isUsernameValid &&
            isLastnameValid &&
            isEmailValid &&
            isPasswordValid  &&
            isPhoneValid &&
            isTermsAccepted &&
            isRadioButtonChecked
        );
        console.log(isUsernameValid, "username")
        console.log(isLastnameValid, "lastname")
        console.log(isPasswordValid, "pass")
        console.log(isEmailValid, "email")
        console.log(isPhoneValid, "phone")
        console.log(isTermsAccepted, "terms")
        console.log(isRadioButtonChecked, "radio")

        if (isFormValid) {
            console.log(form, "parent")
            //form.innerHTML = '<h3>Ваше сообщение отправлено, ждите ответа в ближайшее время</h3>'
            console.log("FORM valid")
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
                checkUsername(form);
                break;
            case 'email':
                checkEmail(form);
                break;
            case 'phone':
                checkPhone(form);
                break;
            case 'password':
                checkPassword(form);
                break;
            case 'terms-checkbox':
                checkTermsCheckbox(form);
                break;
            case 'lastname':
                checkLastname(form);
                break;
            case 'room':
                checkRadioButtons(form);
                break;
        }
    }));
})
