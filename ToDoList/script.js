let addBtn = document.getElementById('add_btn');
let inputTaken = document.getElementById('inputTaken');
let ulTag= document.getElementById('listofTask');
let itemList=JSON.parse(localStorage.getItem("list")) || [];

window.onload=function()
{
    display();
}

addBtn.addEventListener('click', ()=>
{
    if(inputTaken.value=="")
    {
        alert("Please enter a task.")
    }
    else
    {
        let l={
            task: inputTaken.value,
            done: false
        }
        itemList.push(l);
        localStorage.setItem("list", JSON.stringify(itemList));
        display();
    }
});

function display()
{
    let listofTask="";
    for (let i=0; i< itemList.length; i++)
    {
        listofTask+=`<li class="list-group-item d-flex justify-content-between"><input id="c${i}" type="checkbox" onchange="checking(this)">
        <h6 class="flex-grow-1">${itemList[i]['task']}</h6>
        <button class="btn btn-outline-light bg-warning b"  type="button" id="e${i}" onclick="editTask(this)">Edit</button>
        <button class="btn btn-outline-light bg-danger b"  type="button" id="d${i}" onclick="removeTask(this)">Remove</button> </li>`;

    }
    ulTag.innerHTML=listofTask;
    for(let i=0; i<itemList.length; i++)
        document.getElementById(`c${i}`).checked=itemList[i]['done'];  
}

function removeTask(currElement){
    let id=currElement.id[1];
    itemList.splice(id,1);
    localStorage.setItem('list',JSON.stringify(itemList));
    display();
}

function editTask(currElement){
    if(currElement.textContent =='Done')
    {
        currElement.textContent='Edit';
        let elementData=currElement.previousElementSibling.value;
        let newInput= document.createElement('h6');
        newInput.textContent=elementData;
        newInput.className='flex-grow-1';
        currElement.parentElement.replaceChild(newInput, currElement.previousElementSibling);
        let id=currElement.id[1];
        itemList[id]['task']=elementData;
        localStorage.setItem('list',JSON.stringify(itemList));
        display();
    }
    else{
        currElement.textContent="Done";
        let elementData = currElement.previousElementSibling.textContent;
        let newInput = document.createElement('input');
        newInput.type="text";
        newInput.className = "form-control";
        newInput.placeholder="";
        newInput.value = elementData;
        currElement.parentElement.replaceChild(newInput, currElement.previousElementSibling);
    }
}

function checking(currElement)
{
    let id=currElement.id[1];
    if(currElement.checked==true)
    {
        itemList[id]['done']=true;
    }
    else
    {
        itemList[id]['done']=false;
    }
    localStorage.setItem('list',JSON.stringify(itemList));
    display();
}