document.addEventListener("DOMContentLoaded", e => {
    const burger = document.querySelector("#burger");
    const nav = document.querySelector("#mobile_nav");

    burger.addEventListener("click", e => {
        burger.classList.toggle("active");
        nav.classList.toggle("active");
    })
});