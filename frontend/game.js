let temps = 100
const timer = document.getElementById("timer")
const main =  document.getElementById("main")
let counter = 0;

function createRandomSquares() {
    for (let i = 0; i < 2; i++) {
        let square = document.createElement("div");
        square.style.left = Math.random() * 500 + "px";
        square.style.top = Math.random() * 500 + "px";
        square.style.width = Math.random() * 50 + "px";
        square.style.height = Math.random() * 50 + "px";
        square.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        square.addEventListener("click", function() {
            square.remove();
            counter++;
            console.log(counter);
            setTimeout(createRandomSquares, 500);
        });
        document.body.appendChild(square);



        function diminuerTemps() {
            timer.innerText = temps + " sec"
            temps-- 
            if (temps < 0) {
                timer.innerText = "Temps fini, ton score est de " + counter
                square.style.display = "none"
            }
        }
        setInterval(diminuerTemps, 1000)
    }
}
createRandomSquares();