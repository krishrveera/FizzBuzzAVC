//declaring get since it is used later on to get user's score from the api
function get(url) {
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onload = function() {
        resolve({ status: http.status, data: JSON.parse(http.response) });
      };
      http.open("GET", url);
      http.send();
    });
}

//declaring post function since it is used later on to create a new user on the api
function post(url, data) {
  data = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onload = function() {
        resolve({ status: http.status, data: JSON.parse(http.response) });
      };
    http.open("POST", url);
    //Make sure that the server knows we're sending it json data.
    http.setRequestHeader("Content-Type", "application/json");
    http.send(data);
  });
}

//function implemented on the clicking of the start button for the user to login to fizzbuzz page
function loginUser() {
  const apiLink = "http://basic-web.dev.avc.web.usf.edu/";
  const userID = document.getElementById("usernameID").value;
  const userURL = apiLink + userID;
  sessionStorage.setItem("userURL", userURL); //use of sessionStorage to store the values to be used in the other JS file
  
    get(userURL).then(function(response) {
          //Put all code that relies on the data from this request in here.
          if(response.status == 200){
            const username = response.data.id; //The username that was requested. In this case it is "myUserName".
            const score = response.data.score; //The user's current score.
            sessionStorage.setItem("userName", username);
            sessionStorage.setItem("score", score);
          }
          else {
            //User "myUserName" not found.
            //response.data is null
            post(userURL, { score: 0 }); //create a new user.
            sessionStorage.setItem("userName", userID);
            sessionStorage.setItem("score", 0);
          }
      window.location.assign("./fizzBuzz.html");
    });
}