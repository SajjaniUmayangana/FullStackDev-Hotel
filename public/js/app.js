let getButton = document.querySelector('#get-btn');
getButton.addEventListener('click', function(){
   
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:8800/user/retrive', true);
    xhr.send();

    xhr.onload = () => {
        if(xhr.status === 200){
            let data = xhr.responseText;
            let usersdata = JSON.parse(data);
            displayUsers(usersdata);
        }
    }
})

// display user data 
let displayUsers = (usersdata) => {
    let tableRows = '';
    for (let user of usersdata){
        tableRows += `
        <tr>
            <td width="10%">${user._id}</td>
            <td width="10%">${user.username}</td>
            <td width="10%">${user.email}</td>
            <td width="10%">${user.password}</td>
            <td width="10%">${user.isAdmin}</td>
            <td>
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
        xhr.open('delete', `http://localhost:8800/user/delete/${selectedID}`, true);
        // send request 
        xhr.send();

        // process request after its send 
        xhr.onload = () => {
              xhr.open('GET', 'http://localhost:8800/user/retrive', true);
              xhr.send();

              xhr.onload = () => {
                 if(xhr.status === 200){
                     let data = xhr.responseText;
                     let usersdata = JSON.parse(data);
                     displayUsers(usersdata);
               }
              }
          }
    }

    /////// update button //////
    if (targetElement.classList.contains('update')){
        
        let selectedID = targetElement.parentElement.parentElement.firstElementChild.innerHTML;

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8800/user/retrive', true);
        xhr.send();

        xhr.onload = () => {
            let data = xhr.responseText;
            let usersdata = JSON.parse(data)
            let selectUser = usersdata.find((user)=>{
                return user._id === selectedID.trim();
            });
        console.log(selectUser);
        populateUserModel(selectUser);
        }
    }
})


let populateUserModel = (selectUser) =>{
    document.querySelector("#updateID").value = selectUser._id;
    document.querySelector('#updateUsername').value = selectUser.username;
    document.querySelector('#updatePassword').value = selectUser.password;
    document.querySelector('#updateEmail').value = selectUser.email;
    document.querySelector('#updateisAdmin').value = selectUser.isAdmin;


    $('#updateform').modal('show');
    
}

let updateUserForm = document.querySelector("#updateUserForm");
updateUserForm.addEventListener('click', function(){
 
    let updateUserId =  document.querySelector("#updateID").value;

     let  user = {
          username : document.querySelector("#updateUsername").value,
          email : document.querySelector("#updateEmail").value,
          password : document.querySelector("#updatePassword").value,
          isAdmin : document.querySelector("#isAdmin").value,
       };

       let xhr = new XMLHttpRequest();
       xhr.open('PUT', `http://localhost:8800/user/update/${updateUserId}`, true);
       xhr.setRequestHeader('Content-Type', 'application/json');
       xhr.send(JSON.stringify(user));

       xhr.onload = () => {

          xhr.open('GET', 'http://localhost:8800/user/retrive', true);
          xhr.send();
  
            if(xhr.status === 200){
               let data = xhr.responseText;
               let usersdata = JSON.parse(data);
               displayUsers(usersdata);
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
