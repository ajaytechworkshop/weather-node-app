console.log('Client side JS is loaded');
 
const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e) => 
{
    e.preventDefault();
    const location= searchInput.value;

    fetch('/weather?addr='+location).then((response) => 
    {
        response.json().then((data) => {

            messageOne.textContent = 'Loaing...';
            messageTwo.textContent = '';
            
            if(data.error){
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.summary + '. The tempterate is '+data.temperature+' .The raining possibility is '+data.precipProbability+' .Temperature high for day is '+data.tempHigh+ ' .Low temperature for the day is '+data.tempLow; 
            }
        });
    });
});