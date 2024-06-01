/* Important built in functions to note:
    document.getElementById(""): gets an element by its id
    document.getElementsByClassName(""): puts all elements of a class in an array like object
    .push(): adds a value to the end of an array
    .splice(index, numberOfItemsDeleted): Deletes any element from an array and adjusts the index accordingly. First argument states the starting index that will be deleted
        and the second defines how many items will be deleted in total.
    .createElement(""): creates an element and adds it to the DOM
    .classList: allows you to access a list of all of an elements classes, can only be changed with other functions.
    .add(""): allows you to add classes to an element. each class must be seperated by a comma.
    .append(appendedChildren) and .appendChild(appendedChild): very simillar functions that allow you to add elements under already existing elements and change the structure
         of the dom. .append("") allows you to add many children at once that are all on the same level of the DOM while .appendChild("") only allows you to add one child.
    .createTextNode(""): allows you to create text that can be added anywhere, must be appended to the element you want to add text to.
    .onclick = function () { } allows you to add an onclick event to an element
    this = refers to the element that you are using
    .id = accesses the ids of the selected element
    .item(""): accesses one class of a selected index from an element
    .remove(): completly removes an element from the DOM. when used with .id or .classList it can remove ids and classes
    .textContent: allows you to change the text content of an element that already exists
    .includes: checks if a certain item is within an array
    String(): converts a value into a string
    .length: returns the length of an array, always one more than the index of an array.
    break; ends a function early
*/

// Variables
// holds an array of all the items in your cart
var ordered = [];
// holds an array of all the prices of the items in your cart
var prices = [];
// holds the total price of all items ordered
var totalPrice = 0;
// Holds the DOM element where the menu is displayed
var menuCreate = document.getElementById("menu");
// Holds the DOM element where the ammount of items in your cart is held
var dispCount = document.getElementById("count");
// Used later to form the div that holds the menu items that are displayed
var sectionDiv;
// allows for the price to be displayed in USD format
var USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
// A boolean variable that is toggled on whenever the cart button is clicked
var displayed = false;
var submitBtn = document.getElementById("submitBtn");
var currentTip = 0.15;
//Main Code
/* Called when a button on the menu screen is clicked,
    Takes the name of the item being ordered or cancelled, 
    its section, and if the button is calling for a decline
    in items or a increase in items.
*/
function select(itemName, itemClass, decline) {
    // Runs through the entire menu to find the section within the menu that the item is in
    for (var x = 0; x < menu.length; x++) {
        if (menu[x][0] == itemClass) {
            let sect = menu[x];
            // Runs through the entire section of the menu that is selected
            for (var z = 0; z < sect.length; z++) {
                if (sect[z].menuItem == itemName) {
                    if (decline == 1) {
                        // Removes an item
                        deOrder(sect[z]);
                        update();
                        break;
                    } else {
                        // adds an item
                        order(sect[z]);
                        update();
                        break;
                    };
                };
            };
        };
    };
};

// adds an item to the order and updates the total price
function order(section) {
    totalPrice += section.price;
    ordered.push(section.menuItem);
    prices.push(section.price);
    priceCount();
};

// remove an item from the order if it has been ordered
function deOrder(section) {
    // checks if the item that called has already been ordered
    let includeBool = ordered.includes(String(section.menuItem));
    // if the item has been ordered the function will continue
    if (includeBool === true) {
        totalPrice -= section.price;
        // runs through the ordered array 
        for (var y = 0; y < ordered.length; y++) {
            // if the current ordered item is the same as the one that the button represents then the function will continue
            if (ordered[y] == section.menuItem) {
                ordered.splice(y, 1);
                prices.splice(y, 1);
                priceCount();
                break;
            };
        };
    };
};

// displays all items in a section calls the removeElements() and createCard(menuStuff, section) functions
function display(sectClass) {
    removeElements();
    // Runs through the entire menu to find the section within the menu
    for (var x = 0; x < menu.length; x++) {
        let sectName = menu[x][0];
        // if the section that has been called is equal to the class of the button, it will then create the menu list
        if (sectName == sectClass) {
            let sect = menu[x];
            sectionDiv = document.createElement("div")
            sectionDiv.id = "menuDisplay";
            sectionDiv.classList.add("row", "ubuntu-sans");
            menuCreate.appendChild(sectionDiv);
            for (var p = 1; p < sect.length; p++) {
                createCard(sectName, sect[p]);
            }
            break;
        };
    };
};

// removes all displayed list items if there is something displayed when called
function removeElements() {
    if (sectionDiv != null) {
        sectionDiv.remove();
    }
};

