// Data user contoh
let users = JSON.parse(localStorage.getItem('users')) || [
  {
    id: 1,
    name: 'Admin Utama',
    email: 'admin@outdoorkw.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-20 10:30:00'
  },
  {
    id: 2,
    name: 'User Test',
    email: 'user@outdoorkw.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-03-19 15:45:00'
  }
];

// Simpan data ke localStorage
function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

// Tampilkan semua user
function displayUsers() {
  const userBody = document.getElementById('userBody');
  const searchInput = document.getElementById('searchUser').value.toLowerCase();
  const statusFilter = document.getElementById('statusFilter').value;
  
  userBody.innerHTML = '';
  
  let filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchInput) || 
                         user.email.toLowerCase().includes(searchInput);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  filteredUsers.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td><span class="user-status status-${user.status}">${getStatusText(user.status)}</span></td>
      <td>${user.lastLogin}</td>
      <td>
        <button class="btn btn-info" onclick="editUser(${user.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteUser(${user.id})">Hapus</button>
      </td>
    `;
    userBody.appendChild(row);
  });
}

// Dapatkan teks status
function getStatusText(status) {
  switch(status) {
    case 'active': return 'Aktif';
    case 'inactive': return 'Tidak Aktif';
    case 'pending': return 'Menunggu';
    default: return status;
  }
}

// Tampilkan modal tambah user
function showAddUserModal() {
  document.getElementById('modalTitle').textContent = 'Tambah User';
  document.getElementById('userForm').reset();
  document.getElementById('userModal').classList.add('active');
}

// Tampilkan modal edit user
function editUser(id) {
  const user = users.find(u => u.id === id);
  if (!user) return;
  
  document.getElementById('modalTitle').textContent = 'Edit User';
  document.getElementById('userName').value = user.name;
  document.getElementById('userEmail').value = user.email;
  document.getElementById('userPassword').value = ''; // Password tidak ditampilkan
  document.getElementById('userRole').value = user.role;
  document.getElementById('userStatus').value = user.status;
  
  // Simpan ID user yang sedang diedit
  document.getElementById('userForm').dataset.editId = id;
  
  document.getElementById('userModal').classList.add('active');
}

// Tutup modal
function closeUserModal() {
  document.getElementById('userModal').classList.remove('active');
  document.getElementById('userForm').reset();
  delete document.getElementById('userForm').dataset.editId;
}

// Hapus user
function deleteUser(id) {
  if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
    users = users.filter(user => user.id !== id);
    saveUsers();
    displayUsers();
  }
}

// Handle form submission
document.getElementById('userForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const editId = this.dataset.editId;
  const userData = {
    name: document.getElementById('userName').value,
    email: document.getElementById('userEmail').value,
    password: document.getElementById('userPassword').value,
    role: document.getElementById('userRole').value,
    status: document.getElementById('userStatus').value,
    lastLogin: new Date().toLocaleString()
  };
  
  if (editId) {
    // Edit user yang ada
    const index = users.findIndex(u => u.id === parseInt(editId));
    if (index !== -1) {
      users[index] = { ...users[index], ...userData };
    }
  } else {
    // Tambah user baru
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    users.push({ id: newId, ...userData });
  }
  
  saveUsers();
  displayUsers();
  closeUserModal();
});

// Event listeners untuk pencarian dan filter
document.getElementById('searchUser').addEventListener('input', displayUsers);
document.getElementById('statusFilter').addEventListener('change', displayUsers);

// Tampilkan user saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayUsers); 