// Fungsi untuk menyimpan transaksi
function saveTransaction(cartData, rentStart, rentEnd, customerName) {
    const days = Math.round((rentEnd - rentStart) / (24 * 60 * 60 * 1000)) || 1;
    const total = cartData.reduce((sum, item) => sum + (item.price * item.qty * days), 0);

    const newTransaction = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        customer: customerName,
        startDate: rentStart.toISOString().split('T')[0],
        endDate: rentEnd.toISOString().split('T')[0],
        items: JSON.parse(JSON.stringify(cartData)),
        total: total,
        status: "Menunggu Konfirmasi"
    };

    // Simpan ke admin transactions
    let adminTransactions = JSON.parse(localStorage.getItem('adminTransactions')) || [];
    adminTransactions.push(newTransaction);
    localStorage.setItem('adminTransactions', JSON.stringify(adminTransactions));

    // Simpan ke user transactions
    let userTransactions = JSON.parse(localStorage.getItem('userTransactions')) || [];
    userTransactions.push(newTransaction);
    localStorage.setItem('userTransactions', JSON.stringify(userTransactions));

    return newTransaction;
}

// Fungsi untuk memuat transaksi
function loadTransactions() {
    return JSON.parse(localStorage.getItem('adminTransactions')) || [];
}

// Fungsi untuk memperbarui status transaksi
function updateTransactionStatus(transactionId, newStatus) {
    let transactions = JSON.parse(localStorage.getItem('adminTransactions')) || [];
    const transactionIndex = transactions.findIndex(t => t.id === transactionId);
    
    if (transactionIndex !== -1) {
        transactions[transactionIndex].status = newStatus;
        localStorage.setItem('adminTransactions', JSON.stringify(transactions));
        return true;
    }
    return false;
} 