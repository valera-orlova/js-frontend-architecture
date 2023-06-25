// BEGIN
export default (notebooks) => {

    function showNotebooks (notebooks) {
        const resultListOfNotebooks = document.querySelector('.result');
        resultListOfNotebooks.innerHTML = '';
        if (notebooks.length !== 0) {
            const ulNotebooks = document.createElement('ul');
            ulNotebooks.classList.add('list-group');

            notebooks.forEach(notebook => {
                const liNotebook = document.createElement('li');
                liNotebook.classList.add('list-group-item');
                liNotebook.innerHTML = notebook.model;
                ulNotebooks.append(liNotebook);
            });

            
            resultListOfNotebooks.append(ulNotebooks);
        }
    }
    showNotebooks(notebooks);

    

    function filterNotebooks() {
        const procFilter = document.querySelector('[name="processor_eq"]').value;
        const memFilter = document.querySelector('[name="memory_eq"]').value;
        const minFreqFilter = document.querySelector('[name="frequency_gte"]').value;
        const maxFreqFilter = document.querySelector('[name="frequency_lte"]').value;

        const notebooksToShow = notebooks.filter(notebook => {
            return (
                (procFilter === '' || notebook.processor === procFilter) &&
                (memFilter === '' || notebook.memory === Number(memFilter)) &&
                (minFreqFilter === '' || notebook.frequency >= Number(minFreqFilter)) &&
                (maxFreqFilter === '' || notebook.frequency <= Number(maxFreqFilter))
            )
        })

        showNotebooks(notebooksToShow);
    }

    document.querySelectorAll('select').forEach(element => {
        element.addEventListener('change', () => {
            filterNotebooks();
        })
    })
    document.querySelectorAll('input').forEach(element => {
        element.addEventListener('input', () => {
            filterNotebooks();
        })
    })
}
// END