let titre = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search1");
let tbody = document.getElementById("tbody");
let delete_all1 = document.getElementById("delete_all");
let search11 = document.getElementById("search");
console.log(search11.value);
let temp ;
let indice ;
function totalP() {
    if(price.value != '')
    {
        let resultat = ((+price.value) + (+taxes.value)  +  (+ads.value )) - (+discount.value) ;
        total.innerHTML = resultat ;
        total.style.backgroundColor="green";
    }else{
        total.style.backgroundColor="coral";
        total.innerHTML = "none" ;
    }
}

function clear() {
    titre.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="none";
    count.value="";
    category.value="";
    search.value="";
}
let products ;
if(localStorage.stockage != null)
{
    products = JSON.parse(localStorage.stockage) ;
}else {
    products=[];
}
function update(i) {
    titre.value = products[i].titre ;
    price.value = products[i].price ;
    ads.value = products[i].ads ;
    discount.value = products[i].discount ;
    taxes.value = products[i].taxes ;
    count.style.display="none";
    category.value=products[i].category;
    create.innerText="Update";
    total.innerHTML=products[i].total;
    if(products[i].price=="")
    {
        total.style.backgroundColor="red";
    }else{
    total.style.backgroundColor="green";
    }
    temp = "update" ;
    indice = i ;
}
/*********************** */
function show() {
    let tout="";
    for(let i=0;i<products.length;i++)
    {
        tout += `
        <tr>
        <td>${i}</td>
        <td>${products[i].titre}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick="update(${i})" id="update_delete">UPDATE</button></td>
        <td><button onclick="delete_one(${i})" id="update_delete">DELETE</button></td>
    
    </tr>`;
    }
    tbody.innerHTML = tout ;
    delete_all();
}
///////////////////////////
function delete_one(i)
{
    products.splice(i,1);
    localStorage.setItem('stockage',JSON.stringify(products));
    show() ;
}
///////////////////////////
function verifier() {
    if (products.length>0)
    {
        return true;
    }else {
        return false ;
    }
}
///////////////////////////
function supprimer(){
    products.splice(0);
    localStorage.setItem('stockage',JSON.stringify(products));
    show() ; 
}
///////////////////////////
function delete_all()
{
    delete_all1.innerHTML="";
    if (verifier() == true)
    {
        delete_all1.innerHTML+=`
        <button id="create1" onclick="supprimer()">Delete All</button>
        `
    }else{
        delete_all1.innerHTML="";
    }
}
///////////////////////////

///////////////////////////


create.onclick = function() {
    let product = {
        titre:titre.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if (temp == "update")
    {
        products[indice] = product ;
        localStorage.setItem('stockage',JSON.stringify(products));
        show();
        count.style.display="block";
        clear();
        temp = "" ;
    }else{
    for(let i=0;i<product.count;i++)
    {
        products.push(product);
    localStorage.setItem('stockage',JSON.stringify(products));
    ///////////////////////////
    function ajouter() {
        tbody.innerHTML += `<tr>
        <td>${+products.length-1}</td>
        <td>${product.titre}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td><button onclick="update(${i})" id="update_delete">UPDATE</button></td>
        <td><button onclick="delete_one(${i})" id="update_delete">DELETE</button></td>
    
    </tr>`;
    }
        ajouter() ;
        delete_all();
    }
    ///////////////////////////
    clear() ;
}
}
//////////////////////////////////////////
function affiche_selon_titre(mot) {
    console.log(mot);
    tbody.innerHTML ="";
    for(let i=0 ; i<products.length;i++)
    {
        if(products[i].titre.includes(mot))
        {
            tbody.innerHTML += `<tr>
        <td>${i}</td>
        <td>${products[i].titre}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick="update(${i})" id="update_delete">UPDATE</button></td>
        <td><button onclick="delete_one(${i})" id="update_delete">DELETE</button></td>
    
    </tr>`;
        }
    }
}
////////////////////////////////////

////////////////////////////////////
function activate_titre() {
    if(search11.value!="" && search11.value!=" ")
    {
    tbody.innerHTML=``;
    for(let i=0;i<=products.length;i++)
    {
        if(products[i].titre.includes(search11.value))
        {
            tbody.innerHTML += `<tr>
        <td>${i}</td>
        <td>${products[i].titre}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick="update(${i})" id="update_delete">UPDATE</button></td>
        <td><button onclick="delete_one(${i})" id="update_delete">DELETE</button></td>
    
    </tr>`;
        }
    }
    }else{
        show();
    }
}
function activate_category() {
    if(search11.value!="" && search11.value!=" ")
    {
    tbody.innerHTML=``;
    for(let i=0;i<=products.length;i++)
    {
        if(products[i].category.includes(search11.value))
        {
            tbody.innerHTML += `<tr>
        <td>${i}</td>
        <td>${products[i].titre}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick="update(${i})" id="update_delete">UPDATE</button></td>
        <td><button onclick="delete_one(${i})" id="update_delete">DELETE</button></td>
    
    </tr>`;
        }
    }
    }else{
        show();
    }
}
////////////////////////////////////
show() ;
/////////////////////////////////////
