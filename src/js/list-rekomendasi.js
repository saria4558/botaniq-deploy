import '../css/list-rekomendasi.css';

document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem("token");
    const BASE_API_URL = 'https://previously-notable-hound.ngrok-free.app'; 

    if (!token) {
        alert("Token tidak ditemukan. Silakan login ulang.");
        window.location.href = "login.html"; 
        return;
    } 

    // Ambil profil pengguna
    fetch(`${BASE_API_URL}/profile`, { 
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        }
    })
    .then(res => {
        if (!res.ok) {
            if (res.status === 401) {
                alert("Sesi Anda telah berakhir, silakan login ulang.");
                localStorage.removeItem("token");
                window.location.href = "login.html";
            }
            throw new Error(`Gagal mengambil profil: ${res.statusText}`);
        }
        return res.json();
    })
    .then(data => {
        const profile = data.data || {}; 
        const profileImageUrl = profile.foto ? `${BASE_API_URL}/uploads/${profile.foto}` : "assets/img/profile.jpeg";

        document.querySelectorAll(".profile-circle img").forEach(img => { 
            img.src = profileImageUrl;
        });

        document.querySelectorAll(".profile-avatar-card").forEach(img => {
            img.src = profileImageUrl;
        });
    })
    .catch(err => {
        console.error("Gagal ambil data user atau profil:", err);
        document.getElementById("greeting").textContent = "Gagal memuat profil ❌";
        document.querySelectorAll(".profile-circle img, .profile-avatar-card").forEach(img => {
            img.src = "assets/img/profile.jpeg";
        });
    });

    // Ambil lokasi dan cuaca
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);

                const API_KEY = 'a290da4bf85a0b886d5b613a2dbecd23';
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=id`;

                fetch(weatherUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.main || !data.weather || !data.weather[0]) {
                            throw new Error("Data cuaca tidak lengkap atau salah.");
                        }

                        const suhu = data.main.temp;
                        const kelembapan = data.main.humidity;
                        const tekanan = data.main.pressure;
                        const kecepatanAngin = data.wind.speed;
                        const kondisiCuaca = data.weather[0].description;
                        const namaKota = data.name;
                        const iconCode = data.weather[0].icon;
                        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                        console.log(`Suhu: ${suhu}°C`);
                        console.log(`Kelembapan: ${kelembapan}%`);
                        console.log(`Tekanan udara: ${tekanan} hPa`);
                        console.log(`Kecepatan angin: ${kecepatanAngin} m/s`);
                        console.log(`Cuaca: ${kondisiCuaca}`);
                        console.log(`Lokasi: ${namaKota}`);

                        // Tampilkan info cuaca jika ingin
                        // document.getElementById("weather-info").innerHTML = ...
                    })
                    .catch(error => {
                        console.error("Gagal mengambil data cuaca:", error);
                    });
            },
            function (error) {
                console.error('Gagal mendapatkan lokasi:', error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        console.error('Geolocation tidak didukung browser ini.');
    }

    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Mobile Sidebar Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    function openSidebar() {
        mobileSidebar.style.left = '0';
        overlay.style.display = 'block';
        body.classList.add('sidebar-open');
        body.style.overflow = 'hidden';
    }

    function closeSidebarMenu() {
        mobileSidebar.style.left = '-250px';
        overlay.style.display = 'none';
        body.classList.remove('sidebar-open');
        body.style.overflow = '';
    }

    if (mobileMenuIcon) mobileMenuIcon.addEventListener('click', openSidebar);
    if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarMenu);
    if (overlay) overlay.addEventListener('click', closeSidebarMenu);

    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeSidebarMenu);
    });

    // Navigasi ke halaman lain
    const tanamBtn = document.getElementById("tanam");
    if (tanamBtn) {
        tanamBtn.addEventListener("click", function () {
            window.location.href = "detail-kebun.html";
        });
    }

    const profileImage = document.getElementById("profileImage");
    if (profileImage) {
        profileImage.addEventListener("click", function () {
            window.location.href = "profile-revisi.html";
        });
    }
});
