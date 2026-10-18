// P9 - js/dom.js: bagian yang menyentuh halaman.
// Data ada di app.js; berkas ini hanya memakainya dan menampilkannya.

import { daftarFilm } from "./app.js";

// ---------- Lembar A: memilih elemen (satu nama untuk satu elemen) ----------

const wadah = document.querySelector("#daftar");           // <tbody> tempat baris film
const areaFilter = document.querySelector("#filter");      // induk tombol filter
const pesanKosong = document.querySelector("#kosong");     // pesan "daftar kosong"
const form = document.querySelector("#tambah-film form");  // form Tambah Film

// Lembar E (kasus 1): periksa dulu, supaya pesan galatnya jelas
const penting = { wadah, areaFilter, pesanKosong, form };
for (const [nama, elemen] of Object.entries(penting)) {
  if (elemen === null) {
    console.error(`Elemen "${nama}" tidak ditemukan, cek id atau class di HTML`);
  }
}

const tombolKirim = form.querySelector('button[type="submit"]');

// ---------- Lembar B: membuat baris dari data ----------

function buatSel(tag, teks) {
  const sel = document.createElement(tag);
  sel.textContent = teks;
  return sel;
}

function buatBaris(film) {
  const baris = document.createElement("tr");
  const judul = buatSel("th", film.judul);
  judul.scope = "row";
  baris.append(
    judul,
    buatSel("td", film.tahun),
    buatSel("td", film.sutradara),
    buatSel("td", film.rating)
  );
  return baris;
}

// ---------- Lembar D: satu fungsi render, urutannya tetap ----------

function render(daftar) {
  wadah.textContent = "";                    // 1. kosongkan wadah dulu
  pesanKosong.hidden = daftar.length > 0;    // 2. tampilkan pesan bila kosong
  if (daftar.length === 0) return;

  const kumpulan = document.createDocumentFragment();
  daftar.forEach((film) => kumpulan.append(buatBaris(film)));
  wadah.append(kumpulan);                    // 3. isi ulang sekali jalan
}

// ---------- Lembar C: filter dengan satu pendengar di induknya ----------

let kategoriAktif = "semua";

function saring(kategori) {
  return kategori === "semua"
    ? daftarFilm
    : daftarFilm.filter((film) => film.kategori === kategori);
}

function tandaiTombolAktif(tombolAktif) {
  areaFilter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
  });
}

areaFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;                       // klik di luar tombol: abaikan

  kategoriAktif = tombol.dataset.kategori;
  tandaiTombolAktif(tombol);
  render(saring(kategoriAktif));
});

// ---------- Lembar D: validasi form Tambah Film ----------

// Mengembalikan teks galat; kosong ("") berarti kolom sudah benar
function galatKolom(input) {
  const nilai = input.value.trim();
  if (nilai === "") return "Kolom ini wajib diisi.";
  if (input.type === "number") {
    const angka = Number(nilai);
    if (angka < Number(input.min) || angka > Number(input.max)) {
      return `Isi dengan angka antara ${input.min} dan ${input.max}.`;
    }
  }
  return "";
}

// Menampilkan pesan di bawah kolom; mengembalikan true bila kolom benar
function tampilkan(input) {
  const galat = galatKolom(input);
  input.closest(".form-kolom").querySelector(".pesan-galat").textContent = galat;
  input.setAttribute("aria-invalid", galat !== "");
  return galat === "";
}

function semuaLayak() {
  return [...form.querySelectorAll("input")].every((i) => galatKolom(i) === "");
}

function bersihkanForm() {
  form.reset();
  form.querySelectorAll("input").forEach((input) => {
    input.removeAttribute("aria-invalid");
    input.closest(".form-kolom").querySelector(".pesan-galat").textContent = "";
  });
  tombolKirim.disabled = true;
}

// Pesan muncul saat pindah dari satu kolom ke kolom lain
form.addEventListener("focusout", (event) => {
  if (event.target.matches("input")) tampilkan(event.target);
});

// Saat mengetik: perbarui pesan yang sudah muncul, dan atur tombol
form.addEventListener("input", (event) => {
  if (event.target.getAttribute("aria-invalid") === "true") tampilkan(event.target);
  tombolKirim.disabled = !semuaLayak();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();                    // wajib di baris pertama

  const bermasalah = [...form.querySelectorAll("input")].filter(
    (input) => !tampilkan(input)
  );
  if (bermasalah.length > 0) {
    bermasalah[0].focus();                   // pindah ke kolom pertama yang salah
    return;
  }

  const nilai = (id) => form.elements[id]?.value.trim() ?? "";
  daftarFilm.push({
    judul: nilai("judul-film"),
    tahun: Number(nilai("tahun-film")),
    sutradara: nilai("sutradara"),
    kategori: "Lainnya",
    rating: Number(nilai("rating")),
  });

  bersihkanForm();
  render(saring(kategoriAktif));
});

// ---------- Tampilan awal ----------

tombolKirim.disabled = true;
render(daftarFilm);