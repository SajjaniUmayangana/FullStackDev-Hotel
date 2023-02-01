let getButton = document.querySelector('#get-btn');
getButton.addEventListener('click', function(){
   
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:8800/room/retrive', true);
    xhr.send();

    xhr.onload = () => {
        if(xhr.status === 200){
            let data = xhr.responseText;
            let roomdata = JSON.parse(data);
            displayRoom(roomdata);
        }
    }
})


// display user data 
let displayRoom = (roomdata) => {
    let tableRows = '';
    for (let room of roomdata){
        tableRows += `
        <tr>
            <td width="5%">${room._id}</td> 
            <td width="5%">${room.roomNumber}</td>
            <td width="7%">${room.roomType}</td>
            <td width="25%">${room.description}</td>
            <td width="8%">${room.price}</td>
            <td width="8%">${room.noOfpeople}</td>
            <td width="8%">${room.availability}</td>
            <td width="10%"><img src="./img/${room.img}" width="200" height="150" alt="room images"></td>
            <td width="10%">
            <button class="btn btn-primary update" id="update-btn">U</button>
            <button class="btn btn-danger delete" id="delete-btn" >D</button>
            </td>
        </tr>
        `
        // <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateform" id="update-btn">U</button>
    }
    document.querySelector('#table-body').innerHTML = tableRows;
}


// click on table body 
let tableBody = document.querySelector("#table-body");
tableBody.addEventListener('click', function(e){
       
    let targetElement = e.target;

    //////// delete button  /////////
    if (targetElement.classList.contains('delete')){
       
        let selectedID = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
        
        let xhr = new XMLHttpRequest();

        // prepare request 
        xhr.open('delete', `http://localhost:8800/room/delete/${selectedID}`, true);
        // send request 
        xhr.send();

        // process request after its send 
        xhr.onload = () => {
              xhr.open('GET', 'http://localhost:8800/room/retrive', true);
              xhr.send();

              xhr.onload = () => {
                 if(xhr.status === 200){
                     let data = xhr.responseText;
                     let roomdata = JSON.parse(data);
                     displayRoom(roomdata);
               }
              }
          }
    }

    /////// update button //////
    if (targetElement.classList.contains('update')){
        
        let selectedID = targetElement.parentElement.parentElement.firstElementChild.innerHTML;

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8800/room/retrive', true);
        xhr.send();

        xhr.onload = () => {
            let data = xhr.responseText;
            let roomdata = JSON.parse(data)
            let selectRoom = roomdata.find((room)=>{
                return room._id === selectedID.trim();
            });
        console.log(selectRoom);
        populateRoomModel(selectRoom);
        }
    }
})


let populateRoomModel = (selectRoom) =>{
    document.querySelector("#updateID").value = selectRoom._id;
    document.querySelector('#updateRoomNumber').value = selectRoom.roomNumber;
    document.querySelector('#updateRoomType').value = selectRoom.roomType;
    document.querySelector('#updateDescription').value = selectRoom.description;
    document.querySelector('#updatePrice').value = selectRoom.price;
    document.querySelector('#updatePeople').value = selectRoom.noOfpeople;
    
   
    $('#updateform').modal('show');
    
}

let updateRoomForm = document.querySelector("#updateRoomForm");
updateRoomForm.addEventListener('click', function(){
 
    let updateRoomId =  document.querySelector("#updateID").value;

     let  room = {
        roomNumber : document.querySelector('#updateRoomNumber').value,
        roomType : document.querySelector('#updateRoomType').value,
        description : document.querySelector('#updateDescription').value,
        price : document.querySelector('#updatePrice').value,
        noOfpeople: document.querySelector('#updatePeople').value,
       };

       let xhr = new XMLHttpRequest();
       xhr.open('PUT', `http://localhost:8800/room/update/${updateRoomId}`, true);
       xhr.setRequestHeader('Content-Type', 'application/json');
       xhr.send(JSON.stringify(room));

       xhr.onload = () => {

          xhr.open('GET', 'http://localhost:8800/room/retrive', true);
        //   xhr.send();
  
            if(xhr.status === 200){
               let data = xhr.responseText;
               let roomdata = JSON.parse(data);
               displayRoom(roomdata);
           }
         }
       })

let clearFormFields = () =>{
    document.querySelector("#username").value = '';
    document.querySelector("#email").value = '';
    document.querySelector("#password").value = '';
    document.querySelector("#isAdmin").value = '';
}


// To close the message box after few seconds 
let alertmessage =  document.getElementById("alertmessage")
   
$(document).ready(function(){  
    setTimeout(function(){
       alertmessage.remove();
     },3000);
})
