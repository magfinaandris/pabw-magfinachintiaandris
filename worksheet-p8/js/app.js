
const profil = {
  nama: "Magfina Chintia Andris",
  peran: "Mahasiswi Informatika yang suka menonton film",
  keahlian: ["HTML", "CSS", "JavaScript", "Git"],
  jumlahProyek: 2,
};

let pilihanAktif = "semua";

const kalimat = `Nama saya ${profil.nama}, dan saya belajar ${profil.keahlian.length} hal.`;
console.log(kalimat);

document.title = `Catatan Film Saya — ${profil.nama}`;

console.log(typeof profil.nama);
console.log(typeof profil.jumlahProyek);

console.log(profil.alamat?.kota);

const kota = profil.alamat?.kota ?? "Belum diisi";
console.log(kota);


function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

console.log(buatPerkenalan({ nama: "Ayu", peran: "penonton drama" }));
console.log(buatPerkenalan({ nama: "Budi", peran: "pecinta film aksi" }));
console.log(formatKeahlian(["Drama", "Komedi"]));

// P8 - Lembar D: data halaman sebagai array of object

const daftarFilm = [
  { judul: "Dilan 1990", tahun: 2018, sutradara: "Fajar Bustomi dan Pidi Baiq", rating: 9 },
  { judul: "Dilan 1991", tahun: 2019, sutradara: "Fajar Bustomi dan Pidi Baiq", rating: 8 },
  { judul: "Tunggu Aku Sukses Nanti", tahun: 2026, sutradara: "Naya Anindita", rating: 9 },
  { judul: "Mencuri Raden Saleh", tahun: 2022, sutradara: "Angga Dwimas Sasongko", rating: 9 },
  { judul: "Ngeri Ngeri Sedap", tahun: 2022, sutradara: "Bene Dion Rajagukguk", rating: 9 },
  { judul: "Bila Esok Ibu Tiada", tahun: 2024, sutradara: "Rudi Soedjarwo", rating: 10 },
  { judul: "Bebas", tahun: 2019, sutradara: "Riri Riza", rating: 9 },
  { judul: "Esok Tanpa Ibu", tahun: 2026, sutradara: "Ho Wi Ding", rating: 10 },
];

console.table(profil.keahlian);
console.table(daftarFilm);

// filter: menyaring, hasilnya array baru
const filmFavorit = daftarFilm.filter((film) => film.rating === 10);
console.table(filmFavorit);
   // let dipakai karena nilainya berubah
   pilihanAktif = "favorit";
   const tampil = pilihanAktif === "favorit" ? filmFavorit : daftarFilm;
   console.log(`Pilihan aktif: ${pilihanAktif}, jumlah film: ${tampil.length}`);

// find: mengambil satu isi pertama yang cocok
const filmBebas = daftarFilm.find((film) => film.judul === "Bebas");
console.log(filmBebas);
console.log(daftarFilm.find((film) => film.judul === "Tidak Ada"));

// map: mengubah setiap isi, panjangnya sama dengan array asal
const daftarJudul = daftarFilm.map((film) => film.judul);
console.log(daftarJudul, daftarJudul.length === daftarFilm.length);

// sort memakai salinan supaya data asli tidak berubah
const urutRating = [...daftarFilm].sort((a, b) => b.rating - a.rating);
console.table(urutRating);
console.log("Urutan asli tetap:", daftarFilm.map((film) => film.judul));

// salinan objek: spread membuat objek baru
const salinanProfil = { ...profil };
salinanProfil.nama = "Nama Lain";
console.log(profil.nama);
console.log(salinanProfil.nama);

// P8 - Lembar E: tiga kasus sulit

// Kasus 1: label salah tulis menghasilkan undefined
console.log(daftarFilm[0].judul);

// Kasus 2: querySelector bisa menghasilkan null, jadi diperiksa dulu
const elemenJudul = document.querySelector("h1");
if (elemenJudul !== null) {
  console.log("h1 ditemukan:", elemenJudul.textContent);
} else {
  console.error("Elemen h1 tidak ditemukan, cek id atau class di HTML");
}

// Kasus 3: nilai dari kolom isian selalu teks, ubah dulu jadi angka
const nilaiInput = "8";
console.log(nilaiInput + 1);
console.log(Number(nilaiInput) + 1);