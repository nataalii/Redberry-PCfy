const laptopListBtn = document.querySelector('.laptop-list-btn')
const cardTemplate = document.querySelector('.card-template')
const container = document.querySelector('.container-3')

fetch("https://pcfy.redberryinternship.ge/api/laptops?token=483f0e2b69ba369ee963e7399dd26ff6").then(res => {
    return res.json()
}).then(finalData => {
    console.log(finalData)
    finalData.data.forEach(item => {
        const img = item.laptop.image
        const name = item.user.name;
        const laptopName = item.laptop.name;
        const newCard = document.importNode(cardTemplate.content, true)

        const personName = newCard.querySelector('.person-name');
        const personLaptop = newCard.querySelector('.person-laptop');
        const laptopImage = newCard.querySelector('.laptop-image')

        personName.innerText = name;
        personLaptop.innerText = laptopName;
        laptopImage.src = `https://pcfy.redberryinternship.ge${img}`;
        
        container.appendChild(newCard);
    })
}).catch(err => {
    console.log(err)
})