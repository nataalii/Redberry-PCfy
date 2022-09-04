const block1 = document.querySelector('.block-1');
const block2 = document.querySelector('.block-2');
const block3 = document.querySelector('.block-3');
const block4 = document.querySelector('.block-4');
const block5 = document.querySelector('.block-5');
const laptopImage = document.querySelector('.laptop-image')

const params = new URLSearchParams(location.search)
const param = params.get("laptopid")

fetch(`https://pcfy.redberryinternship.ge/api/laptop/${param}?token=483f0e2b69ba369ee963e7399dd26ff6`).then(res => {
    return res.json();
}).then(finalData => {
    const laptop = finalData.data.laptop;
    const person = finalData.data.user;
    const cpu = finalData.data.laptop.cpu;
    let team;
    let position;
    let brand;

    const getInfo = async () => {
        await fetch('https://pcfy.redberryinternship.ge/api/teams')
        .then(result => result.json())
        .then(finalData => {
            const teams = finalData.data.filter(item => item.id === person.team_id);
            team = teams[0].name;
        });

        await fetch('https://pcfy.redberryinternship.ge/api/positions')
        .then(result => result.json())
        .then(finalData => {
            const positions = finalData.data.filter(position => position.id === person.position_id);
            position = positions[0].name;
        });
        
        await fetch('https://pcfy.redberryinternship.ge/api/brands')
        .then(result => result.json())
        .then(finalData => {
            console.log(finalData)
            const brands = finalData.data.filter(brand => brand.id === laptop.brand_id);
            brand = brands[0].name;
        });

        // userinfo
        const block1Value = `
            <p>${person.name + ' ' + person.surname}</p>            
            <p>${team}</p>
            <p>${position}</p>
            <p>${person.email}</p>
            <p>${person.phone_number}</p>
        `
        block1.innerHTML = block1Value;
    
        // laptop info
        const block2Value = `
            <p>${laptop.name}</p>
            <p>${brand}</p>
            <p>${laptop.ram}</p>
            <p>${laptop.hard_drive_type}</p>
        `
        block2.innerHTML = block2Value;

    
    };
    getInfo();

    laptopImage.src = `https://pcfy.redberryinternship.ge${laptop.image}`;

    //laptop cpu info
    Object.entries(cpu).forEach(data => {
        const [key, value] = data;
        block3.innerHTML += `<p>${value}</p>`;
    })

    //additional info
    if(laptop.state === 'new'){
        laptop.state = 'ახალი'
    } else {
        laptop.state === 'მეორადი'
    }
    const block4Value = `
        <p>${laptop.state}</p>
        <p>${laptop.price} ₾</p>
    `
    block4.innerHTML = block4Value;
    block5.innerHTML = `<p>${(laptop.purchase_date).replaceAll('-', ' / ')}</p>`


})