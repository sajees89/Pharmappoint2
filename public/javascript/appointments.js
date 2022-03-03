let info = [];

async function newApptHandler(event) {
  event.preventDefault();

  var appointments = await fetch(`/api/appointment/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointments),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      info = data;
      console.log(data[0].Appointments_date);
      console.log(data);
    });
}
document.getElementById('myBtn').addEventListener('click', newApptHandler);

async function adminApptHandler(event) {
  event.preventDefault();

  const Appointments_time = document.querySelector(
    'input[name="Appointments_time"]'
  ).value;
  const Appointments_date = document.querySelector(
    'input[name="Appointments_date"]'
  ).value;
  const Appointments_type = document.querySelector(
    'input[name="Appointments_type"]'
  ).value;

  const response = await fetch(`/api/appointment/all`, {
    method: 'POST',
    body: JSON.stringify({
      Appointments_time,
      Appointments_date,
      Appointments_type,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/api/homepage');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-appt-form').addEventListener('submit', adminApptHandler);