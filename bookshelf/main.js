// Logika untuk Aplikasi Rak Buku
const API_BASE_URL = "http://localhost:3000/books";
// Fungsi untuk menyimpan data buku ke localStorage
  
  // Fungsi untuk memuat data buku dari localStorage
  async function muatBukuDariAPI() {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Gagal memuat data buku:", error);
      return [];
    }
  }
  
  // Variabel global untuk menyimpan data buku
  let daftarBuku = muatBukuDariAPI();
  
  // Fungsi untuk menambahkan buku baru
  async function tambahBuku(title, author, publicaton, finished) {
    const buku = { title, author, publicaton, finished };
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buku),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error dari server:", errorData);
        alert("Gagal menambahkan buku: " + errorData.message); // Tambahkan feedback ke pengguna
      } else {
        console.log("Buku berhasil ditambahkan");
        alert("Buku berhasil ditambahkan!"); // Tambahkan feedback ke pengguna
        renderBuku(); // Pastikan fungsi ini sudah ada untuk memperbarui tampilan
      }
    } catch (error) {
      console.error("Gagal menambahkan buku:", error);
      alert("Terjadi kesalahan saat menambahkan buku. Coba lagi nanti."); // Tambahkan feedback ke pengguna
    }
  }
  
  // Event listener untuk menangani submit form
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookForm");
    console.log("Script dijalankan");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Mencegah form dari refresh halaman secara default
  
      // Ambil nilai dari input form
      const title = document.getElementById("bookFormTitle").value;
      const author = document.getElementById("bookFormAuthor").value;
      const publicaton = document.getElementById("bookFormYear").value;
      const finished = document.getElementById("bookFormIsComplete").checked ? 1 : 0;
  
      // Panggil fungsi tambahBuku
      await tambahBuku(title, author, publicaton, finished);
  
      // Reset form setelah pengiriman
      form.reset();
    });
  });


  // Fungsi untuk menghapus buku
  async function hapusBuku(id) {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      renderBuku();
    } catch (error) {
      console.error("Gagal menghapus buku:", error);
    }
  }
 
  
  // Fungsi untuk mengedit buku
  async function editBuku(id, title, author, publicaton, finished) {
    const buku = { title, author, publicaton, finished };
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buku),
      });
      renderBuku();
    } catch (error) {
      console.error("Gagal memperbarui buku:", error);
    }
  }
  
  // Fungsi untuk merender buku ke halaman
  async function renderBuku() {
    const response = await muatBukuDariAPI();

    // Pastikan data berbentuk objek dan memiliki properti 'data'
    if (!response || typeof response !== "object" || !Array.isArray(response.data)) {
        console.error("Data API tidak sesuai:", response);
        return;
    }

    const daftarBuku = response.data; // Akses array 'data' dari objek API
    const rakBelumSelesai = document.getElementById("incompleteBookList");
    const rakSelesai = document.getElementById("completeBookList");

    rakBelumSelesai.innerHTML = "";
    rakSelesai.innerHTML = "";

    daftarBuku.forEach(buku => {
        const elemenBuku = document.createElement("div");
        elemenBuku.setAttribute("data-bookid", buku.id);

        elemenBuku.innerHTML = `
            <h3>${buku.title}</h3>
            <p>Penulis: ${buku.author}</p>
            <p>Tahun: ${buku.publicaton}</p>
            <div>
                <button>${buku.finished == 0 ? "Selesai dibaca" : "Belum Selesai dibaca"}</button>
                <button>Hapus Buku</button>
                <button>Edit Buku</button>
            </div>
        `;

        elemenBuku.querySelector("button:nth-child(1)").addEventListener("click", () => {
          if(buku.finished == 0){
            buku.finished = 1
          }
          else{
            buku.finished = 0
          }
          editBuku(buku.id, buku.title, buku.author, buku.publicaton, buku.finished);
        });
        elemenBuku.querySelector("button:nth-child(2)").addEventListener("click", () => hapusBuku(buku.id));
        elemenBuku.querySelector("button:nth-child(3)").addEventListener("click", () => {
            const judulBaru = prompt("Masukkan judul baru:", buku.title);
            const penulisBaru = prompt("Masukkan penulis baru:", buku.author);
            const tahunBaru = prompt("Masukkan tahun baru:", buku.publicaton);
            let selesaiBaru = confirm("Apakah buku ini selesai dibaca?");
            if(selesaiBaru == true){
              selesaiBaru = 1
            }
            else{
              selesaiBaru = 0
            }
            editBuku(buku.id, judulBaru, penulisBaru, tahunBaru, selesaiBaru);
        });

        if (buku.finished) {
            rakSelesai.appendChild(elemenBuku);
        } else {
            rakBelumSelesai.appendChild(elemenBuku);
        }
    });
}


  // UDAH BENER TAPI TINGGAL TAMBAH ELEMENT HTML NYA
  // Fungsi untuk mencari buku berdasarkan judul
  // async function cariBuku(keyword) {
  //   try {
  //     // Kirim permintaan ke backend dengan query string keyword
  //     const response = await fetch(`${API_BASE_URL}/search?title=${keyword}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  
  //     // Cek apakah respons berhasil
  //     if (!response.ok) {
  //       console.error("Gagal mencari buku di server:", response.status);
  //       alert("Gagal mencari buku. Coba lagi nanti.");
  //       return;
  //     }
  
  //     // Ambil data hasil pencarian
  //     const hasilPencarian = await response.json();
  
  //     // Render hasil pencarian
  //     renderBuku(hasilPencarian);
  //   } catch (error) {
  //     console.error("Terjadi kesalahan saat mencari buku:", error);
  //     alert("Terjadi kesalahan saat mencari buku. Coba lagi nanti.");
  //   }
  // }
  
  // // Event listener untuk form pencarian buku
  // document.getElementById("searchBook").addEventListener("submit", function(event) {
  //   event.preventDefault(); // Mencegah perilaku default form
  //   const keyword = document.getElementById("searchBookTitle").value;
  //   cariBuku(keyword); // Panggil fungsi cariBuku
  // });
  
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