// Creates each individual menu item
function createCard(menuStuff, section) {
    // Creates div that defines the size of each card
    let sizingDiv = document.createElement("div");
    sizingDiv.classList.add("col-sm-6", "mb-3", "mb-sm-0", "cardHeight");
    sectionDiv.appendChild(sizingDiv);
    // Creates the div that defines the bootstrap card
    let newCard = document.createElement("div");
    newCard.classList.add("card", "cardStyle", "mb-3");
    sizingDiv.appendChild(newCard);
    // row within card
    let cardRow = document.createElement("div");
    cardRow.classList.add("row", "g-0", "d-flex", "align-items-center");
    newCard.append(cardRow);
    // image sizer
    let imgSizer = document.createElement("div");
    imgSizer.classList.add("col-md-4","menuImgSizer", "flex-shrink-0");
    cardRow.append(imgSizer);
    // image
    let imageCard = document.createElement("img");
    imageCard.setAttribute("src", section.pic);
    imageCard.setAttribute("alt", "image of a menu item");
    imageCard.classList.add("img-fluid", "rounded-start", "menuImgStyl");
    imgSizer.append(imageCard);
    // body sizer
    let contentSizer = document.createElement("div");
    contentSizer.classList.add("col-md-8");
    cardRow.append(contentSizer);
    // Creates the div that holds the bootstrap card body
    let newContent = document.createElement("div");
    newContent.classList.add("card-body", "newElement");
    contentSizer.appendChild(newContent);
    // content aligner
    let contentAligner = document.createElement("div");
    contentAligner.classList.add("flex-grow-1", "ms-3")
    newContent.append(contentAligner);
    // creates the title for the element
    let newTitle = document.createElement("h5");
    newTitle.classList.add("card-title", "newElement");
    // fills in the title with text that 
    let newText = document.createTextNode(String(section.menuItem));
    newTitle.appendChild(newText);
    // creates the Price and price text and appends it
    let newPrice = document.createElement("h6");
    let priceText = document.createTextNode("Price: " + USDollar.format(section.price));
    newPrice.classList.add("newElement");
    newPrice.appendChild(priceText);
    // Creates a div to hold the buttons
    let buttonStyle = document.createElement("div");
    buttonStyle.classList.add("d-grid", "gap-2" ,"d-md-block");
    // Creates the order button and adds its corresponding ids, classes, and onclick events.
    let newButton = document.createElement("button");
    newButton.classList.add(menuStuff, "btn", "newElement", "menuBtnStyleone");
    newButton.id = String(section.menuItem);
    newButton.onclick = function () { select(this.id, this.classList.item(0), 0); };
    let buttonText = document.createTextNode("Add");
    newButton.appendChild(buttonText);
    // Creates the remove button and adds its corresponding ids, classes, and onclick events.
    let removeButton = document.createElement("button");
    removeButton.classList.add(menuStuff, "btn", "menuBtnStyletwo", "newElement");
    removeButton.id = String(section.menuItem);
    removeButton.onclick = function () { select(this.id, this.classList.item(0), 1); };
    let removeText = document.createTextNode("Remove");
    removeButton.appendChild(removeText);
    // adds buttons to the style div
    buttonStyle.append(newButton, removeButton);
    // adds the title, price, and buttons all at the same time
    contentAligner.append(newTitle, newPrice, buttonStyle);
};

// called whenever a button to change the menu items is pressed.
function active(itemGiven, selectId) {
    // checks if the id of the button is not active
    if (selectId != "active") {
        // runs through all buttons and removes their ids.
        let removeIds = document.getElementsByClassName("call");
        for (var f = 0; f < removeIds.length; f++) {
            removeIds.item(f).id = null;
        };
        // gives the active id to the called button
        itemGiven.id = "active";
    };
};
// When called updates the total price and count and displays it.
function priceCount() {
    dispCount.textContent = ordered.length;
};

