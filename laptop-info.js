//declaring variables
const form = document.querySelector('#form')
const dragAreaContent = document.querySelector('.content')
const laptopName = document.getElementById('laptop-name')
const laptopBrand = document.getElementById('laptop-brand')
const cpu = document.getElementById('laptop-cpu')
const cpuCores = document.getElementById('cpu-cores')
const cpuThreads = document.getElementById('cpu-threads')
const ram = document.getElementById('ram')
const date = document.getElementById('date')
const price = document.getElementById('price')
const newLaptop = document.getElementById('new')
const usedLaptop = document.getElementById('used')
const smallErrorImage = document.querySelector('.error-image-sm')
const modal = document.getElementById("myModal");
const laptopStatus = document.querySelector('.laptop-radio') 
const storageRadio = document.querySelector('.radio')
const storageRadioBtn = document.querySelectorAll('.storage-radio')
const laptopStatusBtn = document.querySelectorAll('.radio-btn')
const storageRadioLabel = document.querySelectorAll('.storage-radio-label')
const stateRadioLabel = document.querySelectorAll('.state-radio-label')
let regex = /^[a-z0-9!@#$%^&*()_+=]+$/i

// laptop image upload
const dropArea = document.querySelector('.drag-area')
const input = dropArea.querySelector('input');
const customBtn = dropArea.querySelector('#custom-btn');
let file;

customBtn.onclick = () =>{
    input.click()
}

input.addEventListener("change", function(event){
    file = event.target.files[0]
    showFile();
    dropArea.classList.add('active');
    console.log(file)

})

// when user drags file over DropArea
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault()
    dropArea.classList.add('active')
})

// when user leaves dragged File from DropArea
dropArea.addEventListener('dragleave', ()=> {
    dropArea.classList.remove('active')
})

// when user drops File on DropArea
dropArea.addEventListener('drop', (event)=> {
    event.preventDefault()
    file = event.dataTransfer.files[0]
    showFile()

})

function showFile(){
    let filetype = file.type;

    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    if(validExtensions.includes(filetype)){
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imageTag = `<img src="${fileURL}" alt="image">`
            dropArea.innerHTML = imageTag
        } 
        fileReader.readAsDataURL(file)
        dragArea.style.backgroundColor = "#F6F6F6";
        dragArea.style.border = "2px dashed #8AC0E2";

    } else {
        alert('ატვირთეთ მხოლოდ ფოტო!')
        dropArea.classList.remove('active')
    }
}


// fetch laptop brands api
const brandsDrop = document.querySelector('.brand-option')
const cpusDrop = document.querySelector('.cpu-option')

fetch('https://pcfy.redberryinternship.ge/api/brands').then(res => {
    return res.json()
}).then(finalData => {
    let output = ''
    finalData.data.forEach(brand => {
        output += `<div onclick = show('${brand.name}') id="${brand.id}" class='brand-name'>${brand.name}</div>`
    })
    brandsDrop.innerHTML = output
    const brandName = document.querySelectorAll('.brand-name')
    brandName.forEach(brand => {
        brand.addEventListener('click', () => {
            localStorage.setItem("laptop_brand_id", brand.id)
        })
    })

}).catch(err => {
    console.log(err)
})

function show(value) {
    document.querySelector('.brandTextBox').value = value;
    localStorage.setItem("laptop_brand", laptopBrand.value);

}


// fetch cpu api
fetch('https://pcfy.redberryinternship.ge/api/cpus').then(res => {
    return res.json()
}).then(finalData => {
    let output = ''
    finalData.data.forEach(cpu => {
        output += `<div onclick="showCpu('${cpu.name}')">${cpu.name}</div>`
    })
    cpusDrop.innerHTML = output
}).catch(err => {
    console.log(err)
})

function showCpu(value) {
    document.getElementById('laptop-cpu').value = value;
    localStorage.setItem('laptop_cpu', cpu.value )
}


// adding active class to the dropdowns by clicking on brandsDropdown and cpusDropdown
//(in order to change display of the dropdown)
const brandsDropdown = document.querySelector('.laptop-brand-dropdown')
const cpusDropdown = document.querySelector('.cpu-dropdown')

brandsDropdown.onclick = function() {
    brandsDropdown.classList.toggle('active')
}

cpusDropdown.onclick = function() {
    cpusDropdown.classList.toggle('active')
}


// grab inputs from local storage
laptopName.addEventListener("keyup", event => {
    localStorage.setItem("laptop_name", event.target.value);
});  

cpuCores.addEventListener("keyup", event => {
    localStorage.setItem('laptop_cpu_cores', event.target.value)
})

cpuThreads.addEventListener("keyup", event => {
    localStorage.setItem('laptop_cpu_threads', event.target.value)
})

ram.addEventListener("keyup", event => {
    localStorage.setItem('laptop_ram', event.target.value)
})

price.addEventListener("keyup", event => {
    localStorage.setItem('laptop_price', event.target.value)
})

storageRadioLabel.forEach(option => {
    option.addEventListener("click", () => {
        localStorage.setItem("laptop_hard_drive_type", option.querySelector("input").id)
    })
})

stateRadioLabel.forEach(option => {
    option.addEventListener('click', () => {
        localStorage.setItem('laptop_state', option.querySelector("input").id)
    } )
})

