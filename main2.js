// import {makeIt} from "gsheet.js";

// makeIt()

// Variables

let todoBox=document.querySelector(".todo-container")
let text=document.querySelector(".text")
let addBtn=document.querySelector(".main-btn")
let removeBtn=document.querySelector(".remove")
let pix=document.querySelector(".profile")
let userName=document.querySelector(".username")


//  Authentication Variables 
let regName=document.querySelector(".modal-name")
let regPassword=document.querySelector(".password")
let submitBtn=document.querySelector(".modal-btn")

let modalBox=document.querySelector(".modal")
let closeBtn=document.querySelector(".modal-close")
let authBtn=document.querySelector(".sign-up")
let isAuthenticated=false

// Auth Storage

if (localStorage.getItem("todoAuth")==null){
	localStorage.setItem("todoAuth","")
}

else if (localStorage.getItem("todoAuth")=="true"){
	authBtn.innerText="Hey:)";
	//  Geting the name from local storage and displying it
	let derivedName=localStorage.getItem("todoCred").split("-")[0]
	console.log(derivedName)
	userName.innerText=derivedName

}


if (localStorage.getItem("todoCred")==null){
	localStorage.setItem("todoCred","[]")
}




//  Get the data from local storage if any

let storageItems=localStorage.getItem("todo")

if (storageItems==null ){
	freshStart()
} 

else{
	loadTodo()
}




function freshStart(){
	console.log("Empty")
	localStorage.setItem("todo","[]")
}



addBtn.addEventListener('click',() => addData(text.value))
window.addEventListener('keypress',useKeys)

function useKeys(e){
	console.log("ELEa")
	if (e.key=="Enter"){
		console.log("Enter it oh now ...")
		if (!text.value=="")
			addData(text.value)
	}
} 

function addData(item){
	//  convert to list

	if (localStorage.getItem("todo")==null){
		freshStart()
		todoBox.innerHTML=''
	}

	if(!item==""){

		let newList=[[item,""],...JSON.parse(localStorage.getItem("todo"))]

		// // add to list
		// newList.push([item,""])

		// Push to localstorage
		localStorage.setItem("todo",JSON.stringify(newList))
		text.value=""

		loadTodo()
	}

}







function loadTodo(){

	if (localStorage.getItem("todo")==null){
		freshStart()
	}

	let allData=JSON.parse(localStorage.getItem("todo"))
	todoBox.innerHTML=''

	if (!allData==[]){

		for (i = 0 ; i < allData.length ; i++){
			let newTodo=allData[i]
// `<div class="todo-card">
// 				 <span class="Done" onclick="finish(${i})">Done</span><p class="pee">${newTodo[0]}</p><span class="remove flex flex-center" onclick="deleteTodo(${i})">--</span>
// 				</div>`

			if(newTodo[1]==""){
				todoBox.innerHTML+=`<div class="todo-card">
				<input type="checkbox" name="" onchange="finish(${i})">
				<p class="t-text">${newTodo[0]}</p>
				<button class="delete" onclick="deleteTodo(${i})">Del</button>
				</div>`;
			}

			else{
				todoBox.innerHTML+=`<div class="todo-card">
					<input type="checkbox" name="" checked onchange="finish(${i})">
					<p class="t-text strike">${newTodo[0]}</p>
					<button class="delete" onclick="deleteTodo(${i})">Del</button>
				</div>`
			};
		}
	}	
};


function finish(index){

	let lS=JSON.parse(localStorage.getItem("todo"))

	let allTodo=document.querySelectorAll(".todo-card")

	let card=allTodo[index]

	let toDo=card.querySelector(".t-text")

	//  Item based on card index in localstorage
	let newItem= lS[index]


	if(newItem[1]==""){

		toDo.classList.add("strike")

		newItem[1]="strike"

		// Update the  List of todos with new item
		lS[index]=newItem

		localStorage.setItem("todo",JSON.stringify(lS))
	}

	else{
		toDo.classList.remove("strike")

		newItem[1]=""

		// Update the  List of todos with new item
		lS[index]=newItem

		// Update localstorage with updated data
		localStorage.setItem("todo",JSON.stringify(lS))
	}
};





function deleteTodo(item){
	console.log(item)
	let dList= JSON.parse(localStorage.getItem('todo'))

	dList.splice(item,1)

	localStorage.setItem('todo',JSON.stringify(dList))

	loadTodo()
}


function isAuth(){
	let localAuth=localStorage.getItem("todoAuth")
	if (localAuth==null || localAuth==""){
		return false
	}

	else {
		return true
	}
}

function userAuth(){
	// authBtn.innerText

	if (isAuth()){
		authBtn.innerText="Hey:)"
		authBtn.title="You are logged out"
	}

	else{
		authBtn.innerText="Sign Up"
		modalBox.classList.remove("no-display")
	}
}


function processForm(){
	let userField=`${regName.value}-${regPassword.value}`

	localStorage.setItem("todoCred",userField)
	localStorage.setItem("todoAuth","true")

	setTimeout(closeModal(),3000)
	authBtn.innerText="Hey:)"
	window.location.reload()

}

function closeModal(){
	modalBox.classList.add("no-display")
}

// ,{credentials: 'same-origin'}


// let url = 'https://api.sheety.co/9c9131b74e93a891e24c213fc26b7da4/todo/sheet1';
// fetch(url)
// .then((response) => response.json())
// .then(json => json.sheet1)
// .then(koko => {pix.src=koko[0].picture
// })




//  Pix and Username
// https://images.unsplash.com/photo-1642191166366-bfd0ccd265c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"

// pix.src="img/pix1.png"
// userName.innerText="Your Name"




 // https://joshua357954.github.io/todo-list-web-app/

// https://www.termsfeed.com/live/7f725e70-6aec-4bc7-8d17-51ddd7fe5556




















