// Fungsi untuk menampilkan statistik dashboard
function updateDashboardStats() {
    const transactions = JSON.parse(localStorage.getItem('adminTransactions')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Total transaksi
    document.getElementById('totalTransactions').textContent = transactions.length;

    // Pendapatan bulan ini
    const currentMonth = new Date().getMonth();
    const monthlyRevenue = transactions
        .filter(trans => new Date(trans.date).getMonth() === currentMonth)
        .reduce((sum, trans) => sum + trans.total, 0);
    document.getElementById('monthlyRevenue').textContent = `Rp ${monthlyRevenue.toLocaleString()}`;

    // Total produk tersedia
    document.getElementById('availableProducts').textContent = products.length;

    // User aktif (dalam 30 hari terakhir)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeUsers = users.filter(user => new Date(user.lastLogin) >= thirtyDaysAgo).length;
    document.getElementById('activeUsers').textContent = activeUsers;
}

// Fungsi untuk menampilkan transaksi
function displayTransactions() {
    const transactions = JSON.parse(localStorage.getItem('adminTransactions')) || [];
    const transaksiBody = document.getElementById('transaksiBody');
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    if (!transaksiBody) return;
    
    transaksiBody.innerHTML = '';
    
    if (transactions.length === 0) {
        transaksiBody.innerHTML = '<tr><td colspan="9" style="text-align: center;">Tidak ada transaksi</td></tr>';
        return;
    }
    
    // Filter transaksi
    let filteredTransactions = transactions;
    
    // Filter berdasarkan pencarian
    if (searchInput) {
        filteredTransactions = filteredTransactions.filter(trans => 
            trans.customer.toLowerCase().includes(searchInput) ||
            trans.id.toString().includes(searchInput)
        );
    }
    
    // Filter berdasarkan status
    if (statusFilter !== 'all') {
        filteredTransactions = filteredTransactions.filter(trans => trans.status === statusFilter);
    }
    
    // Filter berdasarkan tanggal
    if (dateFilter !== 'all') {
        const now = new Date();
        filteredTransactions = filteredTransactions.filter(trans => {
            const transDate = new Date(trans.date);
            switch(dateFilter) {
                case 'today':
                    return transDate.toDateString() === now.toDateString();
                case 'week':
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return transDate >= weekAgo;
                case 'month':
                    return transDate.getMonth() === now.getMonth();
                default:
                    return true;
            }
        });
    }
    
    filteredTransactions.forEach((trans, index) => {
        const days = Math.round(
            (new Date(trans.endDate) - new Date(trans.startDate)) / (24*60*60*1000) || 1
        );
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>#${trans.id}</td>
            <td>${trans.date}</td>
            <td>${trans.customer}</td>
            <td>${trans.startDate} s/d ${trans.endDate}</td>
            <td>${days} hari</td>
            <td>Rp ${trans.total.toLocaleString()}</td>
            <td>
                <select id="status-${trans.id}" onchange="updateStatus(${trans.id})" class="status-select">
                    <option value="Menunggu Konfirmasi" ${trans.status === 'Menunggu Konfirmasi' ? 'selected' : ''}>Menunggu</option>
                    <option value="Disetujui" ${trans.status === 'Disetujui' ? 'selected' : ''}>Disetujui</option>
                    <option value="Ditolak" ${trans.status === 'Ditolak' ? 'selected' : ''}>Ditolak</option>
                    <option value="Selesai" ${trans.status === 'Selesai' ? 'selected' : ''}>Selesai</option>
                </select>
            </td>
            <td>
                <button class="btn btn-info" onclick="viewDetail(${trans.id})">Detail</button>
                <button class="btn btn-danger" onclick="hapusTransaksi(${trans.id})">Hapus</button>
            </td>
        `;
        transaksiBody.appendChild(row);
        updateStatusColor(trans.id, trans.status);
    });
}

// Fungsi untuk memperbarui status transaksi
function updateStatus(id) {
    const transactions = JSON.parse(localStorage.getItem('adminTransactions')) || [];
    const transIndex = transactions.findIndex(t => t.id === id);
    
    if (transIndex !== -1) {
        const newStatus = document.getElementById(`status-${id}`).value;
        transactions[transIndex].status = newStatus;
        localStorage.setItem('adminTransactions', JSON.stringify(transactions));
        updateStatusColor(id, newStatus);
        
        // Update juga di riwayat user
        const userTransactions = JSON.parse(localStorage.getItem('userTransactions')) || [];
        const userTransIndex = userTransactions.findIndex(t => t.id === id);
        if (userTransIndex !== -1) {
            userTransactions[userTransIndex].status = newStatus;
            localStorage.setItem('userTransactions', JSON.stringify(userTransactions));
        }
    }
}

// Fungsi untuk memperbarui warna status
function updateStatusColor(id, status) {
    const selectElement = document.getElementById(`status-${id}`);
    if (!selectElement) return;
    
    selectElement.className = 'status-select';
    switch(status) {
        case 'Menunggu Konfirmasi':
            selectElement.classList.add('status-pending');
            break;
        case 'Disetujui':
            selectElement.classList.add('status-approved');
            break;
        case 'Ditolak':
            selectElement.classList.add('status-rejected');
            break;
        case 'Selesai':
            selectElement.classList.add('status-completed');
            break;
    }
}

// Fungsi untuk melihat detail transaksi
function viewDetail(id) {
    const transactions = JSON.parse(localStorage.getItem('adminTransactions')) || [];
    const trans = transactions.find(t => t.id === id);
    
    if (trans) {
        const days = Math.round(
            (new Date(trans.endDate) - new Date(trans.startDate)) / (24*60*60*1000) || 1
        );
        
        // Update informasi dasar transaksi
        document.getElementById('transactionId').textContent = `#${trans.id}`;
        document.getElementById('detailCustomer').textContent = trans.customer;
        document.getElementById('detailDate').textContent = trans.date;
        document.getElementById('detailPeriod').textContent = `${trans.startDate} s/d ${trans.endDate}`;
        document.getElementById('detailLamaSewa').textContent = `${days} hari`;
        document.getElementById('detailTotal').textContent = `Rp ${trans.total.toLocaleString()}`;
        
        // Update status dengan warna yang sesuai
        const statusElement = document.getElementById('detailStatus');
        statusElement.textContent = trans.status;
        statusElement.className = 'status';
        switch(trans.status) {
            case 'Menunggu Konfirmasi':
                statusElement.classList.add('status-pending');
                break;
            case 'Disetujui':
                statusElement.classList.add('status-approved');
                break;
            case 'Ditolak':
                statusElement.classList.add('status-rejected');
                break;
            case 'Selesai':
                statusElement.classList.add('status-completed');
                break;
        }
        
        // Tampilkan daftar item
        const itemsContainer = document.getElementById('detailItems');
        itemsContainer.innerHTML = '';
        
        let totalItems = 0;
        trans.items.forEach(item => {
            totalItems += item.qty;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-row';
            itemDiv.innerHTML = `
                <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-qty">${item.qty}x</span>
                </div>
                <div class="item-price">
                    <span class="price-per-day">Rp ${item.price.toLocaleString()}/hari</span>
                    <span class="price-total">Rp ${(item.price * item.qty * days).toLocaleString()}</span>
                </div>
            `;
            itemsContainer.appendChild(itemDiv);
        });

        // Tambahkan ringkasan
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'summary-row';
        summaryDiv.innerHTML = `
            <div class="summary-info">
                <span>Total Item:</span>
                <span>${totalItems} item</span>
            </div>
            <div class="summary-info">
                <span>Lama Sewa:</span>
                <span>${days} hari</span>
            </div>
            <div class="summary-info total">
                <span>Total Pembayaran:</span>
                <span>Rp ${trans.total.toLocaleString()}</span>
            </div>
        `;
        itemsContainer.appendChild(summaryDiv);
        
        // Tampilkan modal
        document.getElementById('detailModal').classList.add('active');
    }
}

// Fungsi untuk menghapus transaksi
function hapusTransaksi(id) {
    if (confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
        let transactions = JSON.parse(localStorage.getItem('adminTransactions')) || [];
        transactions = transactions.filter(t => t.id !== id);
        localStorage.setItem('adminTransactions', JSON.stringify(transactions));
        
        // Hapus juga dari riwayat user
        let userTransactions = JSON.parse(localStorage.getItem('userTransactions')) || [];
        userTransactions = userTransactions.filter(t => t.id !== id);
        localStorage.setItem('userTransactions', JSON.stringify(userTransactions));
        
        displayTransactions();
        updateDashboardStats();
    }
}

// Fungsi untuk menutup modal detail
function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('active');
}

// Fungsi untuk mencetak transaksi
function printTransaction() {
    window.print();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi dashboard
    updateDashboardStats();
    displayTransactions();
    
    // Event listener untuk pencarian
    document.getElementById('searchInput').addEventListener('input', displayTransactions);
    
    // Event listener untuk filter status
    document.getElementById('statusFilter').addEventListener('change', displayTransactions);
    
    // Event listener untuk filter tanggal
    document.getElementById('dateFilter').addEventListener('change', displayTransactions);
    
    // Refresh setiap 5 detik
    setInterval(() => {
        updateDashboardStats();
        displayTransactions();
    }, 5000);
}); 