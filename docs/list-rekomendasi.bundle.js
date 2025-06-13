/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/list-rekomendasi.css":
/*!**************************************!*\
  !*** ./src/css/list-rekomendasi.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://capstone-project-webpack/./src/css/list-rekomendasi.css?");

/***/ }),

/***/ "./src/js/list-rekomendasi.js":
/*!************************************!*\
  !*** ./src/js/list-rekomendasi.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_list_rekomendasi_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/list-rekomendasi.css */ \"./src/css/list-rekomendasi.css\");\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var token = localStorage.getItem(\"token\");\n  var BASE_API_URL = 'https://previously-notable-hound.ngrok-free.app';\n  if (!token) {\n    alert(\"Token tidak ditemukan. Silakan login ulang.\");\n    window.location.href = \"login.html\";\n    return;\n  }\n\n  // Ambil profil pengguna\n  fetch(\"\".concat(BASE_API_URL, \"/profile\"), {\n    method: 'GET',\n    headers: {\n      \"Authorization\": \"Bearer \".concat(token),\n      \"ngrok-skip-browser-warning\": \"true\"\n    }\n  }).then(function (res) {\n    if (!res.ok) {\n      if (res.status === 401) {\n        alert(\"Sesi Anda telah berakhir, silakan login ulang.\");\n        localStorage.removeItem(\"token\");\n        window.location.href = \"login.html\";\n      }\n      throw new Error(\"Gagal mengambil profil: \".concat(res.statusText));\n    }\n    return res.json();\n  }).then(function (data) {\n    var profile = data.data || {};\n    var profileImageUrl = profile.foto ? \"\".concat(BASE_API_URL, \"/uploads/\").concat(profile.foto) : \"assets/img/profile.jpeg\";\n    document.querySelectorAll(\".profile-circle img\").forEach(function (img) {\n      img.src = profileImageUrl;\n    });\n    document.querySelectorAll(\".profile-avatar-card\").forEach(function (img) {\n      img.src = profileImageUrl;\n    });\n  })[\"catch\"](function (err) {\n    console.error(\"Gagal ambil data user atau profil:\", err);\n    document.getElementById(\"greeting\").textContent = \"Gagal memuat profil ❌\";\n    document.querySelectorAll(\".profile-circle img, .profile-avatar-card\").forEach(function (img) {\n      img.src = \"assets/img/profile.jpeg\";\n    });\n  });\n\n  // Ambil lokasi dan cuaca\n  if ('geolocation' in navigator) {\n    navigator.geolocation.getCurrentPosition(function (position) {\n      var latitude = position.coords.latitude;\n      var longitude = position.coords.longitude;\n      console.log('Latitude:', latitude);\n      console.log('Longitude:', longitude);\n      var API_KEY = 'a290da4bf85a0b886d5b613a2dbecd23';\n      var weatherUrl = \"https://api.openweathermap.org/data/2.5/weather?lat=\".concat(latitude, \"&lon=\").concat(longitude, \"&appid=\").concat(API_KEY, \"&units=metric&lang=id\");\n      fetch(weatherUrl).then(function (response) {\n        return response.json();\n      }).then(function (data) {\n        if (!data.main || !data.weather || !data.weather[0]) {\n          throw new Error(\"Data cuaca tidak lengkap atau salah.\");\n        }\n        var suhu = data.main.temp;\n        var kelembapan = data.main.humidity;\n        var tekanan = data.main.pressure;\n        var kecepatanAngin = data.wind.speed;\n        var kondisiCuaca = data.weather[0].description;\n        // const namaKota = data.name;\n        var iconCode = data.weather[0].icon;\n        // const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;\n\n        console.log(\"Suhu: \".concat(suhu, \"\\xB0C\"));\n        console.log(\"Kelembapan: \".concat(kelembapan, \"%\"));\n        console.log(\"Tekanan udara: \".concat(tekanan, \" hPa\"));\n        console.log(\"Kecepatan angin: \".concat(kecepatanAngin, \" m/s\"));\n        console.log(\"Cuaca: \".concat(kondisiCuaca));\n        // console.log(`Lokasi: ${namaKota}`);\n\n        // Tampilkan info cuaca jika ingin\n        // document.getElementById(\"weather-info\").innerHTML = ...\n      })[\"catch\"](function (error) {\n        console.error(\"Gagal mengambil data cuaca:\", error);\n      });\n    }, function (error) {\n      console.error('Gagal mendapatkan lokasi:', error.message);\n    }, {\n      enableHighAccuracy: true,\n      timeout: 10000,\n      maximumAge: 0\n    });\n  } else {\n    console.error('Geolocation tidak didukung browser ini.');\n  }\n\n  // Toggle password visibility\n  var togglePassword = document.getElementById('togglePassword');\n  var passwordInput = document.getElementById('password');\n  if (togglePassword && passwordInput) {\n    togglePassword.addEventListener('click', function () {\n      var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';\n      passwordInput.setAttribute('type', type);\n      this.classList.toggle('fa-eye');\n      this.classList.toggle('fa-eye-slash');\n    });\n  }\n\n  // Mobile Sidebar Toggle\n  var mobileMenuIcon = document.querySelector('.mobile-menu-icon');\n  var mobileSidebar = document.querySelector('.mobile-sidebar');\n  var closeSidebar = document.querySelector('.close-sidebar');\n  var overlay = document.querySelector('.overlay');\n  var body = document.body;\n  function openSidebar() {\n    mobileSidebar.style.left = '0';\n    overlay.style.display = 'block';\n    body.classList.add('sidebar-open');\n    body.style.overflow = 'hidden';\n  }\n  function closeSidebarMenu() {\n    mobileSidebar.style.left = '-250px';\n    overlay.style.display = 'none';\n    body.classList.remove('sidebar-open');\n    body.style.overflow = '';\n  }\n  if (mobileMenuIcon) mobileMenuIcon.addEventListener('click', openSidebar);\n  if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarMenu);\n  if (overlay) overlay.addEventListener('click', closeSidebarMenu);\n  var mobileNavLinks = document.querySelectorAll('.mobile-nav a');\n  mobileNavLinks.forEach(function (link) {\n    link.addEventListener('click', closeSidebarMenu);\n  });\n\n  // Navigasi ke halaman lain\n  var tanamBtn = document.getElementById(\"tanam\");\n  if (tanamBtn) {\n    tanamBtn.addEventListener(\"click\", function () {\n      window.location.href = \"detail-kebun.html\";\n    });\n  }\n  var profileImage = document.getElementById(\"profileImage\");\n  if (profileImage) {\n    profileImage.addEventListener(\"click\", function () {\n      window.location.href = \"profile-revisi.html\";\n    });\n  }\n});\n\n//# sourceURL=webpack://capstone-project-webpack/./src/js/list-rekomendasi.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/list-rekomendasi.js");
/******/ 	
/******/ })()
;