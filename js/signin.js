// signin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC94Fr3Kfay6r37x40SUAZyiqUn1QeuEXI",
    authDomain: "shopclothes-fb1ee.firebaseapp.com",
    projectId: "shopclothes-fb1ee",
    storageBucket: "shopclothes-fb1ee.appspot.com",
    messagingSenderId: "167806018527",
    appId: "1:167806018527:web:487edef461ce408a2b1a6a",
    measurementId: "G-9KRR8JVQR6"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


let generatedOTP;


document.getElementById("submit").addEventListener('click', function (e) {
    e.preventDefault(); // Ngăn không cho form gửi đi

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Lấy dữ liệu người dùng từ Firebase
    const userRef = ref(db, 'user/' + username);
    get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                // So sánh mật khẩu
                if (userData.password === password) {
                    generatedOTP = generateOTP(); // Tạo mã OTP
                    sendOTP(userData.email, generatedOTP); // Gửi mã OTP
                    alert("Mã OTP đã được gửi đến email của bạn!");
                    console.log(generatedOTP);
                    console.log('Email người nhận là: ', userData.email);
                    showOtpInput(); // Hiện modal nhập OTP
        //         alert("Đăng nhập thành công!");
        // sessionStorage.setItem('username', document.getElementById("username").value);
        // location.replace("./index.html"); // Chuyển hướng sau khi đăng nhập thành công
                } else {
                    alert("Tên tài khoản hoặc mật khẩu không đúng.");
                }
            } else {
                alert("Tên tài khoản không tồn tại.");
            }
        })
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu: ", error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại.");
        });
});

// Hiện modal nhập OTP
function showOtpInput(otp) {
    document.querySelector('.modal').style.display = 'flex'; // Hiện modal nhập OTP
}

document.getElementById('submit-otp').addEventListener('click', function () {
    const inputOtp = document.getElementById('otp').value;

    if (inputOtp === generatedOTP) {
        alert("Đăng nhập thành công!");
        sessionStorage.setItem('username', document.getElementById("username").value);
        location.replace("./index.html"); // Chuyển hướng sau khi đăng nhập thành công
    } else {
        alert("Mã OTP không đúng, vui lòng thử lại.");
    }
});

document.getElementById('exit-otp').addEventListener('click', function () {
    document.querySelector('.modal').style.display = 'none'; // Ẩn modal nhập OTP
    window.location.href = './signin.html'; // Chuyển hướng về trang đăng nhập
});



(function() {
    emailjs.init("w4vPUcYnqPqu1VtYG"); // Thay YOUR_PUBLIC_KEY bằng public key của bạn
})();
// Hàm gửi mã OTP
function sendOTP(email, otp) {
    const templateParams = {
        to_email: email, // Địa chỉ email người nhận
        otp: otp // Mã OTP
    };

    emailjs.send('service_tt426zf', 'template_zm6m69k', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}
// Hàm tạo mã OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Tạo mã OTP ngẫu nhiên từ 1000 đến 9999
}