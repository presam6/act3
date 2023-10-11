document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;


    // Create and append h1 element
    const h1 = document.createElement('h1');
    h1.textContent = 'Student Information';
    body.appendChild(h1);

    // Create and append form element
    const form = document.createElement('form');
    form.id = 'studentForm';
    body.appendChild(form);

    // Form elements: ID, Name, Age
    const formElements = ['ID', 'Name', 'Age'];

    formElements.forEach(labelText => {
        const label = document.createElement('label');
        label.textContent = labelText + ': ';
        form.appendChild(label);

        const input = document.createElement('input');
        input.type = labelText === 'Age' ? 'number' : 'text';
        input.id = labelText.toLowerCase();
        input.required = true;
        form.appendChild(input);

        form.appendChild(document.createElement('br'));
    });

    // Buttons: ADD, REMOVE, EDIT, UPDATE
    const buttonNames = ['ADD', 'REMOVE', 'EDIT', 'UPDATE'];

    buttonNames.forEach(buttonText => {
        const button = document.createElement('button');
        button.type = 'button';
        button.id = buttonText.toLowerCase() + 'Button';
        button.textContent = buttonText;
        form.appendChild(button);
    });

    // Create and append table element
    const table = document.createElement('table');
    table.id = 'studentTable';
    body.appendChild(table);

    // Table headers
    const tableHeaders = ['ID', 'Name', 'Age', 'Action'];
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    tableHeaders.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table body
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);


    addButton.addEventListener('click', function () {
        const id = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;

        // Check if any of the fields are empty
        if (id.trim() === '' || name.trim() === '' || age.trim() === '') {
            alert("Please fill out all fields.");
            return;
        }

        // Check if the ID already exists in the table
        const idExists = Array.from(tbody.rows).some(row => row.cells[0].textContent === id);

        if (idExists) {
            alert("The ID you entered already exists. Please choose another ID.");
            return;
        }

        const row = tbody.insertRow();
        row.insertCell().textContent = id;
        row.insertCell().textContent = name;
        row.insertCell().textContent = age;
        row.insertCell().innerHTML = '<button onclick="editRow(this)">Edit</button>';
        clearFormFields();
    });

    function clearFormFields() {
        document.getElementById('id').value = '';
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
    }

    // Function to edit row
    window.editRow = function (button) {
        const currentRow = button.parentElement.parentElement;
        document.getElementById('id').value = currentRow.cells[0].textContent;
        document.getElementById('name').value = currentRow.cells[1].textContent;
        document.getElementById('age').value = currentRow.cells[2].textContent;

        // Hide the ADD button
        addButton.style.visibility = 'hidden';

        // Show the UPDATE button at the same spot as the ADD button
        updateButton.style.visibility = 'visible';

        updateButton.onclick = function () {
            currentRow.cells[0].textContent = document.getElementById('id').value;
            currentRow.cells[1].textContent = document.getElementById('name').value;
            currentRow.cells[2].textContent = document.getElementById('age').value;
            clearFormFields();

            // Show the ADD button again at the same spot as the UPDATE button
            addButton.style.visibility = 'visible';

            // Hide the UPDATE button
            updateButton.style.visibility = 'hidden';
        };
    };

    // Functionality for REMOVE button
    const removeButton = document.getElementById('removeButton');
    removeButton.addEventListener('click', function () {
        const idToRemove = document.getElementById('id').value;
        let rowToRemove = null;
        for (let i = 0; i < tbody.rows.length; i++) {
            if (tbody.rows[i].cells[0].textContent === idToRemove) {
                rowToRemove = tbody.rows[i];
                break;
            }
        }

        if (rowToRemove !== null) {
            tbody.removeChild(rowToRemove);
            clearFormFields();

            // Show the ADD button when the table is updated
            addButton.style.visibility = 'visible';
            // Hide the UPDATE button
            updateButton.style.visibility = 'hidden';
        } else {
            alert("Student with the provided ID is nowhere to be found.");
        }
    });
});
