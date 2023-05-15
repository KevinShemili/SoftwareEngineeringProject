let projectNameField = document.getElementById("projectName");
let clientNameField = document.getElementById("clientName");
let clientEmailField = document.getElementById("email");
let countryField = document.getElementById("country");
let descriptionField = document.getElementById("description");

let publishButton = document.getElementById("publish");
let cancelButton = document.getElementById("cancel");

let error = document.getElementById("invisible-error1");

let applicantModal = document.getElementById("modal1");
let modalYesButton = document.getElementById("modalYes");
let modalCancelButton = document.getElementById("modalCancel");

let editModal = document.getElementById("modal2");

let content = document.getElementById("content");

const urlParams = new URLSearchParams(window.location.search);

window.onload = () => {
  const id = urlParams.get("projectId");

  let http = new XMLHttpRequest();
  http.open("GET", "../scripts/getProject.php?id=" + id, true);

  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      // Hide the spinner
      document.getElementById("spinner").style.display = "none";

      let response = JSON.parse(http.responseText);
      if (response == "empty") {
        error.innerText = "Server Error.";
      } else {
        // Show the form fields
        content.style.display = "block";

        projectNameField.value = response.name;
        clientNameField.value = response.client;
        clientEmailField.value = response.clientEmail;
        countryField.value = response.country;
        descriptionField.value = response.description;
      }
    }
  };

  http.send();
};

publishButton.addEventListener("click", () => {
  const id = urlParams.get("projectId");

  var xhr = new XMLHttpRequest();

  xhr.open("POST", "../scripts/updateProject.php", true);

  var form = new FormData();

  form.append("id", id);

  if (projectNameField.value == "" || projectNameField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  } else {
    form.append("projectName", projectNameField.value);
  }

  if (clientNameField.value == "" || clientNameField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  } else {
    form.append("clientName", clientNameField.value);
  }

  if (clientEmailField.value == "" || clientEmailField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  } else {
    form.append("clientEmail", clientEmailField.value);
  }

  if (countryField.value == "" || countryField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  } else {
    form.append("country", countryField.value);
  }

  if (descriptionField.value != descriptionField.value) {
    error.innerText = "Fill in all fields.";
    return;
  } else {
    form.append("description", descriptionField.value);
  }

  xhr.send(form);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      if (response == 200) {
        $(editModal).modal("show");
        setTimeout(() => {
          $(editModal).modal("hide");
          location.reload();
        }, 3000);
      } else {
        error.innerText = response;
      }
    }
  };
});

cancelButton.addEventListener("click", () => {
  window.location.href = `../views/adminProjects.php`;
});

$(document).ready(function () {
  $("#modalCancel").click(function () {
    $("#exampleModalCenter2").modal("hide");
  });
});

$(document).ready(function () {
  $("#closeModal").click(function () {
    $("#exampleModalCenter2").modal("hide");
  });
});

removePhoto.addEventListener("click", () => {
  $(modal2).modal("show");
});

modalDeleteButton.addEventListener("click", () => {
  const id = urlParams.get("id");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "../scripts/deletePhoto.php");
  let form = new FormData();

  form.append("id", id);

  xhr.send(form);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      if (response == 200) {
        $("#exampleModalCenter2").modal("hide");
        $(modal).modal("show");
        document.getElementById("exampleModalLongTitle").innerText = "";
        modalBody.innerHTML = "Deleting...";
        setTimeout(() => {
          modalBody.innerHTML = "Deleted.";
          $(modal).modal("hide");
          location.reload();
        }, 3000);
      } else {
        error2.innerText = response;
      }
    }
  };
});

saveBtn3.addEventListener("click", () => {
  if (!checkBox2.checked) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../scripts/updateKeys.php", true);

    var form = new FormData();
    const id = urlParams.get("id");
    form.append("id", id);

    if (consumerKey.value == "" || consumerKey.value == null) {
      error3.innerText = "Fill in all fields.";
      return;
    }

    if (consumerSecret.value == "" || consumerSecret.value == null) {
      error3.innerText = "Fill in all fields.";
      return;
    }

    if (accessToken.value == "" || accessToken.value == null) {
      error3.innerText = "Fill in all fields.";
      return;
    }

    if (accessTokenSecret.value == "" || accessTokenSecret.value == null) {
      error3.innerText = "Fill in all fields.";
      return;
    }

    form.append("consumerKey", consumerKey.value);
    form.append("consumerSecret", consumerSecret.value);
    form.append("accessToken", accessToken.value);
    form.append("accessTokenSecret", accessTokenSecret.value);

    xhr.send(form);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        if (response == 200) {
          $(modal).modal("show");
          setTimeout(() => {
            modalBody.innerHTML = "Saved.";
            $(modal).modal("hide");
            location.reload();
          }, 3000);
        } else {
          error3.innerText = response;
        }
      }
    };
  }
});
