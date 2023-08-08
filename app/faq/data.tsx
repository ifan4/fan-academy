export interface faqType {
    title: string,
    description: string
}

export const FaqData:faqType[] = [
    {
        title: 'Bagaimana cara masuk ke akun saya?',
        description: 'Anda dapat masuk ke akun Anda dengan mengklik opsi "Login" di bagian atas halaman dan mengisi formulir dengan detail akun Anda. Jika belum mempunyai akun, maka silahkan klik tombol "Sign Up" untuk mendaftar terlebih dahulu'
    },
    {
        title: 'Bagaimana cara mendaftar untuk akun baru?',
        description: 'Untuk mendaftar, pilih opsi "Sign Up" dan isi formulir dengan informasi yang diperlukan, seperti nama, alamat email, dan kata sandi.'
    },
    {
        title: 'Apa yang bisa saya lihat di Halaman Dashboard?',
        description: 'Di Halaman Dashboard, Anda dapat melihat aktivitas dan ringkasan Anda dalam quiz.'
    },
    {
        title: ' Bagaimana cara mengedit profil saya?',
        description: 'Pergi ke Halaman Profile, kemudian masukkan formulir sesuai yang ingin diedit dan klik tombol "Update Profil". Anda dapat mengubah detail seperti nama, atau informasi lainnya.'
    },
    {
        title: 'Apa yang akan saya temukan di Halaman Detail Kelas?',
        description: 'Di Halaman Detail Kelas, Anda akan menemukan informasi rinci tentang kelas termasuk daftar materi, deskripsi kelas, dan topik yang akan dibahas.'
    },
    {
        title: 'Apa yang saya dapatkan di Halaman Detail Materi?',
        description: 'Di Halaman Detail Materi, Anda dapat mengakses materi pelajaran beserta melihat e-modul yang mungkin diperlukan.'
    },
    {
        title: 'Bagaimana saya bisa mengakses Modul Materi?',
        description: 'Pada Halaman Detail Materi, Anda dapat menemukan modul materi yang tersedia untuk diakses bersama dengan tombol "Lihat Modul".'
    },
    {
        title: 'Mengapa pada beberapa bagian materi tidak terdapat modul atau quiz?',
        description: 'Jika quiz atau modul tidak ada, artinya pada bagian tersebut tidak membutuhkan modul atau quiz. Modul mungkin masih sama seperti di chapter sebelum-sebelumnya, maka cek modul-modul sebelumnya jika pada beberapa chapter tidak terdapat e-modul'
    },
    {
        title: 'Apa yang saya temukan di Halaman Quiz?',
        description: 'Di Halaman Quiz, Anda akan menemukan pertanyaan-pertanyaan yang akan menguji pemahaman Anda terhadap materi yang telah dipelajari.'
    },
    {
        title: 'Bagaimana cara melihat skor hasil kuis saya?',
        description: 'Pada Halaman Hasil Quiz, Anda dapat melihat skor hasil kuis setelah Anda menyelesaikan quiz.'
    },
]