document.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.getElementById('createBtn');
    const readBtn = document.getElementById('readBtn');
    const updateBtn = document.getElementById('updateBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const dataDisplay = document.getElementById('dataDisplay');

    createBtn.addEventListener('click', () => {
        const name = prompt('Enter Name:');
        const value = prompt('Enter Value:');
        if (name && value) {
            fetch('/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, value })
            })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(err => console.error('Error adding entry:', err));
        }
    });

    readBtn.addEventListener('click', () => {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => {
                let html = '<h4>Data Entries:</h4><ul class="collection">';
                data.forEach(entry => {
                    html += `<li class="collection-item">
                                <strong>ID:</strong> ${entry._id} <br>
                                <strong>Name:</strong> ${entry.name} <br>
                                <strong>Value:</strong> ${entry.value}
                             </li>`;
                });
                html += '</ul>';
                dataDisplay.innerHTML = html;
            })
            .catch(err => console.error('Error fetching data:', err));
    });

    updateBtn.addEventListener('click', () => {
        const id = prompt('Enter ID of the entry to update:');
        const newValue = prompt('Enter the new value:');
        if (id && newValue) {
            fetch(`/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: newValue })
            })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(err => console.error('Error updating entry:', err));
        }
    });

    deleteBtn.addEventListener('click', () => {
        const id = prompt('Enter ID of the entry to delete:');
        if (id) {
            fetch(`/delete/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(err => console.error('Error deleting entry:', err));
        }
    });
});
