// INFORMATION NEEDED FOR PETFINDER API //
var pf = new petfinder.Client({apiKey: "RrxzFfseW2JF3FXz9fbQvlZTdWoouqTj2s3fLbPveZEMMz1D1k", secret: "nL5HscHhnUuX1VjziUMcNRQrMWBAafXrvED23lpb"});

// GLOBAL VARIABLES //
let i;
let animal;
// !!! ADD MORE ZIP CODES !!! //
let randomZipCodes = ["30101", "31404", "60181", "01040", "33880", "20877", "60453", "03054", "06824", "06877", "48195", "02852", "11757"];
let randomZip = randomZipCodes[Math.floor(Math.random() * randomZipCodes.length)];
let randomTypes = ["Cat", "Dog"];
let randomType = randomTypes[Math.floor(Math.random() * randomTypes.length)];
let score = 0;
let userZip;
let userType;


// FUNCTIONS //

// Event Listener for Search Input //
const loadSearch = () => {
    // !!! ADD FUNCTIONALITY TO VALIDATE USER INPUT AS VALID SEARCH, IF NOT USE DEFAULT OF RANDOM ZIP AND DOG/CAT
    $('#search').on('click', () => {
        $('.userInput').hide()
        $('.waiting').show().html('<img id = "loader" src = "Images/loader.gif"/>');
        userZip = $('#zip').val();
        userType = $('#type').val();
        animalSearch(userZip, userType);
        console.log(userZip, userType);
        return userZip, userType;
    });
    $('#random').on('click', () => {
        $('.userInput').hide()
        $('.waiting').show().html('<img id = "loader" src = "Images/loader.gif"/>');
        userZip = randomZip;
        userType = randomType;
        animalSearch(userZip, userType);
        console.log(userZip, userType);
        return userZip, userType;
    })
};

// Petfinder API Call //
const animalSearch = (Zip, Type) => {
    // Part of the code below was spliced from the Petfinder API JS Documentation found at https://github.com/petfinder-com/petfinder-js-sdk //
    pf.animal.search({
        type: Type,
        location: Zip,
    })
    .then(function (response) {
        $('.header').hide();
        $('.waiting').hide();
        $('.scoreCounter').show();
        $('.userInteraction').show();
        console.log(response);
        appendAnimalPhoto(response);
        $('.imageContainer').show();
        appendAnimalInfo(response);
        $('.infoContainer').hide();
        gameFunction(response);
        $('.scoreCounter').text("Your Score: " + score);
    })
    .catch(function (error) {
        console.log(error)
    });   
};

// Function to Append Animal Photo on Page Load //
const appendAnimalPhoto = (response) => {
    i = Math.floor(Math.random() * response.data.animals.length);
    console.log(i);
    animal = response.data.animals[i];
    // Checks that Animal response has a photo, if not, chooses new animal from array at random //
    if (animal.primary_photo_cropped === null){
        animalSearch(userZip, userType);
    // If the original randomly selected animal does have a photo, appends photo to HTML
    } else {
        const $animalImg = $('<img>').attr('src', animal.primary_photo_cropped.full).attr('id', 'randomAnimal');
        $('.imageContainer').append($animalImg);
    };
    return i, animal;
    
};

// Function to Append Animal Info on User Interaction //
const appendAnimalInfo = (response) => {
    let $photoAnimal;
    if (animal.photos.hasOwnProperty('1')) {
        $photoAnimal = $('<img>').attr('src', animal.photos[1].full).attr('id', 'detailPhoto');
    } else {
        $photoAnimal = $('<img>').attr('src', animal.photos[0].full).attr('id', 'detailPhoto');
    };
    $('.infoContainer').append($photoAnimal)    
    const $nameAnimal = $('<div>').text(animal.name);
    $('.infoContainer').append($nameAnimal);
    if (animal.breeds.secondary != null) {
        let breed = (animal.breeds.primary + " " + animal.breeds.secondary);
        const $breedAnimal = $('<div>').text(breed);
        $('.infoContainer').append($breedAnimal);
    } else {
        let breed = (animal.breeds.primary)
        const $breedAnimal = $('<div>').text(breed);
        $('.infoContainer').append($breedAnimal);
    };
    const $adpoptionInfo = $('<div>').html(`<a href= ${animal.url} target = "_blank">Click here to find out more information about this cutie!</a>`);
    $('.infoContainer').append($adpoptionInfo);
}

