const teamSelect = document.querySelector('#team');

teamSelect.addEventListener('change', () => {
    document.querySelector('#position').disabled = false;
    let select = document.querySelector('#position');
    select.innerHTML = '<option value="position" disabled selected>პოზიცია</option>';
    const teamId = teamSelect.value;

    fetch('https://pcfy.redberryinternship.ge/api/positions') 
    .then(response => response.json()).then(data => {
        let positions = data.data;
        for(let i = 0; i < positions.length; i++) {
            let option = document.createElement('option');
            option.value = positions[i].id;
            option.innerText = positions[i].name;
            if(positions[i].team_id == teamId) {
                select.appendChild(option);
            }
        }
    }
)
})


fetch('https://pcfy.redberryinternship.ge/api/teams')
    .then(response => response.json()).then(data => {
        let teams = data.data;
        let select = document.querySelector('#team');
        for(let i = 0; i < teams.length; i++) {
            let option = document.createElement('option');
            option.value = teams[i].id;
            option.innerText = teams[i].name;
            select.appendChild(option);
        }
    }
)

fetch('https://pcfy.redberryinternship.ge/api/brands')
    .then(response => response.json()).then(data => {
        let brands = data.data;
        let select = document.querySelector('#laptop-brand');
        for(let i = 0; i < brands.length; i++) {
            let option = document.createElement('option');
            option.value = brands[i].id;
            option.innerText = brands[i].name;
            select.appendChild(option);
        }
    }
)

fetch('https://pcfy.redberryinternship.ge/api/cpus')
    .then(response => response.json()).then(data => {
        let cpus = data.data;
        let select = document.querySelector('#cpu');
        for(let i = 0; i < cpus.length; i++) {
            let option = document.createElement('option');
            option.value = cpus[i].id;
            option.innerText = cpus[i].name;
            select.appendChild(option);
        }
    }
)


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
    event.target.value = `${year} / ${month} / ${day}`;

})

document.querySelector('#date').addEventListener('blur', (event) => {
    if(event.target.value === '') {
        event.target.type = 'text';        
    }

})