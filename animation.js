toggle = (element) => {
    element.querySelector(".heart").classList.toggle("is-active");
    setTimeout(() => {
        element.querySelector(".heart").classList.toggle("is-active");
    }, 1000);
}