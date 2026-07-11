Panduan Dasar Git

• `git init`

1. Menambahkan Perubahan (Add)
   Sebelum menyimpan perubahan, kita perlu memasukkannya ke dalam staging area.

• Menambahkan file spesifik: `git add <nama_file>`

• Menambahkan semua perubahan di direktori: `git add .`

2. Menyimpan Perubahan (Commit)
   Setelah file berada di staging area, simpan perubahan tersebut ke dalam riwayat Git dengan pesan yang jelas.

• `git commit -m "Pesan commit yang deskriptif"`

3. Manajemen Branch (Cabang)
   Branch digunakan untuk mengembangkan fitur baru tanpa mengganggu kode utama (`main`/`master`).

• Mengecek Branch:

• Melihat daftar branch lokal: `git branch`

• Melihat semua branch (lokal dan remote): `git branch -a`

• Membuat Branch Baru:

• `git branch <nama_branch_baru>`

• Berpindah ke Branch Lain:

• `git checkout <nama_branch>` (atau `git switch <nama_branch>`)

• Membuat dan Langsung Berpindah ke Branch Baru:

• `git checkout -b <nama_branch_baru>` (atau `git switch -c <nama_branch_baru>`)

4. Alur Kerja ke Repository Remote (GitHub/GitLab)
   • Menghubungkan repository lokal ke remote (jika belum): `git remote add origin <URL_repository>`

• Mengirim perubahan dari branch lokal ke remote: `git push origin <nama_branch>`

5. Deployment (Penyebaran Aplikasi)
   Proses deploy tergantung pada platform yang digunakan:

• Platform Cloud/PaaS (seperti Vercel, Netlify, Render): biasanya otomatis melakukan deploy setiap kali ada `git push` ke branch utama (`main`).

• GitHub Pages: Bisa diatur lewat menu Settings -> Pages pada repository, lalu pilih branch yang ingin di-deploy.

• Server Sendiri (VPS): Biasanya melibatkan proses `git pull` langsung di dalam server untuk memperbarui kode.

Untuk mengecek repository mana yang terhubung dengan folder lokal:

• `git remote -v` (Melihat URL fetch dan push)

• `git remote show origin` (Melihat informasi detail branch remote)

• `git remote set-url origin <URL_baru>` (Mengubah URL repository)
