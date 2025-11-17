// Data Dummy untuk Dashboard
const summary = {
  totalProducts: 120,
  totalSales: 85,
  totalRevenue: 12500000, // Rp 12.500.000
};

// Data Dummy untuk List Produk
const products = [
  { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
  { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
  { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 },
];

// Fungsi untuk format rupiah (hanya untuk tampilan)
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

// Tambahkan event listener untuk memuat data jika halaman sudah siap
document.addEventListener("DOMContentLoaded", () => {
  // Memuat data untuk dashboard.html
  if (document.body.id === "dashboard-page") {
    loadDashboardData();
  }
  // Memuat data untuk products.html
  if (document.body.id === "products-page") {
    renderProductTable();
  }
});

/**
 * Fungsi untuk validasi login
 * Akan digunakan di index.html
 */
function handleLogin(event) {
  event.preventDefault(); // Mencegah form submit default

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // NIM mahasiswa harus diganti
  const NIM_MAHASISWA = "24090020"; // GANTI DENGAN NIM ANDA!!!

  // Validasi input
  if (email === "" || password === "") {
    alert("Email dan password tidak boleh kosong!");
    return;
  }

  // Simulasi Login: Email tidak boleh kosong & Password harus sesuai NIM
  if (password === NIM_MAHASISWA) {
    alert("Login berhasil");
    window.location.href = "dashboard.html"; // Redirect ke dashboard
  } else {
    alert("Password (NIM) salah atau Email/Password tidak valid!");
    // Opsi: Tampilkan pesan HTML
    // const errorMsg = document.getElementById('login-error');
    // errorMsg.textContent = "Email atau Password salah.";
    // errorMsg.style.display = 'block';
  }
}

/**
 * Fungsi untuk Dashboard
 * Akan digunakan di dashboard.html
 */
function loadDashboardData() {
  document.getElementById("total-products").textContent = summary.totalProducts;
  document.getElementById("total-sales").textContent = summary.totalSales;
  document.getElementById("total-revenue").textContent = formatRupiah(
    summary.totalRevenue
  );
}

/**
 * Fungsi untuk Product List
 * Akan digunakan di products.html
 */

// Fungsi untuk membuat elemen baris tabel
function createProductRow(product) {
  const row = document.createElement("tr");
  row.setAttribute("data-id", product.id);

  // No, Product Name, Price, Stock
  row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price.toLocaleString("id-ID")}</td>
        <td>${product.stock}</td>
        <td>
            <button class="icon-button edit-btn" data-product-name="${
              product.name
            }">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="icon-button delete-btn">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
    `;
  return row;
}

// Fungsi untuk merender tabel
function renderProductTable() {
  const tableBody = document.querySelector("#product-table-body");
  if (!tableBody) return;

  // Bersihkan isi tabel yang lama
  tableBody.innerHTML = "";

  // Gunakan forEach untuk menambahkan baris
  products.forEach((product) => {
    tableBody.appendChild(createProductRow(product));
  });

  // Tambahkan event listener untuk tombol Aksi setelah tabel dirender
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productName = event.currentTarget.getAttribute("data-product-name");
      alert(`Edit produk (${productName})`);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      handleDelete(event.currentTarget);
    });
  });
}

// Fungsi untuk menghapus baris
function handleDelete(deleteButton) {
  if (confirm("Yakin hapus produk ini?")) {
    // Hapus baris dari DOM
    const rowToDelete = deleteButton.closest("tr");
    if (rowToDelete) {
      rowToDelete.remove();

      // Opsi: Hapus dari array products jika perlu manipulasi data di JS
      // const productId = parseInt(rowToDelete.getAttribute('data-id'));
      // const index = products.findIndex(p => p.id === productId);
      // if (index !== -1) {
      //     products.splice(index, 1);
      // }
    }
  }
}
