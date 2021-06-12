const form = document.querySelector('#form');

// Input Fields
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#password2');


// Functions
// Error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.remove('success')
    formControl.classList.add('error')
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Success message
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error')
    formControl.classList.add('success')
}

// Check if email is valid
function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Check username
function checkUsername(username) {
    if (username.value === '') {
        showError(username, 'Username is required');
    } else if (username.value.length <= 8) {
        showError(username, 'Username must have atleast 8 characters');
    } else if (username.value.length >= 18) {
        showError(username, 'Username can have maximum 18 characters');
    } else {
        showSuccess(username);
    }
}

// Check email
function checkEmail(email) {
    if (email.value === '') {
        showError(email, 'Email is required');
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Invalid email');
    } else {
        showSuccess(email);
    }
}

// Check password
function checkPassword(password) {
    if (password.value === '') {
        showError(password, 'Password is required');
    } else if (password.value.length <= 8) {
        showError(password, 'Password must have atleast 8 characters');
    } else {
        showSuccess(password);
    }
}

function checkConfirmPassword(password2) {
    if (password.value === password2.value && password2.value !== '') {
        showSuccess(password2);
    } else {
        showError(password2, 'Password does not match');
    }
}

// Event Listeners
form.addEventListener('submit', (event) => {
    event.preventDefault();

    //Checks
    checkUsername(username)
    checkEmail(email)
    checkPassword(password)
    checkConfirmPassword(password2)

});