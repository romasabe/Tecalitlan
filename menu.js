// Variables
var ordered = [null];
var totalPrice = 0;
var menuCreate = document.getElementById("menu");
var dispPrice = document.getElementById("price");
var dispCount = document.getElementById("count")
var sectionDiv;
//Main Code
/* Called when a button on the menu screen is clicked,
    Takes the name of the item being ordered or cancelled, 
    its section, and if the button is calling for a decline
    in items or a increase in items.
*/
function select(itemName, itemClass, decline) {
    // Runs through the entire menu to find the section within the menu
    for (var x = 0; x < menu.length; x++) {
        if (menu[x][0] == itemClass) {
            let sect = menu[x];
            // Runs through the entire section of the menu that is selected
            for (var z = 0; z < sect.length; z++) {
                if (sect[z].menuItem == itemName) {
                    if (decline == 1) {
                        // Removes an item
                        deOrder(sect[z]);
                        break;
                    } else {
                        // adds an item
                        order(sect[z]);
                        break;
                    }
                }
            }

        }
    }
}

// adds an item to the order
function order(section) {
    totalPrice += section.price;
    priceCount();
    ordered.push(section.menuItem);
    alert(totalPrice);
}

// remove an item from the order
function deOrder(section) {
    let includeBool = ordered.includes(section.menuItem)
    if (includeBool == true) {
        totalPrice -= section.price;
        for (var y = 0; y < ordered.length; y++) {
            if (ordered[y] == section.menuItem) {
                ordered.splice(y, 1);
                break;
            }
        }
        alert(totalPrice);
    }
}
function display(sectClass){
    removeElements()
    // Runs through the entire menu to find the section within the menu
    for (var x = 0; x < menu.length; x++) {
        let sectName = menu[x][0];
        if (sectName == sectClass){
            let sect = menu[x];
            sectionDiv = document.createElement("div")
            sectionDiv.id = "menuDisplay";
            sectionDiv.classList.add("row", "ubuntu-sans", )
            menuCreate.appendChild(sectionDiv);
            for (var p = 1; p < sect.length; p++){
                createCard(sectName, sect[p]);
            }
            break;
        }
    }
}
function removeElements(){
    if(sectionDiv != null){
        sectionDiv.remove()
    }
}
function createCard(menuStuff, section){
// Creates card div
let sizingDiv = document.createElement("div");
sectionDiv.classList.add("col-sm-6", "mb-3", "mb-sm-0")
sectionDiv.appendChild(sizingDiv);
let newCard = document.createElement("div");
newCard.classList.add("card", "cardStyle");
sizingDiv.appendChild(newCard);
// card content
let newContent = document.createElement("div");
newContent.classList.add("card-body", "newElement");
newCard.appendChild(newContent);
// card title
let newTitle = document.createElement("h5");
newTitle.classList.add("card-title","newElement");
// title text
let newText = document.createTextNode(String(section.menuItem));
newTitle.appendChild(newText);
// price text
let newPrice = document.createElement("h6");
let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
let priceText = document.createTextNode("Price: " + USDollar.format(section.price));
newPrice.classList.add("newElement");
newPrice.appendChild(priceText);
// order button
let newButton = document.createElement("button");
newButton.classList.add(menuStuff, "btn", "btn-primary", "newElement");
newButton.id = String(section.menuItem);
newButton.onclick = function() { select(this.id, this.classList.item(0), 0); };
let buttonText = document.createTextNode("Add");
newButton.appendChild(buttonText);
// remove button
let removeButton = document.createElement("button");
removeButton.classList.add(menuStuff, "btn", "btn-primary", "newElement");
removeButton.id = String(section.menuItem);
removeButton.onclick = function() { select(this.id, this.classList.item(0), 1); };
let removeText = document.createTextNode("Remove");
removeButton.appendChild(removeText);
// adding everything together
newContent.append(newTitle, newPrice, newButton, removeButton);
}

