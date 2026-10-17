document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nisnDaftar = document.getElementById('regNisn').value.trim();
    const namaDaftar = document.getElementById('regNama').value.trim();
    const passwordDaftar = document.getElementById('regPassword').value;
    
    localStorage.setItem('savedNisn', nisnDaftar);
    localStorage.setItem('savedUsername', namaDaftar);
    localStorage.setItem('savedPassword', passwordDaftar);
    
    alert(`🎉 Pendaftaran Berhasil!\nSiswa atas nama ${namaDaftar} telah terdaftar.\nSilakan masuk di halaman Login menggunakan NISN: ${nisnDaftar}.`);
    this.reset();
    pindahKeHalamanLokal('halaman-login');
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputNisn = document.getElementById('loginUser').value.trim();
    const inputPass = document.getElementById('loginPass').value;
    const responLogin = document.getElementById('loginRespon');
    
    const akunAsliNisn = localStorage.getItem('savedNisn');
    const akunAsliNama = localStorage.getItem('savedUsername');
    const akunAsliPass = localStorage.getItem('savedPassword');
    
    if (inputNisn === akunAsliNisn && inputPass === akunAsliPass) {
        alert(`Selamat datang kembali di kelas Informatika, ${akunAsliNama}!`);
        responLogin.innerText = ""; 
        document.getElementById('absensiNama').value = akunAsliNama;
        document.getElementById('absensiNama').readOnly = true; 
        document.getElementById('menu-absensi').style.style.display = 'inline-block';
        document.getElementById('menu-absensi').style.display = 'inline-block';
        document.getElementById('menu-materi').style.display = 'inline-block';
        document.getElementById('menu-kuis').style.display = 'inline-block';
        document.getElementById('menu-logout').style.display = 'inline-block';
        document.getElementById('menu-login').style.display = 'none';
        pindahKeHalamanLokal('materi');
    } else {
        responLogin.style.color = "red";
        responLogin.innerText = "❌ Login Gagal! NISN atau Password salah, atau akun belum terdaftar.";
    }
    this.reset();
});

function logoutSiswa(event) {
    event.preventDefault();
    alert('Anda telah keluar dari sistem e-learning.');
    
    document.getElementById('menu-absensi').style.display = 'none';
    document.getElementById('menu-materi').style.display = 'none';
    document.getElementById('menu-kuis').style.display = 'none';
    document.getElementById('menu-logout').style.display = 'none';
    
    document.getElementById('menu-login').style.display = 'inline-block';
    
    pindahKeHalamanLokal('profil');
}

function bukaHalaman(event, namaHalaman) {
    event.preventDefault();
    pindahKeHalamanLokal(namaHalaman);
}

function pindahKeHalamanLokal(idHalaman) {
    const semuaHalaman = document.querySelectorAll('.tab-content');
    semuaHalaman.forEach(halaman => halaman.classList.remove('active-tab'));
    document.getElementById(idHalaman).classList.add('active-tab');
}

let jumlahHadir = 0;
let jumlahIzin = 0;
let jumlahSakit = 0;

document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = document.getElementById('absensiNama').value;
    const status = document.getElementById('statusHadir').value;
    document.getElementById('absensiRespon').innerText = `✅ Absensi Berhasil! Kehadiran ${nama} tercatat.`;
    
    if (status === "Hadir") { jumlahHadir++; document.getElementById('countHadir').innerText = jumlahHadir; }
    if (status === "Izin") { jumlahIzin++; document.getElementById('countIzin').innerText = jumlahIzin; }
    if (status === "Sakit") { jumlahSakit++; document.getElementById('countSakit').innerText = jumlahSakit; }
    this.reset();
});

document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const pilihan = document.querySelector('input[name="jawaban"]:checked');
    const responKuis = document.getElementById('kuisRespon');
    const papanSkor = document.getElementById('papanSkor');
    const nilaiAngka = document.getElementById('nilaiAngka');
    
    if (!pilihan) return;
    papanSkor.style.display = "block"; 
    
    if (pilihan.value === 'B') {
        responKuis.style.color = "green";
        responKuis.innerText = "🎉 Benar! Jawabannya adalah Dekomposisi.";
        nilaiAngka.innerText = "100";
        nilaiAngka.style.color = "green";
    } else {
        responKuis.style.color = "red";
        responKuis.innerText = "❌ Jawabannya salah! Silakan coba lagi.";
        nilaiAngka.innerText = "0";
        nilaiAngka.style.color = "red";
    }
});

function ulangKuis() {
    document.getElementById('quizForm').reset();
    document.getElementById('kuisRespon').innerText = "";
    document.getElementById('papanSkor').style.display = "none";
}

function unduhModul() {
    alert("⚡ Menghubungkan ke server lokal...\nModul Pembelajaran Informatika 'Berpikir Komputasional.pdf' berhasil diunduh ke komputer Anda!");
}
