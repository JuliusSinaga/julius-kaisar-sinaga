# SKRIP VIDEO DEMONSTRASI: IMPLEMENTASI SISTEM ETL (P02)
**Mata Kuliah:** 12S3202 - Gudang Data dan Kecerdasan Bisnis
**Penyusun:** Julius Kaisar Bona Theo Sinaga (12S23035)

---

## I. PENDAHULUAN
**Visual:** Wajah presenter dengan latar belakang lingkungan kampus atau workspace bersih. Tampilkan teks di layar: Nama, NIM, dan Judul Proyek.

**Narasi:**
"Halo, salam sejahtera. Saya Julius Kaisar Bona Theo Sinaga dengan NIM 12S23035, mahasiswa program studi Sistem Informasi di Institut Teknologi Del. Pada kesempatan kali ini, saya akan mendemonstrasikan hasil implementasi sistem Extract, Transform, and Load atau ETL. Proyek ini bertujuan untuk memindahkan dan mengintegrasikan data dari skema operasional 'Order Entry' ke dalam 'Sales History Data Mart' yang menggunakan arsitektur skema bintang, guna mendukung kebutuhan analisis bisnis."

---

## II. PERANGKAT LUNAK
**Visual:** Screen recording menampilkan antarmuka awal Pentaho Data Integration (Spoon).

**Narasi:**
"Dalam pengembangan sistem ETL ini, saya menggunakan Pentaho Data Integration versi Community Edition, atau yang lebih dikenal sebagai Spoon. Perangkat lunak ini bertindak sebagai alat utama dalam mendesain alur transformasi data. Untuk manajemen basis datanya, saya menggunakan DBMS SQL Server sebagai media penyimpanan baik untuk System of Record maupun Data Mart target."

---

## III. DATA SUMBER & TARGET
**Visual:** Tampilkan diagram skema database (ERD) side-by-side. Sorot tabel-tabel di Order Entry, lalu sorot tabel di Sales History.

**Narasi:**
"Mari kita lihat struktur data kita. Di sisi kiri adalah sistem transaksional 'Order Entry' yang merupakan System of Record kita. Data ini bersifat dinamis dan ternormalisasi. Di sisi kanan adalah 'Sales History Data Mart' dengan model Skema Bintang. 

Penting untuk dicatat bahwa dalam Data Mart ini, kita membedakan antara 'Business Key' dan 'Surrogate Key' atau Technical Key. Business Key adalah identitas asli data dari sistem sumber, sedangkan Surrogate Key adalah primary key buatan yang kita gunakan untuk menjaga integritas data di gudang data, terutama untuk melacak riwayat perubahan data secara historis."

---

## IV. TRANSFORMASI (6 KOMPONEN UTAMA)

### 1. Date Dimension Table
**Visual:** Tunjukkan langkah 'Generate Rows' dan 'Calculator' di Spoon.
**Narasi:**
"Transformasi pertama adalah pembangunan Dimensi Waktu. Di sini saya menggunakan step 'Generate Rows' untuk membuat rentang tanggal dan step 'Calculator' untuk mengekstrak atribut seperti tahun, kuartal, dan bulan. Hal ini krusial agar bisnis dapat melakukan analisis tren penjualan berdasarkan periode waktu tertentu."

### 2. Promotion Dimension (SCD Tipe 1)
**Visual:** Klik dua kali pada step 'Dimension Lookup/Update' untuk tabel Promotion.
**Narasi:**
"Untuk tabel Dimensi Promosi, saya menerapkan Slowly Changing Dimension (SCD) Tipe 1 menggunakan metode 'Punch Through'. Artinya, jika ada perubahan pada data promosi di sumber, sistem akan langsung menimpa (overwrite) data lama di target. Metode ini dipilih karena kita hanya membutuhkan informasi promosi yang paling mutakhir tanpa perlu menyimpan riwayat perubahan sebelumnya."

### 3. Product Dimension (SCD Tipe 1)
**Visual:** Tunjukkan alur transformasi produk dan pratinjau data.
**Narasi:**
"Sama halnya dengan promosi, Dimensi Produk juga diimplementasikan dengan SCD Tipe 1. Proses ini melibatkan pembersihan data dari file CSV sumber, memastikan format data konsisten sebelum dimuat ke dalam tabel dimensi produk di SQL Server."

