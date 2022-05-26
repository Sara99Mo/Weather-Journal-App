// Show Form To Enter Zip Code 
const zip = document.getElementById('userInfo');
zip.addEventListener('click' , zipBodyShow);

function zipBodyShow(e) {
    e.preventDefault();

    const zipBody = document.querySelector('.userInfo');
    const zipValue = zip.getAttribute('aria-expanded');

    if(zipValue === "true") {
        zip.setAttribute('aria-expanded' ,false);
        zipBody.classList.remove('show');
    }else {
        zip.setAttribute('aria-expanded' ,true);
        zipBody.classList.add('show');
    }
}

// Show Form To Enter Name City  
const nameF = document.getElementById('countryInfo');
nameF.addEventListener('click' , nameFBodyShow);

function nameFBodyShow(e) {
    e.preventDefault();

    const nameFBody = document.querySelector('.countryInfo');
    const nameFValue = nameF.getAttribute('aria-expanded');

    if(nameFValue === "true") {
        nameF.setAttribute('aria-expanded' ,false);
        nameFBody.classList.remove('show');
    }else {
        nameF.setAttribute('aria-expanded' ,true);
        nameFBody.classList.add('show');
    }
}