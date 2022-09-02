const laptopInfo = document.querySelector('.laptop-info');
const form = document.querySelector('#form');
const firstName = document.getElementById('name');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const phone = document.getElementById('telephone');
const btn = document.getElementById('next-btn');
const team = document.getElementById('team');
const position = document.getElementById('position');
const geoAlph = /^[ა-ჰ]+$/;
const engAlph = /^[a-zA-Z0-9@.]+$/;
const phoneNum = /^(\+?995)?(79\d{7}|5\d{8})$/


// laptopInfo.addEventListener('click', () => {
//     location.href = "laptop-info.html"
// })

// if the user refreshes a page, info will be saved
// grab inputs from local storage
firstName.addEventListener("keyup", event => {
    localStorage.setItem("name", event.target.value);
});  

lastName.addEventListener("keyup", event => {
    localStorage.setItem("surname", event.target.value);
});  
phone.addEventListener("keyup", event => {
    localStorage.setItem('phone_number', event.target.value)
})

email.addEventListener("keyup", event => {
    localStorage.setItem('email', event.target.value)
})


// set inputs to local torage
if (localStorage.name) {
    firstName.value = localStorage.name;
}

if(localStorage.surname){
    lastName.value = localStorage.surname;
}
if(localStorage.phone_number){
    phone.value = localStorage.phone_number
}

if(localStorage.email){
    email.value = localStorage.email
}
if(localStorage.team){
    team.value = localStorage.team
}

if(localStorage.position){
    position.value = localStorage.position
}

//teams api
const selectDrop = document.querySelector('.option');
const selectPos = document.querySelector('.positions-option')
let arr = []
fetch('https://pcfy.redberryinternship.ge/api/teams').then(res => {
    return res.json();
}).then(finalData => {
    let output = '';
    finalData.data.forEach(team => {
    output += `<div onclick="show('${team.name}')" class="team-drop" id="${team.id}">${team.name}</div>`
    const obj = {
            id: team.id,
            name: team.name
        }
        arr.push(obj)
    })
    selectDrop.innerHTML = output
    const teamDrop = document.querySelectorAll('.team-drop')
    teamDrop.forEach(team => {
        team.addEventListener('click', () => {
            localStorage.setItem('team_id', team.id)
        })
    })
}).catch(err => {
    console.log(err)
})


// teams and positions dropdown list
function show(value) {
    position.value = '';
    team.value = value;
    localStorage.setItem('team', value)

    arr.forEach(item => {
        if(item.name === value){
            fetch('https://pcfy.redberryinternship.ge/api/positions').then(res => {
                return res.json()
            }).then(finalData => {
                let output = ''
                const filterdArray = finalData.data.filter(position => position.team_id === item.id)
                filterdArray.forEach(position => {
                    output += `<div onclick="showPositions('${position.name}')" id=${position.id} class="position-drop">${position.name}</div>`
                })
                selectPos.innerHTML = output
                const positionDrop = document.querySelectorAll('.position-drop')
                positionDrop.forEach(position => {
                    position.addEventListener('click', () => {
                        localStorage.setItem('position_id', position.id)
                    })
                })
                
            }).catch(err => {
                console.log(err)
            })
        } 

    })


}

function showPositions(value) {
    document.querySelector('.positionTextBox').value = value;
    localStorage.setItem('position', position.value)
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
// Submitting the form
btn.addEventListener('click', (e) =>{
    validateInputs();
    if(isFormValid() == true){
        // localStorage.setItem("name", firstName.value);
        // localStorage.setItem("surname", lastName.value);
        // localStorage.setItem("phone_number", phone.value);
        // localStorage.setItem("email", email.value);
        location.href = "laptop-info.html"
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
        setSuccess(firstName, 'მინიმუმ 2 სიმბოლო, ქართული ასოები')
    }

    // lastname validation
    if(lastNameValue.length < 2){
        setError(lastName, 'გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს')
    } else if(!geoAlph.test(lastNameValue)){
        setError(lastName, 'სახელი უნდა შეიცავდეს ქართულ ასოებს')
    } else {
        setSuccess(lastName, 'მინიმუმ 2 სიმბოლო, ქართული ასოები')
    }

    // team validation
    if(teamValue === ''){
        setError(team, '')
    } else {
        setSuccess(team, '')
    }

    // position validation
    if(positionValue === ''){
        setError(position, '')
    } else {
        setSuccess(position, '')
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
        setSuccess(email, 'უნდა მთავრდებოდეს @redberry.ge-ით');
    }

    // telephone number validation
    if(!phoneNum.test(phoneValue)){
        setError(phone, 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს');
    } else {
        setSuccess(phone, 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს');
    }

    

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