// Begins the display for all items in the cart
function cartDisplay() {
    // checks if the card has not been displayed yet before starting the process
    if (displayed === false) {
        var popOver = document.getElementById("orderedDisplay");
        var addClass = document.getElementsByClassName("gone");
        // reveals all of the elements found on the html page with the class gone and removes the class visually-hidden so that they are visible
        for (var f = 0; f < addClass.length; f++) {
            let selectGone = addClass.item(f);
            selectGone.classList.remove("visually-hidden");
        };
        // Creates one div that holds the list for easy removal
        let encompass = document.createElement("div");
        encompass.id = "listRemove";
        popOver.append(encompass);
        // creates the list-group
        let newList = document.createElement("ul");
        newList.classList.add("list-group", "list-group-flush");
        encompass.append(newList);
        // checks if any items have been ordered
        if (ordered.length > 0) {
            let hiddenItems = document.getElementsByClassName("menuGone");
            for (var g = 0; g < hiddenItems.length; g++){
                let menuSelectGone = hiddenItems.item(g);
                menuSelectGone.classList.remove("visually-hidden");
            };
            // runs through the entire ordered list and displays each item as a list with its price and name
            for (var u = 0; u < ordered.length; u++) {
                let selectedListItem = ordered[u];
                let selectedPrice = prices[u];
                let listItem = document.createElement("li");
                listItem.classList.add("list-group-item", "ubuntu-sans");
                let menuPrice = document.createTextNode(USDollar.format(selectedPrice) + " - " + selectedListItem);
                listItem.append(menuPrice);
                newList.append(listItem);
            }
            // displays the subtotal of the order
                let subtotal = document.getElementById("subtotal")
                subtotal.textContent = USDollar.format(totalPrice);
            //displays the tax of the order
                let taxPrice = totalPrice * 0.1025;
                let tax = document.getElementById("tax");
                tax.textContent = USDollar.format(taxPrice);
            // tip
                let tipPrice = totalPrice * currentTip;
                let tip = document.getElementById("tip");
                tip.textContent = USDollar.format(tipPrice);
            // total
                let finalTotal = totalPrice + taxPrice + tipPrice + 1;
                let total = document.getElementById("total");
                total.textContent = USDollar.format(finalTotal);
            // changes the order button to be active
            submitBtn.classList.remove("disabled");
            // sets the displayed value to true
            displayed = true;
        } else {
            // displays a error message if there are no items in the cart
            submitBtn.classList.add("disabled");
            let errorMsg = document.createElement("li");
            errorMsg.classList.add("list-group-item", "ubuntu-sans");
            let errorMsgText = document.createTextNode("There are no items in your cart");
            errorMsg.append(errorMsgText);
            newList.append(errorMsg);
            displayed = true;
        };
    };
};

// Changes the active tip
function addTip(curPercent, tipBtn, activeId){
    currentTip = curPercent;
    if (activeId != "tipActive") {
        // runs through all buttons and removes their ids.
        let deleteIds = document.getElementsByClassName("tipbtnStyle");
        for (var f = 0; f < deleteIds.length; f++) {
            deleteIds.item(f).id = null;
        };
        // gives the active id to the called button
        tipBtn.id = "tipActive";
    }
    update();
};
// "submits" the order to the kitchen
function submit(){
    clearpop();
    alert("Your order has been submitted!");
    // removes all items from the ordered and prices list
    ordered.splice(0, ordered.length);
    prices.splice(0, prices.length);
    priceCount();
};
// hides all ordered items and deletes the list of ordered items aswell as makes the displayed boolean false
function clearpop() {
    var goneClass = document.getElementsByClassName("gone");
    for (var f = 0; f < goneClass.length; f++) {
        let selectGone = goneClass.item(f);
        selectGone.classList.add("visually-hidden");
    }
    var goneMenu = document.getElementsByClassName("menuGone");
    for (var f = 0; f < goneMenu.length; f++) {
        let selectedremove = goneMenu.item(f);
        let visualBool = selectedremove.classList.contains("visually-hidden");
        if (visualBool === true){
            break;
        }else{
            selectedremove.classList.add("visually-hidden");
        }
    }
    displayed = false;
    document.getElementById("listRemove").remove();
};

// Update function
function update(){
    if(displayed == true){
        clearpop();
        cartDisplay();
    };
}

