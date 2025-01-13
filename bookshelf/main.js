// Logika untuk Aplikasi Rak Buku

// Fungsi untuk menyimpan data buku ke localStorage
function simpanBukuKeLocalStorage(buku) {
    localStorage.setItem('buku', JSON.stringify(buku));
  }
  
  // Fungsi untuk memuat data buku dari localStorage
  function muatBukuDariLocalStorage() {
    return JSON.parse(localStorage.getItem('buku')) || [];
  }
  
  // Variabel global untuk menyimpan data buku
  let daftarBuku = muatBukuDariLocalStorage();
  
  // Fungsi untuk menambahkan buku baru
  function tambahBuku(judul, penulis, tahun, selesaiDibaca) {
    const id = +new Date();
    const buku = { id, judul, penulis, tahun, selesaiDibaca };
    daftarBuku.push(buku);
    simpanBukuKeLocalStorage(daftarBuku);
    renderBuku();
  }
  
  // Fungsi untuk menghapus buku
  function hapusBuku(id) {
    daftarBuku = daftarBuku.filter(buku => buku.id !== id);
    simpanBukuKeLocalStorage(daftarBuku);
    renderBuku();
  }
  
  // Fungsi untuk memindahkan buku antar rak
  function pindahkanRakBuku(id) {
    const buku = daftarBuku.find(buku => buku.id === id);
    if (buku) {
      buku.selesaiDibaca = !buku.selesaiDibaca;
      simpanBukuKeLocalStorage(daftarBuku);
      renderBuku();
    }
  }
  
  // Fungsi untuk mengedit buku
  function editBuku(id, judulBaru, penulisBaru, tahunBaru, selesaiBaru) {
    const buku = daftarBuku.find(buku => buku.id === id);
    if (buku) {
      buku.judul = judulBaru;
      buku.penulis = penulisBaru;
      buku.tahun = tahunBaru;
      buku.selesaiDibaca = selesaiBaru;
      simpanBukuKeLocalStorage(daftarBuku);
      renderBuku();
    }
  }
  
  // Fungsi untuk merender buku ke halaman
  function renderBuku(daftar = daftarBuku) {
    const rakBelumSelesai = document.getElementById('incompleteBookList');
    const rakSelesai = document.getElementById('completeBookList');
  
    rakBelumSelesai.innerHTML = '';
    rakSelesai.innerHTML = '';
  
    daftar.forEach(buku => {
      const elemenBuku = document.createElement('div');
      elemenBuku.setAttribute('data-bookid', buku.id);
      elemenBuku.setAttribute('data-testid', 'bookItem');
  
      elemenBuku.innerHTML = `
        <h3 data-testid="bookItemTitle">${buku.judul}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${buku.penulis}</p>
        <p data-testid="bookItemYear">Tahun: ${buku.tahun}</p>
        <div>
          <button data-testid="bookItemIsCompleteButton">${buku.selesaiDibaca ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
          <button data-testid="bookItemDeleteButton">Hapus Buku</button>
          <button data-testid="bookItemEditButton">Edit Buku</button>
        </div>
      `;
  
      elemenBuku.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', () => pindahkanRakBuku(buku.id));
      elemenBuku.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => hapusBuku(buku.id));
      elemenBuku.querySelector('[data-testid="bookItemEditButton"]').addEventListener('click', () => {
        const judulBaru = prompt('Masukkan judul baru:', buku.judul);
        const penulisBaru = prompt('Masukkan penulis baru:', buku.penulis);
        const tahunBaru = prompt('Masukkan tahun baru:', buku.tahun);
        const selesaiBaru = confirm('Apakah buku ini selesai dibaca?');
        editBuku(buku.id, judulBaru, penulisBaru, tahunBaru, selesaiBaru);
      });
  
      if (buku.selesaiDibaca) {
        rakSelesai.appendChild(elemenBuku);
      } else {
        rakBelumSelesai.appendChild(elemenBuku);
      }
    });
  }

  // Fungsi untuk mencari buku berdasarkan judul
function cariBuku(keyword) {
    const hasilPencarian = daftarBuku.filter(buku =>
      buku.judul.toLowerCase().includes(keyword.toLowerCase())
    );
    renderBuku(hasilPencarian);
  }
  
  // Event listener untuk form pencarian buku
  document.getElementById('searchBook').addEventListener('submit', function(event) {
    event.preventDefault();
    const keyword = document.getElementById('searchBookTitle').value;
    cariBuku(keyword);
  });
  
  // Event listener untuk form tambah buku
  document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const judul = document.getElementById('bookFormTitle').value;
    const penulis = document.getElementById('bookFormAuthor').value;
    const tahun = document.getElementById('bookFormYear').value;
    const selesaiDibaca = document.getElementById('bookFormIsComplete').checked;
  
    tambahBuku(judul, penulis, tahun, selesaiDibaca);
  
    this.reset();
  });
  
  // Render buku saat halaman dimuat
  renderBuku();
  

// Menambahkan loading states pada form
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', () => {
    form.classList.add('loading');
    setTimeout(() => form.classList.remove('loading'), 500);
  });
});

// Menambahkan animasi sukses pada buku list
function addSuccessAnimation(element) {
  element.classList.add('success');
  setTimeout(() => element.classList.remove('success'), 300);
}