### 4. Sales Representative Dimension (SCD Tipe 2)
**Visual:** Tunjukkan kolom 'date_from' dan 'date_to' pada konfigurasi step.
**Narasi:**
"Pada Dimensi Sales Representative, saya menggunakan SCD Tipe 2. Berbeda dengan Tipe 1, SCD Tipe 2 memungkinkan kita menyimpan riwayat perubahan. Jika seorang sales representative berpindah wilayah tugas, sistem tidak menghapus data lama, melainkan membuat baris baru dengan menandai masa berlaku melalui atribut 'date_from' dan 'date_to'. Ini penting untuk akurasi laporan kinerja sales berdasarkan periode waktu."

### 5. Customer Dimension (SCD Tipe 2)
**Visual:** Tunjukkan simulasi perubahan data pelanggan di file sumber dan jalankan transformasinya.
**Narasi:**
"Dimensi Pelanggan juga menggunakan SCD Tipe 2. Hal ini dilakukan secara rasional karena profil pelanggan, seperti alamat, dapat berubah. Dengan merekam versi data lama dan baru, perusahaan tetap dapat menganalisis pola pembelian pelanggan di lokasi lama sebelum mereka pindah ke lokasi baru."

### 6. Sales Fact Table
**Visual:** Tunjukkan penggabungan banyak 'Hop Connection' menuju Fact Table. Paparkan formula perhitungan dollars_sold.
**Narasi:**
"Komponen terakhir adalah Fact Table Sales. Di sini, saya melakukan lookup ke semua tabel dimensi menggunakan Surrogate Key yang telah dibuat sebelumnya. Saya juga melakukan kalkulasi pada metrik 'dollars_sold' dan 'amount_sold'. Tabel fakta inilah yang menjadi pusat analisis, menghubungkan semua dimensi untuk memberikan gambaran performa bisnis secara menyeluruh."

---

## V. JOB (WORKFLOW)
**Visual:** Tampilkan layar Job (.kjb) yang berisi Start -> Wait for File -> Transformations.

**Narasi:**
"Untuk mengotomatisasi seluruh proses ini, saya menyusun sebuah 'Job'. Alurnya dimulai dari step 'Start', diikuti dengan 'Wait for File' untuk memastikan data sumber tersedia, kemudian mengeksekusi urutan transformasi secara logis. Penggunaan Job memastikan bahwa pemuatan data ke Tabel Fakta hanya terjadi setelah semua Tabel Dimensi berhasil diperbarui, menjaga integritas referensial dalam gudang data."

---

## VI. VALIDASI
**Visual:** Buka Database Explorer atau SQL Server Management Studio. Tampilkan hasil query `SELECT TOP 10 *` dari Fact Table dan tabel dimensi yang menggunakan SCD Tipe 2.

**Narasi:**
"Sekarang kita masuk ke tahap validasi. Seperti yang terlihat pada Database Explorer, data telah berhasil dimuat. Perhatikan pada tabel dimensi pelanggan, terdapat beberapa entri untuk pelanggan yang sama namun dengan Surrogate Key yang berbeda, yang membuktikan bahwa SCD Tipe 2 bekerja dengan benar. Data pada Sales Fact juga telah terisi secara akurat sesuai dengan perhitungan yang kita definisikan."

---

## VII. KESIMPULAN
**Visual:** Kembali ke wajah presenter (Julius).

**Narasi:**
"Secara keseluruhan, sistem ETL ini telah berhasil mengintegrasikan data operasional ke dalam skema bintang yang siap digunakan untuk keperluan Business Intelligence. Implementasi strategi SCD Tipe 1 dan Tipe 2 yang tepat sangat krusial; Tipe 1 untuk efisiensi data yang tidak sensitif terhadap riwayat, dan Tipe 2 untuk menjaga integritas data historis. Dengan sistem ini, pengambilan keputusan berbasis data dapat dilakukan dengan lebih akurat dan terstruktur. Demikian presentasi saya, terima kasih atas perhatiannya."

---
**Visual:** Tampilkan layar hitam dengan teks: "Terima Kasih | Institut Teknologi Del 2026".