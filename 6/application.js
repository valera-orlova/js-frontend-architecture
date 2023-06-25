import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN

export default () => {
  const form = document.querySelector('form');

  const inputs = {
    name: form.querySelector('#sign-up-name'),
    email: form.querySelector('#sign-up-email'),
    password: form.querySelector('#sign-up-password'),
    passwordConfirmation: form.querySelector('#sign-up-password-confirmation'),
  };

  const signUpContainer = document.querySelector('[data-container="sign-up"]');

  let allFieldsComplete = false;

  const button = form.querySelector('[type="submit"]');


  const updateInputs = () => {
    const inputsText = {
      name: inputs.name.value,
      email: inputs.email.value,
      password: inputs.password.value,
      passwordConfirmation: inputs.passwordConfirmation.value,
    };
  
    const errors = validate(inputsText);
  
    form.querySelectorAll('.is-invalid').forEach(element => {
      element.classList.remove('is-invalid');
    });
    form.querySelectorAll('.invalid-feedback').forEach(element => {
      element.remove();
    });
  
    Object.entries(errors).forEach(([errorKey, errorMessage]) => {
      const input = inputs[errorKey];
      if (input) {
        const errorElement = document.createElement('div');
        errorElement.classList.add('invalid-feedback');
        errorElement.textContent = errorMessage.message;
        input.classList.add('is-invalid');
        input.after(errorElement);
      }
    });
    
    allFieldsComplete = Object.values(inputs).every(input => input.value !== '');
  
    if (isEmpty(errors) && allFieldsComplete) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', true);
    }
  };
  
  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', (event) => {  
      event.preventDefault();
      updateInputs();
    });
  });
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const inputsValues = {
      name: inputs.name.value,
      email: inputs.email.value,
      password: inputs.password.value,
    };
    await axios.post(routes.usersPath(), inputsValues);
    signUpContainer.innerHTML = 'User Created!';
  });
};

// END
