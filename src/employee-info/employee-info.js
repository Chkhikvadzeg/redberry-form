const firstName = document.querySelector('#name');
const lastName = document.querySelector('#surname');
const team = document.querySelector('#team_id');
const position = document.querySelector('#position_id');
const mail = document.querySelector('#email');
const number = document.querySelector('#phone_number');


let teamOptions = [];
let positionOptions = [];

let submitted = false;

const localData = JSON.parse(localStorage.getItem('data')) || {};


if(localData.name){
    firstName.value = localData.name;
}

if(localData.surname){
    lastName.value = localData.surname;
}

if(localData.email){
    mail.value = localData.email;
}

if(localData.phone_number){
    number.value = localData.phone_number;
}

fetch('https://pcfy.redberryinternship.ge/api/teams')
    .then(response => response.json()).then(data => {
        let teams = data.data;
        teamOptions = [...teams];
        for(let i = 0; i < teams.length; i++) {
            let option = document.createElement('option');
            option.value = teams[i].id;
            option.innerText = teams[i].name;
            team.appendChild(option);
        }

        if(localData.team_id){
            const teamId = Number(localData.team_id);
            team.querySelectorAll('option')[teamId].selected = true;

            filterPositions();
        }
    }
)

fetch('https://pcfy.redberryinternship.ge/api/positions') 
.then(response => response.json()).then(data => {
    let positions = data.data;
    positionOptions = [...positions];
    filterPositions();
})

team.addEventListener('input', () => {
    filterPositions();
})

document.querySelectorAll('input').forEach(input => input.addEventListener('input', (event) => {
    localData[input.id] = input.value;
    localStorage.setItem('data', JSON.stringify(localData));
}))

document.querySelectorAll('select').forEach(select => select.addEventListener('input', (event) => {
    localData[select.id] = select.value;
    localStorage.setItem('data', JSON.stringify(localData));
}))


let form = document.querySelector('.employee-info');
const firstFormButton = form.querySelector('.button--small');

firstFormButton.addEventListener('click', (event) => {
    testForm();
    const jsonData = JSON.stringify(localData)
    if(document.querySelectorAll('.error').length === 0){
        localStorage.setItem('data', jsonData);
    }else {
        event.preventDefault();
    }
})

document.querySelector('a.main__heading').addEventListener('click', (event) => {
    testForm()
    const jsonData = JSON.stringify(localData)
    if(document.querySelectorAll('.error').length === 0){
        localStorage.setItem('data', jsonData);
    }else {
        event.preventDefault();
    }
})

const testGeorgian = ( input, object ) => {
    const georgianRegex = /^[???-???]{2,}$/;
    if(georgianRegex.test(input.value)) {
        object[input.id] = input.value;
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('succeed');

    }else{
        input.parentElement.classList.add('error');
        input.parentElement.classList.remove('succeed');
    }
}

const testSelect = ( input, object ) => {
    if(input.value != 'position' && input.value != 'team') {
        object[input.id] = +input.value;
        input.classList.remove('error');
        input.classList.add('succeed');
    }else{
        input.classList.add('error');
        input.classList.remove('succeed');
    }
}

const testMail = ( input, object ) => {
    const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(redberry\.ge)$/; 
    if(mailRegex.test(input.value)) {
        object[input.id] = input.value;
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('succeed');
    }else{
        input.parentElement.classList.add('error');
        input.parentElement.classList.remove('succeed');
    }
}

const testPhone = ( input, object ) => {
    const phone = input.value.split(' ').join('');
    let phoneRegex;
    if(input.value.startsWith('+995')){
        phoneRegex = /^[\+995][0-9]{12}$/im;
    }else {
        phoneRegex = /^[0-9]{9}$/im;
    }
    if(phoneRegex.test(phone)) {
        if(input.value.startsWith('+995')){
            object[input.id] = phone;
        }else {
            object[input.id] = '+995' + phone;
        }
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('succeed');
    }else{
        input.parentElement.classList.add('error');
        input.parentElement.classList.remove('succeed');
    }
}

const filterPositions = () => {
    document.querySelector('#position_id').disabled = false;
    position.innerHTML = '<option value="position" disabled selected hidden>?????????????????????</option>';
    const teamId = team.value;

    for(let i = 0; i < positionOptions.length; i++) {
        let option = document.createElement('option');
        option.value = positionOptions[i].id;
        option.innerText = positionOptions[i].name;
        if(positionOptions[i].team_id == teamId) {
            position.appendChild(option);
            if(positionOptions[i].id === +localData.position_id && localData.position_id) {
                option.selected = true;
            }
        }
    }

}

const testForm = () => {
    testGeorgian(firstName, localData);
    testGeorgian(lastName, localData);
    testSelect(team, localData);
    testSelect(position, localData);
    testMail(mail, localData);
    testPhone(number, localData);
    submitted = true;
}

document.querySelectorAll('input').forEach(input => input.addEventListener('input', (event) => {
    if(submitted){
        testForm();
    }
    localData[input.id] = input.value;
    localStorage.setItem('data', JSON.stringify(localData));
}))

document.querySelectorAll('select').forEach(select => select.addEventListener('input', (event) => {
    if(submitted){
        testForm();
    }
    localData[select.id] = select.value;
    localStorage.setItem('data', JSON.stringify(localData));
}))
