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