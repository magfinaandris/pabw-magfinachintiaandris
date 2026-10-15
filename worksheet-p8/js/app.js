// P8 — Lembar B: data halaman sebagai variabel

const profil = {
  nama: "Magfina Chintia Andris",
  peran: "Mahasiswi Inforatika yang suka menonton film",
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