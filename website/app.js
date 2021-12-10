// Personal API Key for OpenWeatherMap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=490c4fbf34ef83e4f4b4410c1193bcda&units=metric';
/*  
    * &units=imperial is for Fahrenheit.
    * &units=metric is for Celcius 
*/

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = `${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}`;


// Event listener to add function to existing HTML DOM element
const generate = document.getElementById('generate');
generate.addEventListener('click' , performAction);

/* Function called by event listener */
function performAction(e) {
    e.preventDefault();
    
    // Get User input value
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    /* Start Check the Value of `zipCode` */
    if (zipCode !== '') /* Start of True => */{
        //make button valid to click
        generate.classList.remove('invalid');
        
        // Call `getInfo` Async
        getInfo(baseUrl , zipCode , apiKey)

        // Call `postInfo` Async
        .then (function(data){
            // Add data
            postInfo('/send' , { date: newDate , temp: data.main.temp , content: content });
        })

        // Call `updateUI` Async
        .then (function(){
            // Update UI
            updateUI()
        })

        // If has any error in zipCode
        .catch (function(error){
            console.log("error" , error);
            alert('The zip code is invalid. Try again!');
        });

    }/* End of True */ 
    /* Start of False */ else {

        generate.classList.add('invalid');
        alert('Enter the zip code!') 
        
    }/* End of `ifelse` Condition */
}


/* Function to GET Web API Data*/
const getInfo = async (baseUrl , zipCode , key) => {
    const res = await fetch(baseUrl + zipCode + key);

    try {
        // Transform into JSON
        const data = await res.json();
        console.log(data);
        return data

    } catch (error) {
        console.log("error" , error);
    }
}

/* Function to POST data */
const postInfo = async (url = '' , data = {}) => {
    const response = await fetch(url , {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })// body data type must match "Content-Type" header        
    });

    try {
        // Transform into JSON
        const newData = await response.json();
        console.log(newDate);
        return newData;

    } catch (error) {
        console.log("error" , error);
    }
}

/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');

    try {
        const allData = await request.json();
        console.log(allData);
        
        if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined) {

            document.getElementById('date').innerHTML = `Date is: ${allData.date}`;
            document.getElementById('temp').innerHTML = `Temp is: ${allData.temp}°C`;
            document.getElementById('content').innerHTML = `Feeling is: ${allData.content}`;
        }

    } catch (error) {
        console.log("error" , error);
    }
}


/*// helper function to convert temperature from Fahrenheit to Celsius `C = (F - 32) / 1.8`
function convertTempToCelsius(Fahrenheit) {
    if (Fahrenheit < (0)) {
        return 'below absolute zero (0 K)';
    } else {
        return ((Fahrenheit - 32) / 1.8).toFixed(2);
    }
} */