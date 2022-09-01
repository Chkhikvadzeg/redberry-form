const localData = JSON.parse(localStorage.getItem('data'));

let laptopPhoto = document.querySelector('#laptop_image');
let laptopName = document.querySelector('#laptop_name');
let laptopBrand = document.querySelector('#laptop_brand_id');
let cpu = document.querySelector('#laptop_cpu');
let cpuCore = document.querySelector('#laptop_cpu_cores');
let cpuThread = document.querySelector('#laptop_cpu_threads');
let date = document.querySelector('#laptop_purchase_date');
let ram = document.querySelector('#laptop_ram');
let laptopPrice = document.querySelector('#laptop_price');
let submitted = false;

let teamOptions = [];

if(localData?.laptop_name) {
    laptopName.value = localData.laptop_name;
}

if(localData?.laptop_cpu) {
    cpu.value = localData.laptop_cpu;
}

if(localData?.laptop_cpu_cores) {
    cpuCore.value = localData.laptop_cpu_cores;
}

if(localData?.laptop_cpu_threads) {
    cpuThread.value = localData.laptop_cpu_threads;
}

if(localData?.laptop_ram) {
    ram.value = localData.laptop_ram;
}

if(localData?.laptop_price) {
    laptopPrice.value = localData.laptop_price;
}

if(localData?.laptop_hard_drive_type){
    const hardDriveType = document.querySelector(`input[value="${localData.laptop_hard_drive_type}"]`);
    hardDriveType.checked = true;
}

if(localData?.laptop_state){
    const laptopState = document.querySelector(`input[value="${localData.laptop_state}"]`);
    laptopState.checked = true;
}

if(localData?.laptop_purchase_date){
    date.value = localData.laptop_purchase_date;
}

fetch('https://pcfy.redberryinternship.ge/api/brands')
.then(response => response.json()).then(data => {
    let brands = data.data;
    for(let i = 0; i < brands.length; i++) {
        let option = document.createElement('option');
        option.value = brands[i].id;
        option.innerText = brands[i].name;
        laptopBrand.appendChild(option);
    }
    if(localData?.laptop_brand_id) {
        const laptopBrandId = Number(localData.laptop_brand_id);
        laptopBrand.querySelector(`option[value="${laptopBrandId}"]`).selected = true;
    }
}
)

fetch('https://pcfy.redberryinternship.ge/api/cpus')
.then(response => response.json()).then(data => {
    let cpus = data.data;
    for(let i = 0; i < cpus.length; i++) {
        let option = document.createElement('option');
        option.value = cpus[i].id;
        option.innerText = cpus[i].name;
        cpu.appendChild(option);
    }
    if(localData?.laptop_cpu) {
        const laptopCpu = Number(localData.laptop_cpu);
        if(cpu.querySelector(`option[value="${laptopCpu}"]`)){
            cpu.querySelector(`option[value="${laptopCpu}"]`).selected = true;
        }
    }
}
)


date.addEventListener('focus', (event) => {
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

date.addEventListener('blur', (event) => {
if(event.target.value === '') {
    event.target.type = 'text';        
}

})

const submitButton = document.querySelectorAll('.laptop-info .button--small')[1];

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    testForm();

    submitted = true;
    const errorClasses = document.querySelectorAll('.error');

    if(errorClasses.length === 0) {
        const formData = new FormData();
        formData.append('name', localData.name);
        formData.append('surname', localData.surname);
        formData.append('email', localData.email);
        formData.append('phone_number', localData.phone_number);
        formData.append('team_id', +localData.team_id);
        formData.append('position_id', +localData.position_id);
        formData.append('laptop_name', localData.laptop_name);
        formData.append('laptop_brand_id', +localData.laptop_brand_id);
        formData.append('laptop_cpu', localData.laptop_cpu);
        formData.append('laptop_cpu_cores', +localData.laptop_cpu_cores);
        formData.append('laptop_cpu_threads', +localData.laptop_cpu_threads);
        formData.append('laptop_ram', +localData.laptop_ram);
        formData.append('laptop_price', +localData.laptop_price);
        formData.append('laptop_hard_drive_type', localData.laptop_hard_drive_type);
        formData.append('laptop_state', localData.laptop_state);
        if(localData.laptop_purchase_date) {
            formData.append('laptop_purchase_date', localData.laptop_purchase_date);
        }
        formData.append('laptop_image', localData.laptop_image);
        formData.append('token', '0fd6fd8a505704d77b82ddb480f22750');
        fetch('https://pcfy.redberryinternship.ge/api/laptop/create', {
            method: 'POST',
            body: formData
        })
        localStorage.removeItem('data');
        window.location.href = '../popup/success.html';
    }

})

