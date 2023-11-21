
// global variable
var userData = [];
var idEl = document.getElementById("id")
var nameEl = document.getElementById("name")
var lastNameEl = document.getElementById("l-name")
var emailEl = document.getElementById("email")
var officeCodeEl = document.getElementById("office-code")
var jobTitleEl = document.getElementById("job-title")
var profile_pic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field");
var registerForm = document.getElementById("register-form")
var updateForm = document.getElementById("update-form")
const registerBtn = document.getElementById("register-btn")
var imgUrl;
var employAddBtn = document.querySelector("#employ-add-btn")
// end global variable



registerBtn.onclick = function (e) {
  e.preventDefault();
  registrationData();
  getDataFromLocal();
  registerForm.reset('');
}


console.log(userData)

const registrationData = () => {
  userData.push({
    id: idEl.value,
    name: nameEl.value,
    lastName: lastNameEl.value,
    email: emailEl.value,
    officeCode: officeCodeEl.value,
    jobTitle: jobTitleEl.value,
    profilePic: imgUrl == undefined ? "img/demoImg.jpg" : imgUrl
  });
  var userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  swal("Good job!", "Registration Success", "success");
}


if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
}
// start returning data on page from localstorage

var tableData = document.getElementById("table-data")

const getDataFromLocal = () => {
  tableData.innerHTML = "";
  userData.forEach((data, index) => {
    tableData.innerHTML +=
      `
    <tr index='${index}'>
        <td>${index + 1}</td>
        <td><img src="${data.profilePic}" width="40" height="40" ></td>
        <td>${data.id}</td>
        <td>${data.name}</td>
        <td>${data.lastName}</td>
        <td>${data.email}</td>
        <td>${data.officeCode}</td>
        <td>${data.jobTitle}</td>
        <td>
            <button class="btn btn-primary edit-btn"><i class="fa-solid fa-eye"></i></button>
            <button class="btn btn-danger del-btn"><i class="fa-solid fa-trash"></i></button>
        </td>
    </tr>
    `;
  })
}
getDataFromLocal();

// start delete coding
var i;
var allDelBtn = document.querySelectorAll(".del-btn")
for (i = 0; i < allDelBtn.length; i++) {
  allDelBtn[i].onclick = function (e) {
    var tr = this.parentElement.parentElement
    var id = tr.getAttribute("index");
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          userData.splice(id, 1);
          localStorage.setItem("userData", JSON.stringify(userData));
          tr.remove();
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });

  }
}

// start update coding
var allEdit = document.querySelectorAll(".edit-btn")
var allInput = document.querySelectorAll("input")
for (i = 0; i < allEdit.length; i++) {
  allEdit[i].onclick = function () {
    var tr = this.parentElement.parentElement;
    var td = tr.getElementsByTagName("td")
    var index = tr.getAttribute("index")
    var imgTag = td[1].getElementsByTagName("img")
    var profilePic = imgTag[0].src
    var id = td[2].innerHTML
    var name = td[3].innerHTML
    var lastName = td[4].innerHTML
    var email = td[5].innerHTML
    var officeCode = td[6].innerHTML
    var jobTitle = td[7].innerHTML
    employAddBtn.click();
    registerBtn.disabled = true;
    updateForm.disabled = false;
    idEl.value = id
    nameEl.value = name
    lastNameEl.value = lastName
    emailEl.value = email
    officeCodeEl.value = officeCode
    jobTitleEl.value = jobTitle
    profile_pic.src = profilePic
    updateForm.onclick = function (e) {
      userData[index] = {
        id: idEl.value,
        name: nameEl.value,
        lastName: lastNameEl.value,
        email: emailEl.value,
        officeCode: officeCodeEl.value,
        jobTitle: jobTitleEl.value,
        profilePic: uploadPic.value == "" ? profile_pic.src : imgUrl
      }
      localStorage.setItem("userData", JSON.stringify(userData));
      getDataFromLocal();
      location.reload();
      // for(i=0;i<allInput.length;i++){
      //   allInput[i].value = ""
      // }
      
    }
    
  }
  
}






// image processing


uploadPic.onchange = function () {
  if (uploadPic.files[0].size < 1000000) {
    var fReader = new FileReader();
    fReader.onload = function (e) {
      imgUrl = e.target.result;
      profile_pic.src = imgUrl;
    }
    fReader.readAsDataURL(uploadPic.files[0]);
  } else {
    alert("File size is too long")
  }
}





