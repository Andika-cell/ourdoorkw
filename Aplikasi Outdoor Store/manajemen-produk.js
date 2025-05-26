// Data produk awal
let products = JSON.parse(localStorage.getItem('products')) || [
  {
    id: 1,
    name: "Tenda Kap 2 Orang",
    price: 35000,
    category: "tenda",
    image: "1.Tenda Kap 2 Orang.jpg",
    description: "Tenda untuk 2 orang dengan bahan anti air"
  },
  {
    id: 2,
    name: "Tenda Kap 4 Orang",
    price: 45000,
    category: "tenda",
    image: "2.Tenda Kap 4 Orang.jpg",
    description: "Tenda untuk 4 orang dengan bahan anti air"
  },
  {
    id: 3,
    name: "Tenda Double Layer 2 Orang",
    price: 50000,
    category: "tenda",
    image: "3.Tenda Double Layer 2 Orang.jpg",
    description: "Tenda double layer untuk 2 orang"
  },
  {
    id: 4,
    name: "Tenda Double Layer 4 Orang",
    price: 60000,
    category: "tenda",
    image: "4.Tenda Double Layer 4 Orang.jpg",
    description: "Tenda double layer untuk 4 orang"
  },
  {
    id: 5,
    name: "Hydropack",
    price: 25000,
    category: "perlengkapan",
    image: "5.Hydropack.jpg",
    description: "Tas air minum untuk hiking"
  },
  {
    id: 6,
    name: "Meja Persegi",
    price: 20000,
    category: "peralatan",
    image: "6.Meja Persegi.jpg",
    description: "Meja lipat persegi untuk camping"
  },
  {
    id: 7,
    name: "Meja Panjang",
    price: 30000,
    category: "peralatan",
    image: "7.Meja Panjang.jpg",
    description: "Meja lipat panjang untuk camping"
  },
  {
    id: 8,
    name: "Kursi Lipat",
    price: 15000,
    category: "peralatan",
    image: "8.Kursi Lipat.jpg",
    description: "Kursi lipat portable"
  },
  {
    id: 9,
    name: "Kursi Jumbo",
    price: 25000,
    category: "peralatan",
    image: "9.Kursi Jumbo.jpg",
    description: "Kursi lipat jumbo yang nyaman"
  },
  {
    id: 10,
    name: "Paket 4 Kursi & Meja",
    price: 70000,
    category: "peralatan",
    image: "10.Paket 4 Kursi & Meja.jpg",
    description: "Paket lengkap 4 kursi dan 1 meja"
  },
  {
    id: 11,
    name: "Paket 6 Kursi & Meja Panjang",
    price: 90000,
    category: "peralatan",
    image: "11.Paket 6 Kursi & Meja Panjang.jpg",
    description: "Paket lengkap 6 kursi dan 1 meja panjang"
  },
  {
    id: 12,
    name: "Tas Carier",
    price: 35000,
    category: "perlengkapan",
    image: "12.Tas Carier.jpg",
    description: "Tas carrier untuk hiking"
  },
  {
    id: 13,
    name: "Tas Daypack",
    price: 25000,
    category: "perlengkapan",
    image: "13.Tas Daypack.jpg",
    description: "Tas daypack untuk aktivitas outdoor"
  },
  {
    id: 14,
    name: "Jaket Gunung",
    price: 20000,
    category: "perlengkapan",
    image: "14.Jaket Gunung.jpg",
    description: "Jaket gunung anti air"
  },
  {
    id: 15,
    name: "Sepatu Gunung",
    price: 35000,
    category: "perlengkapan",
    image: "15.Sepatu Gunung.jpg",
    description: "Sepatu khusus untuk hiking"
  },
  {
    id: 16,
    name: "Tracking Pole",
    price: 20000,
    category: "perlengkapan",
    image: "16.Tracking Pole.jpg",
    description: "Tongkat hiking untuk keseimbangan"
  },
  {
    id: 17,
    name: "Matras",
    price: 5000,
    category: "perlengkapan",
    image: "17.Matras.jpg",
    description: "Matras untuk tidur"
  },
  {
    id: 18,
    name: "Matras Foil",
    price: 10000,
    category: "perlengkapan",
    image: "18.Matras Foil.jpg",
    description: "Matras foil untuk isolasi panas"
  },
  {
    id: 19,
    name: "Hammock",
    price: 15000,
    category: "perlengkapan",
    image: "19.Hammock.jpg",
    description: "Tempat tidur gantung"
  },
  {
    id: 20,
    name: "Headlamp",
    price: 10000,
    category: "aksesoris",
    image: "20.Headlamp.jpg",
    description: "Lampu kepala untuk hiking malam"
  },
  {
    id: 21,
    name: "Lampu Tenda",
    price: 10000,
    category: "aksesoris",
    image: "21.Lampu Tenda.jpg",
    description: "Lampu untuk penerangan tenda"
  },
  {
    id: 22,
    name: "Kompor Kontak",
    price: 15000,
    category: "peralatan",
    image: "22.Kompor Kotak.jpg",
    description: "Kompor portable kotak"
  },
  {
    id: 23,
    name: "Kompor Kembang",
    price: 20000,
    category: "peralatan",
    image: "23.Kompor Kembang.jpg",
    description: "Kompor portable kembang"
  },
  {
    id: 24,
    name: "Kompor Portable",
    price: 25000,
    category: "peralatan",
    image: "24.Kompor Portable.jpg",
    description: "Kompor portable praktis"
  },
  {
    id: 25,
    name: "Cooking Set",
    price: 20000,
    category: "peralatan",
    image: "25.Cooking Set.jpg",
    description: "Set peralatan masak lengkap"
  },
  {
    id: 26,
    name: "Sleeping Bag",
    price: 15000,
    category: "perlengkapan",
    image: "26.Sleeping Bag.jpg",
    description: "Sleeping bag hangat"
  },
  {
    id: 27,
    name: "Tempat Telur",
    price: 5000,
    category: "aksesoris",
    image: "27.Tempat Telur.jpg",
    description: "Tempat telur untuk camping"
  },
  {
    id: 28,
    name: "Tiang Flysheet",
    price: 5000,
    category: "aksesoris",
    image: "28.Tiang Flysheet.jpg",
    description: "Tiang untuk flysheet"
  },
  {
    id: 29,
    name: "Flag Karnaval",
    price: 5000,
    category: "aksesoris",
    image: "29.Flag Karnaval.jpg",
    description: "Bendera karnaval"
  },
  {
    id: 30,
    name: "Topi Rimba",
    price: 10000,
    category: "aksesoris",
    image: "30.Topi Rimba.jpg",
    description: "Topi untuk aktivitas outdoor"
  },
  {
    id: 31,
    name: "Bantal Tiup",
    price: 5000,
    category: "perlengkapan",
    image: "31.Bantal Tiup.jpg",
    description: "Bantal tiup untuk kenyamanan"
  },
  {
    id: 32,
    name: "Tripod",
    price: 10000,
    category: "aksesoris",
    image: "32.Tripod.jpg",
    description: "Tripod untuk kamera"
  },
  {
    id: 33,
    name: "Flysheet",
    price: 15000,
    category: "aksesoris",
    image: "33.Flysheet.jpg",
    description: "Pelindung tambahan untuk tenda"
  }
];

