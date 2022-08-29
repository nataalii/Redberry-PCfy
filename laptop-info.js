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


// //teams api
// const selectDrop = document.querySelector('.option');
// const selectPos = document.querySelector('.positions-option')
// let arr = []
// fetch('https://pcfy.redberryinternship.ge/api/teams').then(res => {
//     return res.json();
// }).then(finalData => {
//     let output = '';
//     finalData.data.forEach(team => {
//         output += `<div onclick="show('${team.name}')">${team.name}</div>`
//         const obj = {
//             id: team.id,
//             name: team.name
//         }
//         arr.push(obj)
//     })
//     selectDrop.innerHTML = output
// }).catch(err => {
//     console.log(err)
// })


// // teams and positions dropdown list

// function show(value) {
//     document.querySelector('.positionTextBox').value = '';
//     document.querySelector('.textBox').value = value

//     arr.forEach(item => {
//         if(item.name === value){
//             fetch('https://pcfy.redberryinternship.ge/api/positions').then(res => {
//                 return res.json()
//             }).then(finalData => {
//                 let output = ''
//                 const filterdArray = finalData.data.filter(position => position.team_id === item.id)
//                 filterdArray.forEach(position => {
//                     output += `<div onclick="showPositions('${position.name}')">${position.name}</div>`
//                 })
//                 selectPos.innerHTML = output
                
//             }).catch(err => {
//                 console.log(err)
//             })
//         } 

//     })


// }

// function showPositions(value) {
//     document.querySelector('.positionTextBox').value = value;
// }




// let teamsDropdown = document.querySelector('.teams-dropdown')
// let positionsDropdown = document.querySelector('.positions-dropdown')

// teamsDropdown.onclick = function() {
//     teamsDropdown.classList.toggle('active')
// }

// positionsDropdown.onclick = function() {
//     positionsDropdown.classList.toggle('active')
// }
