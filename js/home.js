// Lấy tên người dùng từ sessionStorage
const storedUsername = sessionStorage.getItem('username') || null;
const logoutBtn = document.querySelector('.logout-btn');
const loginLink = document.querySelector('.login');



// Kiểm tra xem có dữ liệu trong sessionStorage hay không
if (storedUsername!=null) {
    // Nếu có, thay đổi nội dung liên kết
    
    loginLink.innerHTML = storedUsername; // Thay đổi chữ hiển thị
    loginLink.href = '#';


        // Thêm sự kiện cho tên người dùng
        loginLink.addEventListener('click', function(event) {
         
            
            // Kiểm tra xem nút đăng xuất có đang hiển thị không
            if (logoutBtn.style.display == 'none') {
                logoutBtn.style.display = 'inline-block'; // Hiện nút đăng xuất
            } else  {
                logoutBtn.style.display = 'none'; // Ẩn nút đăng xuất
            }
        });

     } else {
        // Nếu không có người dùng, ẩn nút đăng xuất
        logoutBtn.style.display = 'none';
    }

    // Thêm sự kiện cho nút đăng xuất
    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('username');
        location.reload(); // Reload lại trang khi nhấn nút
                 // Xóa thông tin người dùng từ sessionStorage
         loginLink.textContent = 'Đăng nhập'; // Đặt lại chữ hiển thị
         logoutBtn.style.display = 'none'; // Ẩn nút đăng xuất
         loginLink.href = './signin.html'; // Đặt lại href
         alert("Đăng xuất thành công")
     })




    

document.getElementById('read-button1').addEventListener('click',function(){
    if (storedUsername!=null){
        document.getElementById('temp-link1').click();
    } else{
        alert("Vui lòng đăng nhập");
    }
})
document.getElementById('read-button3').addEventListener('click',function(){
    if (storedUsername!=null){
        document.getElementById('temp-link2').click();
    } else{
        alert("Vui lòng đăng nhập");
    }
})







// // Thêm các truyện mới vào phần tử có ID là "content"
// document.getElementById("content").innerHTML += `
//     <section class="featured-stories">
    
        
//     </section>
// `;
