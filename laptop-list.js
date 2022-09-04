const laptopListBtn = document.querySelector('.laptop-list-btn')
const cardTemplate = document.querySelector('.card-template')
const container = document.querySelector('.container-3')

fetch("https://pcfy.redberryinternship.ge/api/laptops?token=483f0e2b69ba369ee963e7399dd26ff6").then(res => {
    return res.json()
}).then(finalData => {
    console.log(finalData)
    finalData.data.forEach(item => {
        // creating individual cards for every data;
        const img = item.laptop.image
        const name = item.user.name;
        const surname = item.user.surname;
        const laptopName = item.laptop.name;
        const laptopId = item.laptop.id

        const newCard = document.importNode(cardTemplate.content, true)

        const personName = newCard.querySelector('.person-name');
        const personLaptop = newCard.querySelector('.person-laptop');
        const laptopImage = newCard.querySelector('.laptop-image');
        const seeMore = newCard.querySelector('.see-more')
    
        personName.innerText = name + ' ' + surname;
        personLaptop.innerText = laptopName;
        laptopImage.src = `https://pcfy.redberryinternship.ge${img}`;
        seeMore.id = laptopId;

        container.appendChild(newCard);

        // see more info about laptops
        seeMore.addEventListener('click', seeMoreInfo)
        function seeMoreInfo(e) {
            e.preventDefault()
            const dataId = e.target.id
            fetch(`https://pcfy.redberryinternship.ge/api/laptop/${dataId}?token=483f0e2b69ba369ee963e7399dd26ff6`).then(res =>{
                return res.json();
            }).then(finalData => {
                location.href = `more-laptop-info.html?laptopid=${dataId}`;
            })
        }
    })

}).catch(err => {
    console.log(err)
})