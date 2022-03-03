async function calendarFormHandler(event){
    event.preventDefault();
    const date = document.querySelector('#datepicker-1').value;
    const type = document.querySelector('input[name="appt_type"]').value;
    const time = document.querySelector('#selecttime').value;

    const response = await fetch('/api/appointment', {
        method: 'post',
        body: JSON.stringify({
            Appointments_time: time,
            Appointments_date: date,
            Appointments_type: type
        }),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
        location.replace('/postapt');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#appointment-form').addEventListener('submit', calendarFormHandler); 