//menu is accessed by many functions and holds all the data for all menu items
const menu = [
    appetizers = [
        "appetizers",
        guacamole = {
            price: 12.00,
            menuIndex: 0,
            group: "appetizers",
            pic: "menuPics/guacamole.jpg",
            menuItem: "Guacamole",
        },
        trio = {
            price: 14.00,
            menuIndex: 1,
            group: "appetizers",
            pic: "menuPics/trio.jpg",
            menuItem: "Trio",
        },
        pulpo_a_la_mexicana = {
            price: 14.00,
            menuIndex: 2,
            group: "appetizers",
            pic: "menuPics/pulpo.avif",
            menuItem: "Pulpo a La Mexicana",
        },
        queso_fundido = {
            price: 10.00,
            menuIndex: 3,
            group: "appetizers",
            pic: "menuPics/quesoFundido.avif",
            menuItem: "Queso Fundido",
        },
        nachos = {
            price: 10.00,
            menuIndex: 4,
            group: "appetizers",
            pic: "menuPics/nachos.avif",
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
            pic: "menuPics/caldoPollo.avif",
            menuItem: "Caldo de Pollo",
        },
        sopa_de_torilla = {
            price: 6.00,
            menuIndex: 1,
            group: "Soups and Salads",
            pic: "menuPics/sopaTortilla.webp",
            menuItem: "Sopa de Tortilla",
        },
        pozole = {
            price: 10.00,
            menuIndex: 2,
            group: "Soups and Salads",
            pic: "menuPics/pozole.jpg",
            menuItem: "Pozole",
        },
        taco_salad = {
            price: 14.00,
            menuIndex: 3,
            group: "Soups and Salads",
            pic: "menuPics/tacoSalad.avif",
            menuItem: "Taco Salad",
        },
        tecalitlan_salad = {
            price: 14.00,
            menuIndex: 4,
            group: "Soups and Salads",
            pic: "menuPics/tecaSalad.jpg",
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
            pic: "menuPics/chilaquiles.avif",
            menuItem: "Chilaquiles",
        },
        breakfast_burrito = {
            price: 12.00,
            menuIndex: 1,
            group: "Breakfast",
            pic: "menuPics/breakfastBurrito.webp",
            menuItem: "Breakfast Burrito",
        },
        huevos_a_la_mexicana = {
            price: 13.00,
            menuIndex: 2,
            group: "Breakfast",
            pic: "menuPics/huevos.jpg",
            menuItem: "Huevos a La Mexicana"
        },
        pancakes_la_abulita = {
            price: 9.00,
            menuIndex: 3,
            group: "Breakfast",
            pic: "menuPics/pancakes2.jpg",
            menuItem: "Pancakes La Abuelita",
        },
        mollete = {
            price: 8.00,
            menuIndex: 4,
            group: "Breakfast",
            pic: "menuPics/mollete.webp",
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
            pic: "menuPics/threeTaco.avif",
            menuItem: "3 Taco Order",
        },
        burrito = {
            price: 12.00,
            menuIndex: 5,
            group: "Burritos",
            pic: "menuPics/burrito.avif",
            menuItem: "Burrito",
        },
        torta = {
            price: 9.50,
            menuIndex: 10,
            group: "Tortas",
            pic: "menuPics/torta.avif",
            menuItem: "Torta",
        },
        quesabirria = {
            price: 12.00,
            menuIndex: 14,
            group: "Tortas",
            pic: "menuPics/quesabirria.avif",
            menuItem: "Quesabirria",
        },
        chicken_fajitas = {
            price: 22.00,
            menuIndex: 17,
            group: "Fajitas",
            pic: "menuPics/chicFajitas.webp",
            menuItem: "Chicken Fajitas",
        },
    ],
    //Sides Menu
    sides = [
        "sides",
        sour_cream = {
            price: 1.00,
            menuIndex: 0,
            group: "Sides",
            pic: "menuPics/sourcream2.jpg",
            menuItem: "Sour Cream",
        },
        guacamole = {
            price: 2.00,
            menuIndex: 1,
            group: "Sides",
            pic: "menuPics/sideGuacamole.avif",
            menuItem: "Guacamole",
        },
        rice = {
            price: 4.00,
            menuIndex: 2,
            group: "Sides",
            pic: "menuPics/arroz2.jpg",
            menuItem: "Rice",
        },
        beans = {
            price: 4.00,
            menuIndex: 3,
            group: "Sides",
            pic: "menuPics/refriedBeans.jpg",
            menuItem: "Beans",
        },
        shredded_cheese = {
            price: 2.00,
            menuIndex: 4,
            group: "Sides",
            pic: "menuPics/cheese2.jpg",
            menuItem: "Shredded Cheese",
        },
    ],
    //Drinks Menu
    drinks = [
        "drinks",
        coke = {
            price: 3.00,
            menuIndex: 0,
            group: "Drinks",
            pic: "menuPics/mexicanCoke.jpg",
            menuItem: "Coke",
        },
        sprite = {
            price: 3.00,
            menuIndex: 1,
            group: "Drinks",
            pic: "menuPics/sprite.webp",
            menuItem: "Sprite",
        },
        horchata = {
            price: 3.50,
            menuIndex: 2,
            group: "Drinks",
            pic: "menuPics/horchata.jpg",
            menuItem: "Horchata",
        },
        topo_chico = {
            price: 4.00,
            menuIndex: 3,
            group: "Drinks",
            pic: "menuPics/topoChico.jpg",
            menuItem: "Topo-Chico",
        },
        jarrito = {
            price: 4.00,
            menuIndex: 4,
            group: "Drinks",
            pic: "menuPics/jarritos.avif",
            menuItem: "Jarrito",
        },
    ],
]

// Main code
var firstTip = document.getElementsByClassName("first").item(0);
display("appetizers");
addTip(0.15, firstTip, "first")
priceCount();