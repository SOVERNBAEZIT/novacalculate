/* Halo! Selamat datang di "Otak" NovaCalc. 
  Kita siapin dulu nih variabel buat nampung ingatan kalkulatornya.
*/
let inputSekarang = '0';      // Yang lagi ngetik
let inputSebelumnya = '';     // Yang disimpen buat diitung
let operatorPilihan = null;   // Lagi mau tambah, kurang, atau apa?

// Ambil elemen layarnya biar bisa kita utak-atik tampilannya
const monitorUtama = document.getElementById('main-display');
const monitorAtas = document.getElementById('prev-display');

// Fungsi pas tombol angka dipencet
function appendNumber(angka) {
    // Kalo layarnya masih nol, kita ganti aja. Kalo udah ada isi, ya kita sambungin.
    if (inputSekarang === '0') {
        inputSekarang = angka;
    } else {
        inputSekarang += angka;
    }
    nyalainLayar();
}

// Fungsi pas tombol operator (+, -, dkk) dipencet
function handleOperator(op) {
    // Kalo user udah ngetik angka, terus pencet operator lagi tanpa =, kita itungin dulu otomatis.
    if (operatorPilihan !== null) hitungSekarang();
    
    operatorPilihan = op;
    inputSebelumnya = inputSekarang;
    inputSekarang = '0'; // Layar utama dikosongin buat ngetik angka kedua
    nyalainLayar();
}

// Jantung utamanya: Kalkulasi!
function calculate() {
    hitungSekarang();
}

function hitungSekarang() {
    let hasil;
    const angka1 = parseFloat(inputSebelumnya);
    const angka2 = parseFloat(inputSekarang);

    // Kalo isinya bukan angka beneran, ya stop aja, gak usah maksa.
    if (isNaN(angka1) || isNaN(angka2)) return;

    // Logika matematika standar
    switch (operatorPilihan) {
        case '+': hasil = angka1 + angka2; break;
        case '−': hasil = angka1 - angka2; break;
        case '×': hasil = angka1 * angka2; break;
        case '÷': hasil = angka2 === 0 ? 'Waduh, Error!' : angka1 / angka2; break;
        default: return;
    }

    // Biar gak menuhin layar kalo hasilnya desimalnya panjang banget
    inputSekarang = hasil.toString().includes('.') ? parseFloat(hasil.toFixed(6)).toString() : hasil.toString();
    
    operatorPilihan = null;
    inputSebelumnya = '';
    nyalainLayar();
}

// Fitur pro: Persen, Akar, Pangkat
function percentage() { inputSekarang = (parseFloat(inputSekarang) / 100).toString(); nyalainLayar(); }
function squareRoot() { 
    let val = parseFloat(inputSekarang);
    inputSekarang = val < 0 ? 'Error' : Math.sqrt(val).toString(); 
    nyalainLayar(); 
}
function square() { inputSekarang = Math.pow(parseFloat(inputSekarang), 2).toString(); nyalainLayar(); }

// Hapus satu-satu kalo salah ketik (Backspace)
function deleteLast() {
    inputSekarang = inputSekarang.length > 1 ? inputSekarang.slice(0, -1) : '0';
    nyalainLayar();
}

// Buat bersihin semuanya
function clearAll() {
    inputSekarang = '0';
    inputSebelumnya = '';
    operatorPilihan = null;
    nyalainLayar();
}

// Terakhir, fungsi buat nampilin perubahan ke mata user
function nyalainLayar() {
    monitorUtama.innerText = inputSekarang;
    // History kecil di atas layar utama
    monitorAtas.innerText = operatorPilihan ? `${inputSebelumnya} ${operatorPilihan}` : '';
}