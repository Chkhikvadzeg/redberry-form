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



let form = document.querySelector('.employee-info');
const firstFormButton = form.querySelector('.button--small');

firstFormButton.addEventListener('click', (event) => {
    let data = {};
    const firstName = form.querySelector('#firstName').value;
    const lastName = form.querySelector('#lastName').value;
    const georgianRegex = /^[a-z]*$/g;
    console.log(georgianRegex.test(firstName), firstName);
    if(georgianRegex.test(firstName)) {
        data.firstName = firstName;
    }
    console.log(data)
})