// Simpan data ke localStorage
function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

// Tampilkan semua produk
function displayProducts() {
  const productGrid = document.getElementById('productGrid');
  const searchInput = document.getElementById('searchProduct').value.toLowerCase();
  const categoryFilter = document.getElementById('categoryFilter').value;
  
  productGrid.innerHTML = '';
  
  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchInput);
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Rp ${product.price.toLocaleString()}/hari</p>
      <p>${product.description}</p>
      <div class="product-actions">
        <button class="btn btn-info" onclick="editProduct(${product.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Hapus</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Tampilkan modal tambah produk
function showAddProductModal() {
  document.getElementById('modalTitle').textContent = 'Tambah Produk';
  document.getElementById('productForm').reset();
  document.getElementById('productModal').classList.add('active');
}

// Tampilkan modal edit produk
function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  
  document.getElementById('modalTitle').textContent = 'Edit Produk';
  document.getElementById('productName').value = product.name;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productCategory').value = product.category;
  document.getElementById('productDescription').value = product.description;
  
  // Simpan ID produk yang sedang diedit
  document.getElementById('productForm').dataset.editId = id;
  
  document.getElementById('productModal').classList.add('active');
}

// Tutup modal
function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
  document.getElementById('productForm').reset();
  delete document.getElementById('productForm').dataset.editId;
}

// Hapus produk
function deleteProduct(id) {
  if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
    products = products.filter(product => product.id !== id);
    saveProducts();
    displayProducts();
  }
}

// Handle form submission
document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const editId = this.dataset.editId;
  const productData = {
    name: document.getElementById('productName').value,
    price: parseInt(document.getElementById('productPrice').value),
    category: document.getElementById('productCategory').value,
    description: document.getElementById('productDescription').value
  };
  
  // Handle image upload
  const imageInput = document.getElementById('productImage');
  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function(e) {
      productData.image = e.target.result;
      saveProduct(productData, editId);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    saveProduct(productData, editId);
  }
});

function saveProduct(productData, editId) {
  if (editId) {
    // Edit produk yang ada
    const index = products.findIndex(p => p.id === parseInt(editId));
    if (index !== -1) {
      products[index] = { ...products[index], ...productData };
    }
  } else {
    // Tambah produk baru
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push({ id: newId, ...productData });
  }
  
  saveProducts();
  displayProducts();
  closeProductModal();
}

// Event listeners untuk pencarian dan filter
document.getElementById('searchProduct').addEventListener('input', displayProducts);
document.getElementById('categoryFilter').addEventListener('change', displayProducts);

// Tampilkan produk saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  saveProducts(); // Simpan data awal jika belum ada
  displayProducts();
}); 