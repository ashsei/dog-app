// INFORMATION NEEDED FOR PETFINDER API //
var pf = new petfinder.Client({apiKey: "RrxzFfseW2JF3FXz9fbQvlZTdWoouqTj2s3fLbPveZEMMz1D1k", secret: "nL5HscHhnUuX1VjziUMcNRQrMWBAafXrvED23lpb"});

// GLOBAL VARIABLES //
let i;
let animal;
// !!! ADD MORE ZIP CODES !!! //
let randomZipCodes = ["30101", "31404", "60181", "01040", "33880", "20877", "60453", "03054", "06824", "06877", "48195", "02852", "11757"]
let randomZip = randomZipCodes[Math.floor(Math.random() * randomZipCodes.length)]
// FUNCTIONS //

// User Prompts on Page Load //
userZip = prompt("Please enter your zip code. If you would prefer, a random zip code will be assigned if nothing is entered or if an invalid zip code is entered.")
if (userZip.length != 5) {
    userZip = randomZip;
} 
let formatUserZip = userZip.toString();
userAnimalSelect = prompt("Cat or Dog? Default is Dog if you don't make a selection or make an invalid selection.");
if (userAnimalSelect != "Cat" || "Dog") {
    userAnimalSelect = "Dog";
}
let formatAnimalSelect = userAnimalSelect.toString();

// Function to Append Animal Photo on Page Load //
appendAnimalPhoto = (response) => {
    i = Math.floor(Math.random() * response.data.animals.length);
    animal = response.data.animals[i];
    // Checks that Animal response has a photo, if not, chooses new animal from array at random //
    if (animal.primary_photo_cropped === null){
        animalSearch();
    // If the original randomly selected animal does have a photo, appends photo to HTML
    } else {
        const $animalImg = $('<img>').attr('src', animal.primary_photo_cropped.full).attr('id', 'randomAnimal');
        $('.imageContainer').append($animalImg);
    };
    return i, animal;
};

// !!! THIS INFORMATION NEEDS TO BE HIDDEN UNTIL USER GUESSES BREED OR REQUESTS MORE INFORMATION  !!! //
// Function to Append Animal Info on User Interaction //
appendAnimalInfo = (response) => {
    const $smallAnimalPhoto = $('<img>').attr('src', animal.primary_photo_cropped.small).attr('id', 'infoPhoto');
    $('.animalPhotoSmall').append($smallAnimalPhoto);
    const $nameAnimal = $('<div>').text(animal.name);
    $('.animalName').append($nameAnimal);
    if (animal.breeds.secondary != null) {
        let breed = (animal.breeds.primary + " " + animal.breeds.secondary)
        const $breedAnimal = $('<div>').text(breed);
        $('.animalBreed').append($breedAnimal);
    } else {
        let breed = (animal.breeds.primary)
        const $breedAnimal = $('<div>').text(breed);
        $('.animalBreed').append($breedAnimal);
    };
    // !!! THIS NEEDS TO BE AN ACTUAL LINK !!! //
    const $adpoptionInfo = $('<div>').text("Follow this link to find out more information on this cutie! " + animal.url)
    $('.animalAdoption').append($adpoptionInfo);
}

// Event Listener for User Interaction //
gameFunction = (response) => {
    $('#submit').on('click', () => {
        let userAnswer = $('#guess').val();
        let correctAnswer = response.data.animals[i].breeds.primary;
        let correctAnswer2 = "";
        if (response.data.animals[i].breeds.secondary != null) {
            correctAnswer2 = response.data.animals[i].breeds.secondary
            return correctAnswer2;
        }
        // console.log(correctAnswer); - Debugging
        console.log(correctAnswer2);
        // console.log(userAnswer); - Debugging

        if(userAnswer.toUpperCase() == correctAnswer.toUpperCase() || userAnswer.toLowerCase() == correctAnswer2.toUpperCase()) {
            // !!! Add More Functionality Here (Hide/Show Certain Aspects of Website) !!! //
            alert('Correct!')
            $('.imageContainer').hide();
            $('.infoContainer').show();
        } else {
            alert('Sorry, try again!')
            $('.imageContainer').hide();
            $('.infoContainer').show();
        };
    })
}

animalSearch = () => {
    // Part of the code below was spliced from the Petfinder API JS Documentation found at https://github.com/petfinder-com/petfinder-js-sdk //
    pf.animal.search({
        type: formatAnimalSelect,
        location: formatUserZip,
    })
    .then(function (response) {
        console.log(response.data);
        appendAnimalPhoto(response);
        $('.imageContainer').show();
        appendAnimalInfo(response);
        $('.infoContainer').hide();
        gameFunction(response);
    })
    .catch(function (error) {
        console.log(error)
        });   
}


// CALLBACKS //

$(()=> {
    animalSearch();
})

