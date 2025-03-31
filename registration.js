document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".signup-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        if (password !== confirmPassword) {
            alert("Паролі не співпадають!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(user => user.email === email)) {
            alert("Ця електронна пошта вже зареєстрована!");
            return;
        }

        const newUser = { username, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Реєстрація успішна!");
        form.reset();
    });
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