let getButton = document.querySelector('#get-btn');
getButton.addEventListener('click', function(){
   
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:8800/employee/retrive', true);
    xhr.send();

    xhr.onload = () => {
        if(xhr.status === 200){
            let data = xhr.responseText;
            let employeedata = JSON.parse(data);
            displayEmployee(employeedata);
        }
    }
})


// display user data 
let displayEmployee = (employeedata) => {
    let tableRows = '';
    for (let employee of employeedata){
        tableRows += `
        <tr>
            <td width="5%">${employee._id}</td> 
            <td width="7%">${employee.firstname}</td>
            <td width="7%">${employee.lastname}</td>
            <td width="7%">${employee.email}</td>
            <td width="8%">${employee.jobDescription}</td>
            <td width="8%">${employee.address}</td>
            <td width="8%">${employee.salary}</td>
           
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
        xhr.open('delete', `http://localhost:8800/employee/delete/${selectedID}`, true);
        // send request 
        xhr.send();

        // process request after its send 
        xhr.onload = () => {
              xhr.open('GET', 'http://localhost:8800/employee/retrive', true);
              xhr.send();

              xhr.onload = () => {
                 if(xhr.status === 200){
                     let data = xhr.responseText;
                     let employeedata = JSON.parse(data);
                     displayEmployee(employeedata);
               }
              }
          }
    }

    /////// update button //////
    if (targetElement.classList.contains('update')){
        
        let selectedID = targetElement.parentElement.parentElement.firstElementChild.innerHTML;

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8800/employee/retrive', true);
        xhr.send();

        xhr.onload = () => {
            let data = xhr.responseText;
            let employeedata= JSON.parse(data)
            let selectEmployee = employeedata.find((employee)=>{
                return employee._id === selectedID.trim();
            });
        console.log(selectEmployee);
        populateEmployeeModel(selectEmployee);
        }
    }
})


let populateEmployeeModel = (selectEmployee) =>{
    document.querySelector("#updateID").value = selectEmployee._id;
    document.querySelector('#updateEmployeeFirstname').value = selectEmployee.firstname;
    document.querySelector('#updateEmployeeLastname').value = selectEmployee.lastname;
    document.querySelector('#updateEmail').value = selectEmployee.email;
    document.querySelector('#updateEmployeeJobDes').value = selectEmployee.job_description;
    document.querySelector('#updateEmployeeAddress').value = selectEmployee.address;
    document.querySelector('#updateEmployeeSalary').value = selectEmployee.salary;
   
    $('#updateform').modal('show');
}

let updateEmployeeForm = document.querySelector("#updateEmployeeForm");
updateEmployeeForm.addEventListener('click', function(){
 
    let updateEmployeeId =  document.querySelector("#updateID").value;

     let  employee = {
        firstname :  document.querySelector('#updateEmployeeFirstname').value,
        lastname : document.querySelector('#updateEmployeeLastname').value ,
        email:  document.querySelector('#updateEmail').value,
        job_Description: document.querySelector('#updateEmployeeJobDes').value,
        address: document.querySelector('#updateEmployeeAddress').value,
        salary:   document.querySelector('#updateEmployeeSalary').value
       };

       let xhr = new XMLHttpRequest();
       xhr.open('PUT', `http://localhost:8800/employee/update/${updateEmployeeId}`, true);
       xhr.setRequestHeader('Content-Type', 'application/json');
       xhr.send(JSON.stringify(employee));

       xhr.onload = () => {

          xhr.open('GET', 'http://localhost:8800/employee/retrive', true);
        //   xhr.send();
  
            if(xhr.status === 200){
               let data = xhr.responseText;
               let employeedata = JSON.parse(data);
               displayEmployee(employeedata);
           }
         }
       })

// let clearFormFields = () =>{
//     document.querySelector("#username").value = '';
//     document.querySelector("#email").value = '';
//     document.querySelector("#password").value = '';
//     document.querySelector("#isAdmin").value = '';
// }


// To close the message box after few seconds 
let alertmessage =  document.getElementById("alertmessage")
   
$(document).ready(function(){  
    setTimeout(function(){
       alertmessage.remove();
     },3000);
})
