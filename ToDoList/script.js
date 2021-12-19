let addBtn = document.getElementById('add_btn');
        addBtn.addEventListener('click', addTask);
        let ulTag= document.getElementById('listofTask');

        function addTask(e){
            
            if(ulTag.children[0].className =="emptylist")
            {
                ulTag.children[0].remove();
            }
            
            let currentBtn = e.currentTarget;
            let currentData = currentBtn.previousElementSibling;
            let currentinput = currentData.value;

            if(currentData.value=="")
            {
                alert("Please enter a task.")
            }
            else{
                let newLi = document.createElement('li');
                // newLi.classList.add('list-group-item');
                newLi.className="list-group-item d-flex justify-content-between"
                newLi.innerHTML = `<input class="form-check-input me-3" type="checkbox" value="" id="flexCheckDefault">
                                <h6 class="flex-grow-1">${currentinput}</h6>
                                <button id ="add_btn" class="btn btn-outline-light bg-warning"  type="button" id="button-add" onclick="editTask(this)">Edit</button>
                                <button id ="add_btn" class="btn btn-outline-light bg-danger"  type="button" id="button-add" onclick="removeTask(this)">Remove</button>`;

                ulTag.appendChild(newLi);
            }
            
        }
    
    function removeTask(currElement){
        currElement.parentElement.remove();
        if(ulTag.children.length<=0)
        {
            let newH = document.createElement('h5');
            newH.classList.add('emptylist');
            newH.textContent = 'Nothing is Here';
            ulTag.appendChild(newH);
        }
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
    