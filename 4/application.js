// BEGIN
export default (arrayCompany) => {
    const container = document.querySelector('.container');
    arrayCompany.forEach(company => {
        const companyBtn = document.createElement('button');
        companyBtn.classList.add('btn', 'btn-primary');
        companyBtn.textContent = company.name;
        container.appendChild(companyBtn);
        companyBtn.addEventListener('click', () => {
            const descriptionOfButton = container.querySelector('div');
            if (descriptionOfButton) {
                descriptionOfButton.remove();
            } 
            if (companyBtn.classList.contains('active')) {
                companyBtn.classList.remove('active');
            } else {
                const newCompanyDescription = document.createElement('div');
                newCompanyDescription.textContent = company.description;
                container.appendChild(newCompanyDescription);
                companyBtn.classList.add('active')
            }
        })
    })
}
// END