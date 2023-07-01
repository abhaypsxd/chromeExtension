let myLeads = []; //Converts the myLeads array into a string that can be stored in the local storage.
let savedLeads = [];
//myLeads = JSON.parse(myLeads) //Converts the string back to a javascript object to use as a normal array, but could still be stored in the local storage as a string.
//We can also use the JSON.strigify() function to convert the array to a string to be stored.


const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
let ulEl = document.getElementById("ul-el");
let listItems = "";
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("savedLeads"))

if (leadsFromLocalStorage) {
	savedLeads = leadsFromLocalStorage;
	renderLeads(savedLeads)
}

tabBtn.addEventListener("click", function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		console.log(tabs);
		myLeads.push(tabs[0].url)
		savedLeads.push(tabs[0].url)
		localStorage.setItem("savedLeads", JSON.stringify(savedLeads));
		renderLeads(myLeads)
		myLeads=[];
	})

})

deleteBtn.addEventListener("dblclick", function() {
	localStorage.clear();
	savedLeads = [];
	myLeads= [];
	console.log(myLeads)
	renderLeads(myLeads);
	listItems="";
	ulEl.textContent="";

})

inputBtn.addEventListener("click", function() {

	myLeads.push(inputEl.value);
	savedLeads.push(inputEl.value);

	localStorage.setItem("savedLeads", JSON.stringify(savedLeads));
	inputEl.value= "";

	renderLeads(myLeads);

	
	myLeads = [];
	console.log(savedLeads)

})


function renderLeads(leads) {
	for (let i=0; i < leads.length; i++) {
		//listItems += "<li><a target = '_blank' href = '> " +myLeads[i] + "'>" + myLeads[i] + "</a></li>"
		listItems += `
		<li>
			<a target = '_blank' href ='${leads[i]}'>
				${leads[i]}
			</a>
		</li>`
		/*const li = document.createElement("li")
		li.textContent = myLeads[i]
		ulEl.append(li)*/
	}
	ulEl.innerHTML = listItems;
}
