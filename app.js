import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://playground-f1e8f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app =initializeApp(appSettings)
const database = getDatabase(app)

const shoppingListInDB = ref(database,"shoppingList")



const inputFieldEl = document.getElementById("input-field")

const addButtonEl =document.getElementById("add-button")

const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click",function (){
    let inputValue =  inputFieldEl.value;
    console.log(inputValue)
    push(shoppingListInDB,inputValue)

    clearInputFieldEl()

    // appendItemToShoppingListEl(inputValue)
   

    // shoppingListEl.innerHTML += `<li>${inputValue}</li>`
})

 onValue(shoppingListInDB ,function(snapshot){

     
     if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        // console.log(itemsArray)
    
        clearShoppinListEl()

        for(let i =0; i<itemsArray.length; i++){
    
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue= currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }
    }else{
        shoppingListEl.innerHTML = "No items Entered yet..."
    }

   
    
 })

 function clearShoppinListEl(){
    shoppingListEl.innerHTML = ""
 }

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item){
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li");
    newEl.textContent = itemValue

    newEl.addEventListener("click",function(){
        let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`)
        // console.log(itemID)
        remove( exactLocationOfItemInDB)
    })

    shoppingListEl .append(newEl)

}