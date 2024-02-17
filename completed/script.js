function trimAtThreeWords(str) {
    let words = str.split(/\s+/);
    
    if (words.length > 3) {
        return words.slice(0, 3).join(" ") + "...";
    } else {
        return str;
    }
}




const url = "https://rafsal3.github.io/api/products.json"
let resutCount = document.querySelector(".path-title")
let productDiv = document.querySelector(".product-results")
var categoryListGen =document.querySelector(".filter-by-gender")
var categoryListBrand = document.querySelector(".filter-by-brand")
var categoryListColor = document.querySelector(".filter-by-color")
let allCatGen =[]
let allCatBrand =[]
let allCatColor =[]
allCheckCat=[]
allCheckBrand=[]
allCheckColor =[]
let countf = 0




let displayProduct =async (allCheckCat=[],allCheckBrand=[],allCheckColor=[]) =>{
    
    productDiv.innerHTML=''
    let product =await fetch(url)
    let finalProduct = await product.json()

    // category list

    finalProduct.forEach(element => {

        if(!allCatGen.includes(element.gender)){
            

            categoryListGen.innerHTML +=`<label class="flex">
        <input type="radio" value="${element.gender}" name="gender" id="" onclick='genderFilter()'>${element.gender}
    </label>`

        allCatGen.push(element.gender)

        }

        if(allCheckCat.length==0){
            allCheckCat =allCatGen
        }
        else{

        }
        // end of gen

        if(!allCatColor.includes(element.color)){
            

            categoryListColor.innerHTML +=`<label  class="flex">
            <input type="checkbox" name="color" id="${element.color}" value="white" onclick="colorFilter()">
            <div class="colorball ${element.color}"></div>${element.color}<span class="count">(43224)</span>
        </label>`

        allCatColor.push(element.color)

        }

        if(allCheckColor.length==0){
            allCheckColor =allCatColor
        }
        else{

        }
        // end of color

        if(!allCatBrand.includes(element.brand)){

            categoryListBrand.innerHTML +=`<label for="afast" class="flex">
            <input type="checkbox" onclick="brandFilter()" name="brand" id="afast" value="${element.brand}">${element.brand}<span class="count"> (13993)</span>
        </label>` 

            allCatBrand.push(element.brand)
        }

        if(allCheckBrand.length == 0){
            allCheckBrand = allCatBrand
        }




        // product print section
    if(allCheckBrand.includes(element.brand) && allCheckCat.includes(element.gender) && allCheckColor.includes(element.color)){
        countf += 1
    // product list
    resutCount.innerHTML = `<span>Home Furnishing </span>
<span class="item-no">- ${countf} items</span>`

        productDiv.innerHTML += `<div class="product-base flex">
        <div class="top-box flex">
            <img src="${element.image}" alt="">
            <div class="rating flex">
                <p>69</p>
                <div class="trsIcon flex">
                    <span class="iconsSheet iconStar"></span>
                </div>
                
                <p>| 1.2k</p>
            </div>
        </div>
        <div class="bottom-box flex">
            <h2>${element.brand}</h2>
            <p>${trimAtThreeWords(element.name)}</p>
            <div class="price flex">
                <span class="real">MRP ${element.price}</span>
                <span class="org">&#x20B9;${element.price+element.discount}</span>
                <span class="off">(&#x20B9;${element.discount} OFF)</span>
            </div>
        </div>
        </div>`
    }
    });
    countf=0
}

displayProduct()

let genderFilter = () =>{
    let checkInputGen = document.querySelectorAll("input[name='gender']")
    
    let checkDataGen = [];
    checkInputGen.forEach((e)=>{
        if(e.checked){
            checkDataGen.push(e.value)
        }
    })
    
    displayProduct(checkDataGen,allCheckBrand,allCheckColor)

}

let brandFilter =() => {
    let checkInputBrand = document.querySelectorAll("input[name ='brand']")
    let checkDataBrand = [];
    checkInputBrand.forEach((e)=>{
        if(e.checked){
            checkDataBrand.push(e.value)
        }
    }
    )
    
    displayProduct(allCheckCat,checkDataBrand,allCheckColor)
}

let colorFilter =() => {
    let checkInputColor = document.querySelectorAll("input[name ='color']")
    let checkDataColor = [];
    checkInputColor.forEach((e)=>{
        if(e.checked){
            checkDataColor.push(e.id)
        }
    }
    )
    
    displayProduct(allCheckCat,allCheckBrand,checkDataColor)
}

