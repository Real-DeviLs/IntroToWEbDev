// Written with love by Anubhav Gupta 

var cart = [];


window.onload = function loaded(){
    if (localStorage.cart) {
        cart = JSON.parse(localStorage.cart);
        showCart();
    }
    if(! localStorage.cart)
        document.getElementById("checkoutButton").style.visibility='hidden';



}



function addToCart(id, name, price) {
    console.log("cart");

    var price = price;
    var name = name;
    var id = id;
    var qty = 1;

    // update qty if product is already present
    for (var i in cart) {
        if (cart[i].Id == id) {
            cart[i].Qty += 1;
            saveCart();
            showCart();

            return;
        }
    }
    // create JavaScript Object
    var item = {
        Id: id,
        Product: name,
        Price: price,
        Qty: qty
    };
    cart.push(item);
    console.log(cart);
    saveCart();
    showCart();
}



function subtractFromCart(i) {
    // update qty if product is already present
        
            cart[i].Qty += -1;
            console.log(i);
            if(cart[i].Qty==0)
            deleteItem(i);

            showCart();
            saveCart();
            return;
    
}

function incrementCart(i)
{
    cart[i].Qty += 1;
    showCart();
    saveCart();
    return;
    

}


function deleteItem(index) {
    cart.splice(index, 1); // delete item at index
    showCart();
    saveCart();
}

function saveCart() {
    if (window.localStorage) {
        localStorage.cart = JSON.stringify(cart);
    }
}

function showCart() {
    if (cart.length == 0) {
        document.getElementById("cart").style.visibility='hidden';
        document.getElementById("checkoutButton").style.visibility='hidden';
        return;
    }

    
    document.getElementById("cart").style.visibility='visible';
    document.getElementById("checkoutButton").style.visibility='visible';

    document.getElementById("cartBody").innerHTML="";
    for (var i in cart) {
        var item = cart[i];

        document.getElementById("cartBody").innerHTML += 
             "<tr><td>" + item.Product + "</td><td>" +
            item.Price + "</td><td>" + item.Qty + "</td><td>" +
            item.Qty * item.Price + "</td><td>" +
            "<button onclick='deleteItem(" + i + ")'>Delete</button> </td><td>"+
            "<button onclick='incrementCart(" + i + ")'>+</button> </td><td>"+
            "<button onclick='subtractFromCart("+ i +")'>-</button></td></tr>";
    }
}