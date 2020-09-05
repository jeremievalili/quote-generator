const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const whatsappBtn = document.getElementById('whatsapp');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
// Get quote from API 
async function getQuote() {
    showLoadingSpinner()
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/' 
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerHTML = data.quoteAuthor;
        }

        // Reduce font size for long quotes
        if (data.quoteText.length > 110 ) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerHTML = data.quoteText;
        // Stop Loader, Show Quote
        removeLoadingSpinner();
       
    } catch (error) {
        getQuote();
    }
}

// Tweet a Quote 
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Share on whatsapp
function shareOnWhatsapp() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const whatsappUrl = `whatsapp://send?text=${quote} - ${author}`;
    window.open(whatsappUrl, '_blank');
}

// Share on whatsapp
function shareOnFacebook() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
  //  const facebookUrl = `https://developers.facebook.com/docs/plugins/?text=${quote} - ${author}`;
    const facebookUrl =`https://www.facebook.com/sharer/sharer.php?send?text=${quote}`
  window.open(facebookUrl, '_blank');
}

// Button functions
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
whatsappBtn.addEventListener('click', shareOnWhatsapp);
facebookBtn.addEventListener('click', shareOnFacebook);

// On Load
getQuote()
