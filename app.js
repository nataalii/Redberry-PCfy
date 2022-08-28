//teams api
const selectDrop = document.querySelector('.option');
const selectPos = document.querySelector('.positions-option')
let arr = []
fetch('https://pcfy.redberryinternship.ge/api/teams').then(res => {
    return res.json();
}).then(finalData => {
    let output = '';
    finalData.data.forEach(team => {
        output += `<div onclick="show('${team.name}')">${team.name}</div>`
        const obj = {
            id: team.id,
            name: team.name
        }
        arr.push(obj)
    })
    selectDrop.innerHTML = output
}).catch(err => {
    console.log(err)
})


// teams and positions dropdown list

function show(value) {
    document.querySelector('.positionTextBox').value = '';
    document.querySelector('.textBox').value = value

    arr.forEach(item => {
        if(item.name === value){
            fetch('https://pcfy.redberryinternship.ge/api/positions').then(res => {
                return res.json()
            }).then(finalData => {
                let output = ''
                const filterdArray = finalData.data.filter(position => position.team_id === item.id)
                filterdArray.forEach(position => {
                    output += `<div onclick="showPositions('${position.name}')">${position.name}</div>`
                })
                selectPos.innerHTML = output
                
            }).catch(err => {
                console.log(err)
            })
        } 

    })


}

function showPositions(value) {
    document.querySelector('.positionTextBox').value = value;
}




let teamsDropdown = document.querySelector('.teams-dropdown')
let positionsDropdown = document.querySelector('.positions-dropdown')

teamsDropdown.onclick = function() {
    teamsDropdown.classList.toggle('active')
}

positionsDropdown.onclick = function() {
    positionsDropdown.classList.toggle('active')
}


// staff info form validation
const form = document.querySelector('#form')
const firstName = document.getElementById('name')
const lastName = document.getElementById('lastname')
const email = document.getElementById('email')
const phone = document.getElementById('telephone')
const btn = document.getElementById('next-btn')
const team = document.getElementById('team')
const position = document.getElementById('position')
const geoAlph = /^[ა-ჰ]+$/;
const engAlph = /^[a-zA-Z0-9@.]+$/;
const phoneNum = /^(\+?995)?(79\d{7}|5\d{8})$/


form.addEventListener('submit', (e) =>{
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

const validateInputs = () => {
    const firstNameValue = firstName.value.trim()
    const lastNameValue = lastName.value.trim()
    const teamValue = team.value
    const positionValue = position.value
    const emailValue = email.value.trim()
    const phoneValue = phone.value.trim()

    // firstname validation
    if(firstNameValue.length < 2){
        setError(firstName, 'სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს')
    } else if(!geoAlph.test(firstNameValue)){
        setError(firstName, 'სახელი უნდა შეიცავდეს ქართულ ასოებს')
    } else {
        setSuccess(firstName)
    }

    // lastname validation
    if(lastNameValue.length < 2){
        setError(lastName, 'გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს')
    } else if(!geoAlph.test(lastNameValue)){
        setError(lastName, 'სახელი უნდა შეიცავდეს ქართულ ასოებს')
    } else {
        setSuccess(lastName)
    }

    // team validation
    if(teamValue === ''){
        setError(team, '')
    } else {
        setSuccess(team)
    }

    // position validation
    if(positionValue === ''){
        setError(position, '')
    } else {
        setSuccess(position)
    }

    // email validation
    if(emailValue === ''){
        setError(email, 'მეილის შეყვანა სავალდებულოა');
    } else if((emailValue.endsWith("@redberry.ge") && emailValue.length === 12) ||
       !engAlph.test(emailValue) ){
        setError(email, 'შეიყვანეთ მეილი სწორი ფორმატით')
    } else if(!emailValue.endsWith("@redberry.ge")) {
        setError(email, 'მეილი უნდა მთავრდებოდეს @redberry.ge-ით');
    } else {
        setSuccess(email);
    }

    // telephone number validation
    if(!phoneNum.test(phoneValue)){
        setError(phone, 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს');
    } else {
        setSuccess(phone);
    }

    

}
const setError = (element, message) => {
     const inputControl = element.parentElement;
     const errorDisplay = inputControl.querySelector('.error-message')

     errorDisplay.innerText = message
     inputControl.classList.add('error');
    //  inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-message')
    errorDisplay.innerText = ''
    // inputControl.classList.add('success');
    inputControl.classList.remove('error')
}

