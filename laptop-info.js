// laptop image upload
const dropArea = document.querySelector('.drag-area')
const input = dropArea.querySelector('input');
const customBtn = dropArea.querySelector('#custom-btn');
let file;


customBtn.onclick = () =>{
    input.click()
}
input.addEventListener("change", function(event){
    file = event.dataTransfer.files[0]
    showFile();
    dropArea.classList.add('active')

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

console.log(dropArea)
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
        output += `<div onclick = show('${brand.name}')>${brand.name}</div>`
    })
    brandsDrop.innerHTML = output
}).catch(err => {
    console.log(err)
})

function show(value) {
    document.querySelector('.brandTextBox').value = value;
}


// fetch cpu api
fetch('https://pcfy.redberryinternship.ge/api/cpus').then(res => {
    return res.json()
}).then(finalData => {
    let output = ''
    finalData.data.forEach(cpu => {
        output += `<div onclick = showCpu('${cpu.name}')>${cpu.name}</div>`
        // output += `<div>${cpu.name}</div>`
    })
    cpusDrop.innerHTML = output
}).catch(err => {
    console.log(err)
})

function showCpu(value) {
    document.getElementById('laptop-cpu').value = value;
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


// laptop info form validation
//declaring variables
const form = document.querySelector('#form')
const dragAreaContent = document.querySelector('.content')
const laptopName = document.getElementById('laptop-name')
const laptopBrand = document.getElementById('laptop-brand')
const cpu = document.getElementById('cpu')
const cpuCores = document.getElementById('cpu-cores')
const cpuThreads = document.getElementById('cpu-threads')
const ram = document.getElementById('ram')
const date = document.getElementById('date')
const price = document.getElementById('price')
const newLaptop = document.getElementById('new')
const usedLaptop = document.getElementById('used')
const smallErrorImage = document.querySelector('.error-image-sm')
let regex = /^[a-z0-9!@#$%^&*()_+=]+$/i

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    validateInputs();
    if(isFormValid()== true){
        form.submit();
    } else {
        e.preventDefault();

    }

})

function isFormValid(){
    const inputContainers = form.querySelectorAll('.input-wrapper');
    let result = true
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
        // const cpuValue = cpu.value
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
        setSuccess(laptopName)
    }

    // brand validation
    if(laptopBrandValue === ''){
        setError(laptopBrand, '')
    } else {
        setSuccess(laptopBrand)
    }

    // // cpu validation
    // if(cpuValue === ''){
    //     setError(cpu, '')
    // } else {
    //     setSuccess(cpu)
    // }

    // cpu cores validation
    if(cpuCoresValue === ''){
        setError(cpuCores, 'ამ ველის შევსება სავალდებულოა!');
    } else {
        setSuccess(cpuCores);
    }

    //cpu threads validation
    if(cpuThreadsValue === ''){
        setError(cpuThreads, 'ამ ველის შევსება სავალდებულოა!');
    } else {
        setSuccess(cpuThreads);
    }

    // ram validation
    if(ramValue === ''){
        setError(ram, 'ამ ველის შევსება სავალდებულოა!');
    } else {
        setSuccess(ram);
    }
    
    // storage type validation
    const storageRadio = document.querySelector('.radio')
    var validbtn = false;
    var storageRadioBtn = document.querySelectorAll('.storage-radio')
    storageRadioBtn.forEach(radio => {
        if(radio.checked){
            validbtn = true;
        }
    }) 
    if(validbtn){
        setSuccess(storageRadio)
    } else {
        setError(storageRadio, 'მეხსიერების ტიპი')
    }  


    // laptop price validation
    if(priceValue === ''){
        setError(price, 'ამ ველის შევსება სავალდებულოა!');
    } else {
        setSuccess(price);
    }

    // laptop status validation
    const laptopStatus = document.querySelector('.laptop-radio') 
    var valid = false;
    var laptopStatusBtn = document.querySelectorAll('.radio-btn')
    laptopStatusBtn.forEach(radio => {
        if(radio.checked){
            valid = true;
        }
    }) 
    if(valid){
        setSuccess(laptopStatus)
    } else {
        setError(laptopStatus, 'ლეპტოპის მდგომარეობა')
    } 
    
    
    if(file === undefined ){
        document.querySelector('.error-image').style.display = "block";
        dragArea.style.backgroundColor = "#FFF1F1";
        dragArea.style.border = "2px dashed #E52F2F";
        
        setError(dragAreaContent, 'ჩააგდე ან ატვირთე ლეპტოპის ფოტო');
    } else{
        setSuccess(dragAreaContent)
    }


}
const setError = (element, message) => {
     const inputControl = element.parentElement;
     const errorDisplay = inputControl.querySelector('.error-message')

     errorDisplay.innerText = message
     inputControl.classList.add('error');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-message')
    errorDisplay.innerText = ''

    inputControl.classList.remove('error')
}