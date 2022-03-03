const loginForm = document.querySelector('#login-form');

async function loginFormHandler(event){
  event.preventDefault();

  const email = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  console.log(JSON.stringify({
        email: email,
        password: password
      }))

  const response = await fetch('/api/users/login', {
    method: 'post',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {'Content-Type': 'application/json'}
  })

  if (response.ok){
    location.replace('/appointment');
    return;
  } else {
    alert('Failed to login')
  }
}

loginForm.addEventListener('submit', loginFormHandler);