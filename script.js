const loginLink = document.getElementById("loginLink");
const loginForm = document.getElementById("loginForm");
const welcomeDiv = document.getElementById("welcome");
const loginDiv = document.getElementById("login");
const contentDiv = document.getElementById("content");

loginLink.addEventListener("click", function(event) {
    event.preventDefault();
    loginDiv.style.display = "block";
    });

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        // Burada admin giriş kontrolü yapılabilir, şimdilik sadece bir kullanıcıya izin verelim.
        if (username === "admin" && password === "password") {
            welcomeDiv.textContent = "Hoşgeldin " + username + "!";
            loginDiv.style.display = "none";
            contentDiv.style.display = "block";
        } else {
            alert("Kullanıcı adı veya şifre yanlış!");
        }
    });