// set inputs to local storage
// stay the same value after refresh
if (localStorage.laptop_name) {
    laptopName.value = localStorage.laptop_name;
}
if(localStorage.laptop_brand){
    laptopBrand.value = localStorage.laptop_brand
}

if(localStorage.laptop_cpu){
    cpu.value = localStorage.laptop_cpu
}

if(localStorage.laptop_cpu_cores){
    cpuCores.value = localStorage.laptop_cpu_cores
}

if(localStorage.laptop_cpu_threads){
    cpuThreads.value = localStorage.laptop_cpu_threads
}
if(localStorage.laptop_ram){
    ram.value = localStorage.laptop_ram
}
if(localStorage.laptop_purchase_date){
    date.value = localStorage.laptop_purchase_date
}
if(localStorage.laptop_price){
    price.value = localStorage.laptop_price
}

if(localStorage.laptop_state){
    const id = localStorage.laptop_state
    const option = document.getElementById(id).parentElement
    option.querySelector("input").checked = true;
}

if(localStorage.laptop_hard_drive_type){
    const id = localStorage.laptop_hard_drive_type;
    const option = document.getElementById(id).parentElement
    option.querySelector("input").checked = true;
}

        
// laptop info form validation
form.addEventListener('submit', (e) =>{
    validateInputs();

    if(isFormValid()){
       
        
        // When the user submit the form, open the modal 
        modal.style.display = "block";
        
        form.submit();
    } else {
        e.preventDefault();

    }



})

function isFormValid(){
    const inputContainers = form.querySelectorAll('.input-wrapper');
    let result = true;
    inputContainers.forEach((container) => {
        if(container.classList.contains('error')){
            result = false;
        }
    })

    return result;
}

const dragArea = document.querySelector('.drag-area');
const validateInputs = () => {
    const laptopNameValue = laptopName.value.trim();
    const laptopBrandValue = laptopBrand.value;
    const cpuValue = cpu.value
    const cpuCoresValue = cpuCores.value.trim();
    const cpuThreadsValue = cpuThreads.value.trim();
    const ramValue = ram.value.trim();
    const priceValue = price.value.trim();

    // laptop name validation
    if(laptopNameValue.length === 0){
        setError(laptopName, 'ლეპტოპის სახელის შეყვანა სავალდებულოა')
    } else if(!regex.test(laptopNameValue)){
        setError(laptopName, 'შეიყვანეთ მხოლოდ ლათინური ასოები, ციფრები, !@#$%^&*()_+=')
    } else {
        setSuccess(laptopName, 'ლათინური ასოები, ციფრები, !@#$%^&*()_+=')
    }

    // brand validation
    if(laptopBrandValue === ''){
        setError(laptopBrand, '')
    } else {
        setSuccess(laptopBrand, '')
    }

    // cpu validation
    if(cpuValue === ''){
        setError(cpu, '')
    } else {
        setSuccess(cpu, '')
    }

    // cpu cores validation
    if(cpuCoresValue === ''){
        setError(cpuCores, 'ამ ველის შევსება სავალდებულოა!');
    } else {
        setSuccess(cpuCores, 'მხოლოდ ციფრები');
    }

    //cpu threads validation
    if(cpuThreadsValue === ''){
        setError(cpuThreads, 'ამ ველის შევსება სავალდებულოა!');
    } else {
        setSuccess(cpuThreads, 'მხოლოდ ციფრები');
    }

    // ram validation
    if(ramValue === ''){
        setError(ram, 'ამ ველის შევსება სავალდებულოა!');
    } else {
        setSuccess(ram, 'მხოლოდ ციფრები');
    }
    
    // storage type validation
    if(checkRadios(storageRadioBtn)){
        setSuccess(storageRadio, 'მეხსიერების ტიპი');
    } else {
        setError(storageRadio, 'მეხსიერების ტიპი')
    } 

    // laptop price validation
    if(priceValue === ''){
        setError(price, 'ამ ველის შევსება სავალდებულოა!');
    } else {
        setSuccess(price, 'მხოლოდ ციფრები');
    }

    // laptop status validation
    if(checkRadios(laptopStatusBtn)){
        setSuccess(laptopStatus, 'ლეპტოპის მდგომარეობა');
    } else {
        setError(laptopStatus, 'ლეპტოპის მდგომარეობა')
    } 
    
    
    if(file === undefined ){
        document.querySelector('.error-image').style.display = "block";
        dragArea.style.backgroundColor = "#FFF1F1";
        dragArea.style.border = "2px dashed #E52F2F";
        
        setError(dragAreaContent, 'ჩააგდე ან ატვირთე ლეპტოპის ფოტო');
    } else{
        setSuccess(dragAreaContent, '')
    }
    
    localStorage.setItem('laptop_purchase_date', date.value)

}

function checkRadios(radios) {
    checked = false;
    radios.forEach(radio => {
        if(radio.checked){
            checked = true
        }   
    })
    return checked
}

const setError = (element, message) => {
     const inputControl = element.parentElement;
     const errorDisplay = inputControl.querySelector('.error-message')

     errorDisplay.innerText = message
     inputControl.classList.add('error');
}

const setSuccess = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-message')
    errorDisplay.innerText = message

    inputControl.classList.remove('error')
}

