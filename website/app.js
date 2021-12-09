// Personal API Key for OpenWeatherMap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=490c4fbf34ef83e4f4b4410c1193bcda';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();

// Get form of 'userInfo' id
const userInfo = document.getElementById('userInfo');

// Event listener to add function to existing HTML DOM element
const generate = document.getElementById('generate');
generate.addEventListener('click' , performAction);

/* Function called by event listener */
function performAction(e) {
    e.preventDefault();
    
    // Get User input value
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    if (zipCode !== '') {
        //make button valid to click
        generate.classList.remove('invalid');
        
        getInfo(baseUrl , zipCode , apiKey)

        .then (function(data){
            postInfo('/send' , { date: newDate , temp: convertTempToCelsius(data.main.temp) , content: content });
        })

        .then (function(){
            updateUI()
        })

        .catch (function(error){
            console.log("error" , error);
            alert('The zip code is invalid. Try again');
        });

        userInfo.reset();

    } else {
        generate.classList.add('invalid'); 
    }
}

/* Function to GET Web API Data*/
const getInfo = async (baseUrl , zipCode , key) => {
    const res = await fetch(baseUrl + zipCode + key);

    try {
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
        })
    });

    try {
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


// helper function to convert temperature from Kelvin to Celsius
function convertTempToCelsius(kelvin) {
    if (kelvin < (0)) {
        return 'below absolute zero (0 K)';
    } else {
        return (kelvin - 273.15).toFixed(2);
    }
}