let info = [];

async function newApptHandler(event) {
  event.preventDefault();

  var appointments = await fetch(`/api/appointment`, {
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
