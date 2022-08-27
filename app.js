//this button returns staff info page to the home page
const backBtn = document.getElementById('back-btn')
const addItemBtn = document.querySelector('#add-item-btn')
backBtn.onclick = function() {
    location.href = '../index.html'
}

addItemBtn.onclick = function(){
    location.href = '../pages/staff-info.html'
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
    document.querySelector('.positionTextBox').value = 'პოზიცია';
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