function active(itemGiven, selectId) {
    if (selectId != "active"){
        let removeIds = document.getElementsByClassName("call");
        for (var f = 0; f < removeIds.length; f++){
            removeIds.item(f).id = null;
        }
        itemGiven.id = "active";
    }
}
// When called updates the total price and count and displays it.
function priceCount(){
    dispPrice.innerHTML = totalPrice;
    dispCount.innerHTML = ordered.length;
}
//menu (move later)
const menu = [
    appetizers = [
        "appetizers",
        guacamole = {
            price: 12.00,
            menuIndex: 0,
            group: "appetizers",
            menuItem: "Guacamole",
        },
        trio = {
            price: 14.00,
            menuIndex: 1,
            group: "appetizers",
            menuItem: "Trio",
        },
        pulpo_a_la_mexicana = {
            price: 14.00,
            menuIndex: 2,
            group: "appetizers",
            menuItem: "Pulpo a La Mexicana",
        },
        queso_fundido = {
            price: 10.00,
            menuIndex: 3,
            group: "appetizers",
            menuItem: "Queso Fundido",
        },
        nachos = {
            price: 10.00,
            menuIndex: 4,
            group: "appetizers",
            menuItem: "Nachos",
        },
    ],
    //Soups and Salads Menu
    soups_and_salads = [
        "soupsSalads",
        caldo_de_pollo = {
            price: 13.00,
            menuIndex: 0,
            group: "Soups and Salads",
            menuItem: "Caldo de Pollo",
        },
        sopa_de_torilla = {
            price: 6.00,
            menuIndex: 1,
            group: "Soups and Salads",
            menuItem: "Sopa de Tortilla",
        },
        pozole = {
            price: 10.00,
            menuIndex: 2,
            group: "Soups and Salads",
            menuItem: "Pozole",
        },
        taco_salad = {
            price: 14.00,
            menuIndex: 3,
            group: "Soups and Salads",
            menuItem: "Taco Salad",
        },
        tecalitlan_salad = {
            price: 14.00,
            menuIndex: 4,
            group: "Soups and Salads",
            menuItem: "Tecalitlan Salad",
        },
    ],
    //Desayunos(Breakfast) Menu
    breakfast = [
        "breakfast",
        chilaquiles = {
            price: 14.00,
            menuIndex: 0,
            group: "Breakfast",
            menuItem: "Chilaquiles",
        },
        breakfast_burrito = {
            price: 12.00,
            menuIndex: 1,
            group: "Breakfast",
            menuItem: "Breakfest Burrito",
        },
        huevos_a_la_mexicana = {
            price: 13.00,
            menuIndex: 2,
            group: "Breakfest",
            menuItem: "Huevos a La Mexicana"
        },
        pancakes_la_abulita = {
            price: 9.00,
            menuIndex: 3,
            group: "Breakfest",
            menuItem: "Pancakes La Abuelita",
        },
        mollete = {
            price: 8.00,
            menuIndex: 4,
            group: "Breakfest",
            menuItem: "Mollete",
        },
    ],
    //Tacos, Burritos, Tortas, and Fajitas Menu
    tortillas = [
        "tortillas",
        three_taco_order = {
            price: 12.75,
            menuIndex: 0,
            group: "Tacos",
            menuItem: "3 Taco Order",
        },
        three_taco_dinner = {
            price: 17.75,
            menuIndex: 1,
            group: "Tacos",
            menuItem: "3 Taco Dinner",
        },
        kids_taco_dinner = {
            price: 9.00,
            menuIndex: 2,
            group: "Tacos",
            menuItem: "Kids Taco Dinner",
        },
        quesabirria_dinner = {
            price: 20.00,
            menuIndex: 3,
            group: "Tacos",
            menuItem: "Quesabirria Dinner",
        },
        porkbelly_three_taco_dinner = {
            price: 19.00,
            menuIndex: 4,
            group: "Tacos",
            menuItem: "Pork Belly 3 Taco Order",
        },
        burrito = {
            price: 12.00,
            menuIndex: 5,
            group: "Burritos",
            menuItem: "Burrito",
        },
        burrito_combo = {
            price: 12.00,
            menuIndex: 6,
            group: "Burritos",
            menuItem: "Burrito Combo",
        },
        burrito_dinner = {
            price: 14.00,
            menuIndex: 7,
            group: "Burritos",
            menuItem: "Burrito Dinner",
        },
        burrito_combo_dinner = {
            price: 15.00,
            menuIndex: 8,
            group: "Burritos",
            menuItem: "Burrito Combo Dinner",
        },
        el_jefe_burrito = {
            price: 18.00,
            menuIndex: 9,
            group: "Burritos",
            menuItem: "El Jefe Burrito",
        },
        torta = {
            price: 9.50,
            menuIndex: 10,
            group: "Tortas",
            menuItem: "Torta",
        },
        torta_combo = {
            price: 10.00,
            menuIndex: 11,
            group: "Tortas",
            menuItem: "Torta Combo",
        },
        torta_dinner = {
            price: 13.00,
            menuIndex: 12,
            group: "Tortas",
            menuItem: "Torta Dinner",
        },
        torta_combo_dinner = {
            price: 14.00,
            menuIndex: 13,
            group: "Tortas",
            menuItem: "Torta Combo Dinner",
        },
        quesabirria = {
            price: 12.00,
            menuIndex: 14,
            group: "Tortas",
            menuItem: "Quesabirria",
        },
        steak_fajitas = {
            price: 26.00,
            menuIndex: 15,
            group: "Fajitas",
            menuItem: "Steak Fajitas",
        },
        veggie_fajitas = {
            price: 19.00,
            menuIndex: 16,
            group: "Fajtas",
            menuItem: "Veggie Fajitas",
        },
        chicken_fajitas = {
            price: 22.00,
            menuIndex: 17,
            group: "Fajitas",
            menuItem: "Chicken Fajitas",
        },
        steak_chicken_fajitas = {
            price: 25.00,
            menuIndex: 18,
            group: "Fajitas",
            menuItem: "Steak and Chicken Fajitas",
        },
        shrimp_and_veggie_fajitas = {
            price: 25.00,
            menuIndex: 19,
            group: "Fajitas",
            menuItem: "Shrimp and Veggie Fajitas",
        },
    ],
    //Sides Menu
    sides = [
        "sides",
        sour_cream = {
            price: 1.00,
            menuIndex: 0,
            group: "Sides",
            menuItem: "Sour Cream",
        },
        guacamole = {
            price: 2.00,
            menuIndex: 1,
            group: "Sides",
            menuItem: "Guacamole",
        },
        rice = {
            price: 4.00,
            menuIndex: 2,
            group: "Sides",
            menuItem: "Rice",
        },
        beans = {
            price: 4.00,
            menuIndex: 3,
            group: "Sides",
            menuItem: "Beans",
        },
        shredded_cheese = {
            price: 2.00,
            menuIndex: 4,
            group: "Sides",
            menuItem: "Shredded Cheese",
        },
    ],
    //Desserts Menu
    desserts = [
        "desserts",
        vanilla_flan = {
            price: 6.00,
            menuIndex: 0,
            group: "Desserts",
            menuItem: "Vanilla Flan",
        },
        coconut_flan = {
            price: 6.00,
            menuIndex: 1,
            group: "Desserts",
            menuItem: "Coconut Flan",
        },
        guava_flan = {
            price: 6.00,
            menuIndex: 2,
            group: "Desserts",
            menuItem: "Guava Flan",
        },
        churros = {
            price: 5.00,
            menuIndex: 3,
            group: "Desserts",
            menuItem: "Churros",
        },
        tres_leches_cake = {
            price: 7.00,
            menuIndex: 4,
            group: "Desserts",
            menuItem: "Tres Leches Cake",
        },
    ],
    //Drinks Menu
    drinks = [
        "drinks",
        coke = {
            price: 3.00,
            menuIndex: 0,
            group: "Drinks",
            menuItem: "Coke",
        },
        sprite = {
            price: 3.00,
            menuIndex: 1,
            group: "Drinks",
            menuItem: "Sprite",
        },
        horchata = {
            price: 3.50,
            menuIndex: 2,
            group: "Drinks",
            menuItem: "Horchata",
        },
        topo_chico = {
            price: 4.00,
            menuIndex: 3,
            group: "Drinks",
            menuItem: "Topo-Chico",
        },
        jarrito = {
            price: 4.00,
            menuIndex: 4,
            group: "Drinks",
            menuItem: "Jarrito",
        },
    ],
]
display("appetizers");