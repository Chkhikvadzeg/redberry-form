const list = document.querySelector('.list');

fetch('https://pcfy.redberryinternship.ge/api/laptops?token=0fd6fd8a505704d77b82ddb480f22750').then(response => response.json()).then(data => {
    const laptops = data.data;
    laptops.forEach(laptop => {
        const laptopImageSrc = 'https://pcfy.redberryinternship.ge/' + laptop.laptop.image;
        const authorFullName = laptop.user.name + ' ' + laptop.user.surname;
        const laptopBrand = laptop.laptop.name;
        const listItem = createListItem(laptopImageSrc, authorFullName, laptopBrand);
        list.append(listItem);
    })
})

const createHtmlElement = (element, className, text, src, href) => {
    const el = document.createElement(element);
    if(className){
        el.classList.add(className);
    }
    if(text) {
        el.innerText = text;
    }
    if(src) {
        el.src = src;
    }
    if(href) {
        el.href = href;
    }
    return el;
}

const createListItem = (imageSrc, authorFullName, laptopBrand) => {
    const listItem = createHtmlElement('li', 'list__item');
    const laptopImageDiv = createHtmlElement('div', 'list__item-img');
    const laptopImage = createHtmlElement('img', null, null, imageSrc);
    const laptopInfo = createHtmlElement('div', 'list__item-info');
    const author = createHtmlElement('span', 'list__item-author', authorFullName);
    const laptopModel = createHtmlElement('h4', 'list__item-name', laptopBrand);
    const link = createHtmlElement('a', 'list__item-link', 'მეტის ნახვა', null, '#');

    listItem.append(laptopImageDiv, laptopInfo);
    laptopImageDiv.append(laptopImage);
    laptopInfo.append(author, laptopModel, link);
    
    return listItem;
}
