// Welcome message to be shown as the page loads
window.onload = function() {
    const userName = sessionStorage.getItem("userName");
    document.getElementById("welcomeMessage").innerHTML = "Welcome, " + userName;
}

//redeclaration of post function since it is being used later on to update scores
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

//function that is implemented on the click of the button
function increment() {
    let scores = sessionStorage.getItem("score");
    scores++;
    sessionStorage.setItem("score", scores); //restoring the new value back in the original scores variable
    let outputValue = FizzBuzz(scores);
    document.getElementById("output").innerHTML = outputValue;
    const dataToSend = { score: scores};
    const userURL = sessionStorage.getItem("userURL");
    post(userURL, dataToSend); //updating the user's new score back on the api
}
 

//actual fizzbuzz logic
function FizzBuzz(score){
    if(score % 3 == 0 && score % 5 == 0){  
        // return "FizzBuzz";
        return "FizzBuzz";
    }
    else if(score % 3 == 0){
        return "Fizz";
    }
    else if(score % 5 == 0){
        return "Buzz";
    }
    else{
        return score;
    }
}