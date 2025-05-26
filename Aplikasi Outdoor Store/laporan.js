// Inisialisasi Chart.js
let revenueChart;

// Fungsi untuk memformat angka ke format Rupiah
function formatRupiah(angka) {
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Fungsi untuk mendapatkan data transaksi dari localStorage
function getTransactions() {
  return JSON.parse(localStorage.getItem('adminTransactions')) || [];
}

// Fungsi untuk menghitung statistik
function calculateStats() {
  const transactions = getTransactions();
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  // Filter transaksi bulan ini
  const monthlyTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
  });

  // Hitung total transaksi dan pendapatan
  const totalTransactions = monthlyTransactions.length;
  const totalRevenue = monthlyTransactions.reduce((sum, t) => sum + t.total, 0);

  // Hitung produk terpopuler
  const productCounts = {};
  monthlyTransactions.forEach(t => {
    t.items.forEach(item => {
      productCounts[item.name] = (productCounts[item.name] || 0) + item.qty;
    });
  });

  const popularProduct = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

  // Hitung pelanggan aktif
  const activeCustomers = new Set(monthlyTransactions.map(t => t.customer)).size;

  return {
    totalTransactions,
    totalRevenue,
    popularProduct,
    activeCustomers
  };
}

// Fungsi untuk menampilkan statistik
function displayStats() {
  const stats = calculateStats();
  
  document.getElementById('totalTransactions').textContent = stats.totalTransactions;
  document.getElementById('totalRevenue').textContent = formatRupiah(stats.totalRevenue);
  document.getElementById('popularProduct').textContent = stats.popularProduct;
  document.getElementById('activeCustomers').textContent = stats.activeCustomers;
}

// Fungsi untuk menampilkan grafik pendapatan
function displayRevenueChart() {
  const transactions = getTransactions();
  const ctx = document.getElementById('revenueChart').getContext('2d');

  // Kelompokkan transaksi per bulan
  const monthlyData = {};
  transactions.forEach(t => {
    const date = new Date(t.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    monthlyData[monthYear] = (monthlyData[monthYear] || 0) + t.total;
  });

  const labels = Object.keys(monthlyData);
  const data = Object.values(monthlyData);

  if (revenueChart) {
    revenueChart.destroy();
  }

  revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Pendapatan',
        data: data,
        borderColor: '#2d6a4f',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => formatRupiah(value)
          }
        }
      }
    }
  });
}

// Fungsi untuk menampilkan transaksi terbaru
function displayRecentTransactions() {
  const transactions = getTransactions();
  const tbody = document.querySelector('#recentTransactions tbody');
  tbody.innerHTML = '';

  // Ambil 5 transaksi terbaru
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  recentTransactions.forEach(t => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${t.id}</td>
      <td>${new Date(t.date).toLocaleDateString()}</td>
      <td>${t.customer}</td>
      <td>${formatRupiah(t.total)}</td>
      <td>${t.status}</td>
    `;
    tbody.appendChild(row);
  });
}

// Fungsi untuk menampilkan produk terpopuler
function displayPopularProducts() {
  const transactions = getTransactions();
  const tbody = document.querySelector('#popularProducts tbody');
  tbody.innerHTML = '';

  // Hitung jumlah sewa dan total pendapatan per produk
  const productStats = {};
  transactions.forEach(t => {
    t.items.forEach(item => {
      if (!productStats[item.name]) {
        productStats[item.name] = {
          totalRentals: 0,
          totalRevenue: 0
        };
      }
      productStats[item.name].totalRentals += item.qty;
      productStats[item.name].totalRevenue += item.price * item.qty;
    });
  });

  // Urutkan berdasarkan jumlah sewa
  const sortedProducts = Object.entries(productStats)
    .sort((a, b) => b[1].totalRentals - a[1].totalRentals)
    .slice(0, 5);

  sortedProducts.forEach(([name, stats]) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${name}</td>
      <td>${stats.totalRentals}</td>
      <td>${formatRupiah(stats.totalRevenue)}</td>
    `;
    tbody.appendChild(row);
  });
}

// Fungsi untuk generate laporan berdasarkan filter
function generateReport() {
  const reportType = document.getElementById('reportType').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  // Implementasi filter berdasarkan tipe laporan dan tanggal
  // (akan diimplementasikan sesuai kebutuhan)
  
  displayStats();
  displayRevenueChart();
  displayRecentTransactions();
  displayPopularProducts();
}

// Fungsi untuk mencetak laporan
function printReport() {
  window.print();
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  // Set tanggal default
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  document.getElementById('startDate').value = firstDay.toISOString().split('T')[0];
  document.getElementById('endDate').value = lastDay.toISOString().split('T')[0];

  // Tampilkan data awal
  displayStats();
  displayRevenueChart();
  displayRecentTransactions();
  displayPopularProducts();
}); 