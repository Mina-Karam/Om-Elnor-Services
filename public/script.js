// public/script.js
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
      alert('User saved with ID: ' + data.id);
      document.getElementById('userForm').reset();
    })
    .catch(error => console.error('Error:', error));
  });
  
  document.getElementById('loadUsers').addEventListener('click', function() {
    fetch('/api/users')
    .then(response => response.json())
    .then(data => {
      const usersList = document.getElementById('usersList');
      usersList.innerHTML = '';
      data.users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email})`;
        usersList.appendChild(li);
      });
    })
    .catch(error => console.error('Error:', error));
  });
  