const testLatin = (input, object) => {
    let latinRegex = /^[a-zA-Z0-9_.-\s]+$/;
    if(latinRegex.test(input.value)) {
        object[input.id] = input.value;
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('succeed');
    }else {
        input.parentElement.classList.add('error');
        input.parentElement.classList.remove('succeed');
    }
}

const testSelect = ( input, object, name ) => {
    if(input.value != 'laptop-brand' && input.value != 'cpu') {
        if(name) {
            object[input.id] = input.options[input.selectedIndex].text;
        }else {
            object[input.id] = +input.value;
        }
        input.classList.remove('error');
        input.classList.add('succeed');
    }else{
        input.classList.add('error');
        input.classList.remove('succeed');
    }
}

const testNumber = (input, object) => {
    const numberRegex = /^[0-9]+$/;
    if(numberRegex.test(input.value)) {
        object[input.id] = +input.value;
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('succeed');
    }else {
        input.parentElement.classList.add('error');
        input.parentElement.classList.remove('succeed');
    }
}


const testRadio = (parentElementName, object) => {
    const elements = document.querySelectorAll(`.${parentElementName} input`);
    elements.forEach(input => {
        if(input.checked) {
            const name = input.parentElement.parentElement.classList[1];
            object[name] = input.value;
        }
        if(!elements[0].checked && !elements[1].checked){
            elements[0].parentElement.closest('.form-input-radio').classList.add('error');
            elements[0].parentElement.closest('.form-input-radio').classList.remove('succeed');
        }else {
            elements[0].parentElement.closest('.form-input-radio').classList.remove('error');
            elements[0].parentElement.closest('.form-input-radio').classList.add('succeed');
        }
    })
}

const testPhoto = (input, object) => {
    if(object.laptop_image) {
        object[laptop_image] = input.files[0];
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('succeed');
    }else {
        input.parentElement.classList.add('error');
        input.parentElement.classList.remove('succeed');
    }
}

const testForm = () => {
    testLatin(laptopName, localData);
    testSelect(laptopBrand, localData);
    testSelect(cpu, localData, "name");
    testNumber(cpuCore, localData);
    testNumber(cpuThread, localData);
    testNumber(ram, localData);
    testNumber(laptopPrice, localData);
    testRadio('laptop_state', localData);
    testRadio('laptop_hard_drive_type', localData);
    testPhoto(laptopPhoto, localData);

}

document.querySelectorAll('input:not([type="radio"]):not(#laptop_purchase_date)').forEach(input => input.addEventListener('input', (event) => {
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

document.querySelectorAll('input[type="radio"]').forEach(radio => radio.addEventListener('change', (event) => {
    if(submitted){
        testForm();
    }
    const name = radio.parentElement.parentElement.classList[1];
    localData[name] = radio.value;
    localStorage.setItem('data', JSON.stringify(localData));
}))


laptopPhoto.addEventListener('change', (event) => {
    laptopPhoto.parentElement.classList.remove('error');
    localData.laptop_image = event.target.files[0];
    laptopPhoto.parentElement.style.backgroundImage = `url(${URL.createObjectURL(event.target.files[0])})`;
    laptopPhoto.parentElement.classList.add('succeed');
    laptopPhoto.parentElement.querySelectorAll('span').forEach(span => span.style.display = 'none');
})

laptopPhoto.parentElement.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    laptopPhoto.parentElement.classList.add('dragover');
 });

 laptopPhoto.parentElement.addEventListener('dragleave', (event) => {
    event.stopPropagation();
    event.preventDefault();
    laptopPhoto.parentElement.classList.remove('dragover');
 });

 laptopPhoto.parentElement.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    laptopPhoto.parentElement.classList.remove('error');
    laptopPhoto.parentElement.classList.remove('dragover');
    laptopPhoto.parentElement.style.backgroundImage = `url(${URL.createObjectURL(event.dataTransfer.files[0])})`;
    localData.laptop_image = event.dataTransfer.files[0];
    laptopPhoto.parentElement.classList.add('succeed');
    laptopPhoto.parentElement.querySelectorAll('span').forEach(span => span.style.display = 'none');
 });
