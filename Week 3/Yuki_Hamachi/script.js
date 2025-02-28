document.addEventListener("DOMContentLoaded", function () {
    function addOneToCounter(event) {
        let counterElement = document.getElementById("counter");
        counterElement.innerText = parseInt(counterElement.innerText) + 1;

        let heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.style.position = "absolute";
        heart.style.left = event.clientX + "px";
        heart.style.top = event.clientY + "px";
        heart.style.fontSize = "100px";
        heart.style.opacity = "1";
        heart.style.transition = "all 1s ease-out";
        heart.style.pointerEvents = "none";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = "translateY(-50px)";
            heart.style.opacity = "0";
        }, 100);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    
    }


    let cookieImg = document.getElementById("cookieImg");
    cookieImg.addEventListener("click", addOneToCounter);
});
