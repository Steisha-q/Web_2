document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".login-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Перевірка, чи входить адміністратор
        if (email === "admin@gmail.com" && password === "admin") {
            localStorage.setItem("isAdmin", "true");
            localStorage.setItem("loggedInUser", email);
            alert("Вхід як адміністратор успішний!");
            return;
        }

        // Перевірка звичайного користувача
        const user = users.find(user => user.email === email);

        if (!user) {
            alert("Користувача з такою поштою не знайдено!");
            return;
        }

        if (user.password !== password) {
            alert("Неправильний пароль!");
            return;
        }

        // Збереження інформації про звичайного користувача
        localStorage.setItem("isAdmin", "false");
        localStorage.setItem("loggedInUser", email);
        alert("Вхід успішний!");
    });
});

document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    alert("Ви вийшли!");
    window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", () => {
    const adminLink = document.getElementById("admin-link");

    if (adminLink) {
        adminLink.addEventListener("click", function (event) {
            const isAdmin = localStorage.getItem("isAdmin") === "true";

            if (!isAdmin) {
                event.preventDefault();
                alert("Ви не адмін!");
            }
        });
    }
});