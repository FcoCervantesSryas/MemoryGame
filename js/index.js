// Extraxt the number of cards from local storage
let numberCards = parseInt(localStorage.getItem("numberCards"));
if (! numberCards){
    numberCards = 10
}
// Let's create the cards
let BaseIcons = [
    '<p><i class="fa-solid fa-cat"></i></p>',
    '<p><i class="fa-solid fa-dog"></i></p>',
    '<p><i class="fa-solid fa-dove"></i></p>',
    '<p><i class="fa-solid fa-fish"></i></p>',
    '<p><i class="fa-solid fa-horse-head"></i></p>',
    '<p><i class="fa-solid fa-spider"></i></p>',
    '<p><i class="fa-solid fa-hippo"></i></p>',
    '<p><i class="fa-solid fa-dragon"></i></p>',
    '<p><i class="fa-solid fa-cow"></i></p>'
]
let icons = BaseIcons.slice(0, numberCards/2)
let space = document.querySelector(".space");
icons = icons.concat(icons)
mix(icons)
for (let index = 1; index <= numberCards; index++) {
    space.innerHTML = space.innerHTML + '<div class="card" id="'+index.toString()+'"><p style="color:rgb(50,50,50);"><i class="fa-solid fa-user-secret"></i></p></div>\n'
}
// Menu buttons
let plusB = document.getElementById("more");
let minusB = document.getElementById("minus");
let reloadB = document.getElementById("reload");
plusB.addEventListener("click", () => {
    if (numberCards < 18){
        numberCards += 2
        localStorage.setItem("numberCards", numberCards);
        location.reload()
    }
})
minusB.addEventListener("click", () => {
    if (numberCards > 2){
        numberCards -= 2
        localStorage.setItem("numberCards", numberCards);
        location.reload()
    }
})
reloadB.addEventListener("click", () => {
    location.reload()
})
// Memory Game
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () =>{
        if ((document.querySelectorAll(".clicked").length <2) && (![...document.querySelectorAll(".opened")].includes(card))){
            open(card)
            if (document.querySelectorAll(".clicked").length ==2){
                setTimeout(() => {
                    clicked1 = [...document.querySelectorAll(".clicked")][0]
                    clicked2 = [...document.querySelectorAll(".clicked")][1]
                    if (clicked1.innerHTML == clicked2.innerHTML){
                        stayopen(clicked1)
                        stayopen(clicked2)
                        if (document.querySelectorAll(".opened").length == numberCards){
                            win()
                        }
                    } else {
                        close(clicked1)
                        close(clicked2)
                    }
                }, 1010);
            }
        }

    })
    
});

// ------------------------FUNCTIONS------------------------
function mix(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function open(card) {
    card.classList.add("clicked")
    setTimeout(() => {
        card.innerHTML = icons[card.id-1]
    }, 500);
}
function stayopen(card){
    card.classList.remove("clicked")
    card.classList.add("opened")
}
function close(card){
    card.classList.remove("clicked")
    card.classList.add("closing")
    console.log("not")
    setTimeout(() => {
        card.innerHTML = '<p style="color:rgb(50,50,50);"><i class="fa-solid fa-user-secret"></i></p>'
        console.log("hi")
    }, 500);
    setTimeout(() => {
        card.classList.remove("closing")
    }, 1000);
}
function win() {
    document.querySelectorAll(".card").forEach(card => {
        card.style.animation = "fliping3 1s 1"
        setTimeout(() => {
            card.innerHTML = '<p class="end"><i class="fa-solid fa-arrows-rotate"></i></p>'
            card.style.color="green"
        }, 500);
    setTimeout(() => {
        location.reload()
    }, 2500);
    });
}