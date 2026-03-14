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
"skema ini sebagai skema sumber atau skema "transaksional" karena dimaksudkan untuk menyimpan data transaksi bisnis. Nama lain untuk sistem tersebut adalah "System of Record Ada sekumpulan produk (product) yang ditawarkan bisnis untuk dijual dan produk tersebut termasuk dalam hierarki kategori produk. Pelanggan (customer) memesan produk pada unit bisnis. Pesanan (order) terdiri dari beberapa barang pesanan (order item) yang merupakan produk. Pesanan dapat terkait pada promosi (promotion) tertentu dan karyawan penjualan (sales representative) yang membantu pelanggan melakukan pemesanan."

"Beberapa fitur yang perlu diperhatikan antara lain penggunaan surrogate key (Pentaho menyebutnya technical key) di setiap dimensi seperti CUSTOMER_DIM_ID dan PRODUCT_DIM_ID. Masing-masing surrogate key tersebut disertakan dalam tabel SALES_FACT dan digabungkan untuk membentuk sebuah composite key untuk tabel fakta."

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
"Setelah seluruh transformasi selesai dirancang, langkah krusial berikutnya adalah mengatur alur eksekusinya menggunakan PDI Job. Seperti yang terlihat di layar, saya menyusun alur kerja secara sekuensial untuk menjaga integritas data."

"Alur ini dimulai dengan komponen START. Kemudian, sistem akan mengeksekusi lima transformasi dimensi secara berturut-turut: mulai dari load_customer, load_product, load_promotion, load_salesrep, hingga load_date. Urutan ini sangat penting karena tabel dimensi harus terisi terlebih dahulu untuk menyediakan Surrogate Key yang valid."

"Hanya setelah seluruh dimensi berhasil dimuat tanpa kesalahan (ditandai dengan garis hijau/hop positif), sistem akan melanjutkan ke tahap akhir yaitu load_sales_fact. Di sini, tabel fakta akan melakukan lookup ke tabel-tabel dimensi yang baru saja diperbarui untuk mencatat transaksi penjualan.""

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