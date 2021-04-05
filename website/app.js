/* Global Variables */
const url = "http://api.openweathermap.org/data/2.5/weather?zip="
const key = "&appid=9851d7c37c05e8ae7e45530fc8b3b9e8";
const units = "&units=metric"
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click' , action);

/* Function called by event listener */
function action(event) {
    event.preventDefault();

    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    //checking if zip is empty !
    if(zip == "") {
        alert("Please Fill Out The Empty Field");
        return false;
    }

    getData(url , zip , key , units)
    .then(function(u) {
        console.log(u)
        postData("/add" , {date:newDate , temp:u.main.temp , content, countryName:u.name})
        console.log(`It is ${u.name}`)
        UI();
    })
}

/* Function to GET Web API Data*/
const getData = async(url , zip , key , units) => {
    const response = await fetch(url + zip + key + units);
    try{
        const Data = await response.json();
        return Data;
    }catch(err){
        console.log("error" , err)
    }
}


/* Function to POST data */
const postData = async(url='' , data={}) => {
    const request = await fetch(url , {
        method :'POST' ,
        credentials : "same-origin" ,
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            date : data.date,
            temp : data.temp ,
            content : data.content,
            name:data.countryName
        })
    })
    try{
        const newD = await request.json();
        return newD;
    }catch(error){
        console.log("error" , error)
    }
};

//Function to update UI
const UI = async () => {
    const request = await fetch('/all');
    try{
        const wholeData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${wholeData.date}`;
        document.getElementById('temp').innerHTML = `Temp: ${wholeData.temp} Celcius`;
        document.getElementById('content').innerHTML = `Feeling: ${wholeData.content}`;
        document.getElementById('name').innerHTML = `It is ${wholeData.countryName}`
    }catch(error){
        console.log("error" , error)
    }
};