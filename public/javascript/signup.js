async function signupFormHandler(event){
    event.preventDefault();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const firstname = document.querySelector('#firstname-signup').value.trim();
    const lastname = document.querySelector('#lastname-signup').value.trim();

    const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok){
        location.replace('/appointment');
    } else {
        alert('Failed to create account.');
    }
}

const signupForm = document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);