// Event Listener for User Interaction with Game Functioniality //
const gameFunction = (response) => {
    $('#submit').on('click', () => {
        let userAnswer = $('#guess').val();
        let correctAnswer = response.data.animals[i].breeds.primary;
        let correctAnswer2 = "";
        if (response.data.animals[i].breeds.secondary != null) {
            correctAnswer2 = response.data.animals[i].breeds.secondary
        };
        // console.log(correctAnswer); - Debugging
        // console.log(correctAnswer2); - Debugging
        // console.log(userAnswer); - Debugging
        // Conditional to Check User Answer Against Correct Answer
        if(userAnswer.toUpperCase() == correctAnswer.toUpperCase() && userAnswer.toUpperCase() == correctAnswer2.toUpperCase()) {
            // !!! Add More Functionality Here (Hide/Show Certain Aspects of Website) !!! //
            alert('Correct! You get two points!')
            score += 2;
            $('.scoreCounter').text("Your Score: " + score);
            $('.imageContainer').hide();
            $('.userInteraction').hide();
            $('.infoContainer').show();
            $('#playAgain').show();
        } else if (userAnswer.toUpperCase() == correctAnswer.toUpperCase() || userAnswer.toUpperCase() == correctAnswer2.toUpperCase()) {
            alert('Kinda Right! You get one point!')
            score += 1;
            $('.scoreCounter').text("Your Score: " + score);
            $('.imageContainer').hide();
            $('.userInteraction').hide();
            $('.infoContainer').show();
            $('#playAgain').show();
        } else {
            alert('Incorrect! Try again!');
            score -= 1;
            $('.scoreCounter').text("Your Score: " + score);
            $('.imageContainer').hide();
            $('.userInteraction').hide();
            $('.infoContainer').show();
            $('#playAgain').show();
        };
    });
};

// Event Listener for Reveal Information Button //
const revealInfo = () => {
    $('#revealAnswer').on('click',() => {
        $('.imageContainer').hide();
        $('.userInteraction').toggle();
        $('.infoContainer').show();
        $('#playAgain').show();
        score -= 1;
        $('.scoreCounter').text("Your Score: " + score);
    });
};



// Event Listener for Reset Functionality //
const reset = () => {
    $('#reset').on('click', () => {
        score = 0;
        // !!! ADD FUNCTIONALITY TO HAVING LOADING GIF PLAY WHILE RELOADING ANIMAL SEARCH !!! //
        $('.imageContainer').empty();
        $('.infoContainer').empty();
        $('.waiting').show().html('<img id = "loader" src = "Images/loader.gif"/>');
        animalSearch(userZip, userType);
        console.log(userZip, userType);
    });
};

// Event Listener for Play Again //
const playAgain = () => {
    $('#playAgain').on('click',() => {
        $('.infoContainer').hide();
        $('.imageContainer').show();
        $('.imageContainer').empty();
        $('.infoContainer').empty();
        $('.waiting').show().html('<img id = "loader" src = "Images/loader.gif"/>');
        animalSearch(userZip, userType);
        console.log(userZip, userType);
        $('#playAgain').hide();    
    });
};



// CALLBACKS //

$(()=> {
    $('#playAgain').hide();
    $('.userInteraction').hide();
    $('.imageContainer').hide();
    $('.infoContainer').hide();
    $('.scoreCounter').hide();
    loadSearch();
    reset();
    revealInfo();
    playAgain();
});
