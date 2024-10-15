//Access HTML elements using ids

const quoteContainer = document.getElementById('quote-container');//used for loader
const quotetext = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const caller = document.getElementById('remember');

//Show Loading
function loading(){
    loader.hidden= false;
    quoteContainer.hidden = true;
}

//Hide Loading-remove loading spinner
function complete(){
    quoteContainer.hidden= false;
    loader.hidden = true;
}

//Changing h4 tag names

const calls = ['Remember,', 'Never Forget,', 'Keep in mind,', 'Pitch this in your heart and mind,' ]

function changingCalls(){
    const call = calls[Math.floor(Math.random()*calls.length)]
    caller.textContent = call
}
//Get QUOTES from API
//Use Async code-try and catch functions to fetch data

let apiQuotes = [];

//Show new quote, randomly

function newQUOTE(){
    loading();
    // Pick a random quote from API QUOTES array
    //index has to be whole number
    //we can't use loop because it's not iteration, it's random pickup
    const quote =apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    //grabbing the quote and author using.textContent
    //authorText.textContent = quote.author;

    //Check if Author field is blank and replace it with 'unknown'
    if (!quote.author){
        authorText.textContent = 'unknown'
    } else {
        authorText.textContent = quote.author
    }

    //Check Quote Length to determine styling
    if (quote.text.length > 120){
        quotetext.classList.add('long-quote');
    } else {
        quotetext.classList.remove('long-quote');
    }
    //Set quote. Hide Loader
    quotetext.textContent = quote.text;
    complete()
}

async function getQuotes(){
    loading();
    changingCalls();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response= await fetch(apiURL);
        apiQuotes = await response.json()
        newQUOTE();
    } catch (error) {
        //Catch error Here
        alert('I am depressed now, gathering some motivation and coming back later')
    }
}

//Tweet Quote

function tweetQuote(){
    const twitterUrl = `https://www.threads.net/intent/post?text=${quotetext.textContent} - ${authorText.textContent}`;
    //open twitter in new window
    window.open(twitterUrl, '_blank')
}


//Event Listeners
newQuoteBtn.addEventListener('click', function(){
    newQUOTE();
    changingCalls();
});
twitterBtn.addEventListener('click', tweetQuote);
//When page loaded
getQuotes();
