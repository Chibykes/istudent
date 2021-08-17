const vmForm = document.querySelector('#vm-form');
vmForm && (vmForm.onsubmit = (e) => {
    e.preventDefault();
    let confirmID = document.getElementsByName('confirmID')[0].value;
    location.href = '/student/'+confirmID;
})
