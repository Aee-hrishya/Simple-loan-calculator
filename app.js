//listen for submit
document.querySelector("#loan-form").addEventListener("submit", function(e){
    
    //hide the results
    document.getElementById("results").style.display = "none";

    //Show the loader
    document.getElementById("loading").style.display = "block";


    //setTimeOut of 2 seconds
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

//calculateResults function
function calculateResults(){

    //UI vars
    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");

    const principal = parseFloat(amount.value); //converting to float as we need float values to calculate
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    //Compute monthly payments
    const x = Math.pow((1 + calculatedInterest),calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    //Checking if the monthly payment is finite or not
    if(isFinite(monthly)){
        //Setting the values in results
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //display results and hide loader
        document.getElementById("loading").style.display = "none";
        document.getElementById("results").style.display = "block";

    }
    else{

        //Hide loader
        document.getElementById("loading").style.display = "none";

        //showError
        showError("Please enter valid input");
    }

    
}

//showError function
function showError(error){
    //create element
    const errorDiv = document.createElement("div");

    //Get elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    //add classname
    errorDiv.className = "alert alert-danger";

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert the errorDiv above the heading
    card.insertBefore(errorDiv,heading);   

    //clear the error after 2 seconds
    window.setTimeout(clearError, 2000) //2000ms = 2secs
}

//clearError function
function clearError(){
    document.querySelector(".alert").remove();
}