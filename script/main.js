document.querySelector('#date').addEventListener('focus', (event) => {
    event.target.type = 'date';
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    if(month < 10) {
        month = '0' + month;
    }
    if(day < 10) {
        day = '0' + day;
    }
    event.target.value = `${year}-${month}-${day}`;

})

document.querySelector('#date').addEventListener('blur', (event) => {
    event.target.type = 'text';
    event.target.value = '';
})