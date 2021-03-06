// const users = [];

async function loginFormHandler(event){
  event.preventDefault();
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

if (email && password) {
  console.log(email, password);

  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {'Content-Type': 'application/json'}
  })

    console.log(await response.json());
    if (response.ok) {
      document.location.replace('/view/homepage');
    } 
    
    // else {
    //   alert((await response.json()).message);
    // }
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);