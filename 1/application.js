// BEGIN
const calculator = () => {
    let numberOne = 0;
    let form = document.querySelector('form');
    document.querySelector('[type="number"]').focus();
    let reset = document.querySelector('button')
    let numberTwo = document.querySelector('[type="number"]');
    let resultat = document.querySelector('#result');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        numberOne += +numberTwo.value;
        resultat.innerHTML = numberOne;
        numberTwo.value = '';
        numberTwo.focus();
    })
    reset.addEventListener('click', (event) => {
        event.preventDefault();
        numberTwo.value = '';
        numberTwo.focus();
        numberOne = 0;
        resultat.innerHTML = 0;
    })

}

export default calculator;
// END