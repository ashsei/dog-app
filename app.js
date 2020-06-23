// INFORMATION NEEDED FOR PETFINDER API //
var pf = new petfinder.Client({apiKey: "RrxzFfseW2JF3FXz9fbQvlZTdWoouqTj2s3fLbPveZEMMz1D1k", secret: "nL5HscHhnUuX1VjziUMcNRQrMWBAafXrvED23lpb"});

// GLOBAL VARIABLES //
let i;
let animal;
// Random Zip Codes generated using https://www.randomlists.com/random-zip-codes //
let randomZipCodes = ["30101", "31404", "60181", "01040", "33880", "20877", "60453", "03054", "06824", "06877", "48195", "02852", "11757", "26554", "26003", "28078", "30294", "85302", "28173", "01701", "02136", "83301", "17701", "22304", "54302", "37379", "60035", "27540", "60067", "01970", "33445", "20850", "17011", "30126", "11412", "19050", "91316"];
let randomZip = randomZipCodes[Math.floor(Math.random() * randomZipCodes.length)];
let randomTypes = ["Cat", "Dog"];
let randomType = randomTypes[Math.floor(Math.random() * randomTypes.length)];
let score = 0;
let userZip;
let userType;
// Information for the dogBreeds array was spliced from https://www.britannica.com/topic/list-of-dog-breeds-2027892 //
let dogBreeds = ['Affenpinscher', 'Afghan Hound', 'Airedale Terrier' , 'Akita', 'Alaskan Malamute', 'American Staffordshire Terrier', 'American Water Spaniel', 'Australian Cattle Dog', 'Australian Shepherd', 'Australian Terrier', 'Basenji', 'Basset Hound', 'Beagle', 'Bearded Collie', 'Bedlington Terrier', 'Bernese Mountain Dog', 'Bichon Frise', 'Black and Tan Coonhound', 'Bloodhound', 'Border Collie', 'Border Terrier', 'Borzoi', 'Boston Terrier', 'Bouvier des Flandres', 'Boxer', 'Briard', 'Brittany', 'Brussels Griffon', 'Bull Terrier', 'Bulldog', 'Bullmastiff', 'Cairn Terrier', 'Canaan Dog', 'Chesapeake Bay Retriever', 'Chihuahua', 'Chinese Crested', 'Chinese Shar-Pei', 'Chow Chow', 'Clumber Spaniel', 'Cocker Spaniel', 'Collie', 'Curly-Coated Retriever', 'Dachshund', 'Dalmation', 'Doberman Pinscher', 'English Cocker Spaniel', 'English Setter', 'English Springer Spaniel', 'English Toy Spaniel', 'Eskimo Dog', 'Finnish Spitz', 'Flat-Coated Retriever', 'Fox Terrier', 'Foxhound', 'French Bulldog', 'German Shepherd', 'German Shorthaired Pointer', 'German Wirehaired Pointer', 'Golden Retriever', 'Gordon Setter', 'Great Dane', 'Greyhound', 'Irish Setter', 'Irish Water Spaniel', 'Irish Wolfhound', 'Jack Russell Terrier', 'Japanese Spaniel', 'Keeshond', 'Kerry Blue Terrier', 'Komondor', 'Kuvasz', 'Labrador Retriever', 'Lakeland Terrier', 'Lhasa Apso', 'Maltese', 'Manchester Terrier', 'Mastiff', 'Mexican Hairless', 'Newfoundland', 'Norwegian Elkhound', 'Norwich Terrier', 'Otterhound', 'Papillon', 'Pekingese', 'Pointer', 'Pomeranian', 'Poodle', 'Pug', 'Puli', 'Rhodesian Ridgeback', 'Rottweiler', 'Saint Bernard', 'Saluki', 'Samoyed', 'Schipperke', 'Schnauzer', 'Scottish Deerhound', 'Scottish Terrier', 'Sealyham Terrier', 'Shetland Sheepdog', 'Shih Tzu', 'Siberian Husky', 'Silky Terrier', 'Skye Terrier', 'Staffordshire Bull Terrier', 'Soft-Coated Wheaten Terrier', 'Sussex Spaniel', 'Spitz', 'Tibetan Terrier', 'Vizsla', 'Weimaraner', 'Welsh Terrier', 'West Highland White Terrier', 'Whippet', 'Yorkshire Terrier'];
// Information for the catBreeds array was spliced from https://www.petfinder.com/cat-breeds/?page=1 //
let catBreeds = ['Abyssinian', 'American Bobtail', 'American Curl', 'American Shorthair', 'American Wirehair', 'Balinese', 'Bengal', 'Birman', 'Bombay', 'British Shorthair', 'Burmese', 'Burmilla', 'Chartreux', 'Chausie', 'Cornish Rex', 'Cymric', 'Devon Rex', 'Egyptian Mau', 'Exotic Shorthair', 'Havana', 'Himalayan', 'Japanese Bobtail', 'Javanese', 'Korat', 'LaPerm', 'Maine Coon', 'Manx', 'Munchkin', 'Nebelung', 'Norwegian Forest Cat', 'Ocicat', 'Oriental Short Hair', 'Persian', 'Pixiebob', 'Ragamuffin', 'Ragdoll', 'Russian Blue', 'Scottish Fold', 'Selkirk Rex', 'Siamese', 'Siberian', 'Singapura', 'Snowshoe', 'Somali', 'Sphynx/Hairless Cat', 'Tonkinese', 'Toyger', 'Turkish Angora', 'Turkish Van', 'York Chocolate'];



// FUNCTIONS //

// Event Listener for Search Input //
const loadSearch = () => {
    $('#search').on('click', () => {
        $('.userInput').hide()
        if (userType == 'Cat'){
            $('.catloader').show().html('<img id = "loader" src = "Images/catloader.gif"/>');
        } else {
            $('.dogloader').show().html('<img id = "loader" src = "Images/dogloader.gif">');
        };
        userZip = $('#zip').val();
        userType = $('#type :selected').val();
        animalSearch(userZip, userType);
        console.log(userZip, userType);
        return userZip, userType;
    });
    $('#random').on('click', () => {
        $('.userInput').hide();
        userZip = randomZip;
        userType = randomType;
        if (userType == 'Cat'){
            $('.catloader').show().html('<img id = "loader" src = "Images/catloader.gif"/>');
        } else {
            $('.dogloader').show().html('<img id = "loader" src = "Images/dogloader.gif">');
        };
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
        $('.catloader').hide();
        $('.dogloader').hide();
        $('#mainlogo').hide();
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
    const $nameAnimal = $('<div>').text('Name: ' + animal.name);
    $('.infoContainer').append($nameAnimal);
    if (animal.breeds.secondary != null) {
        let breed = (animal.breeds.primary + " " + animal.breeds.secondary);
        const $breedAnimal = $('<div>').text('Breed: ' + breed);
        $('.infoContainer').append($breedAnimal);
    } else {
        let breed = (animal.breeds.primary)
        const $breedAnimal = $('<div>').text(breed);
        $('.infoContainer').append($breedAnimal);
    };
    const $adpoptionInfo = $('<div>').html(`<a href= ${animal.url} target = "_blank">Click here to find out more information about this cutie!</a>`);
    $('.infoContainer').append($adpoptionInfo);
}
// Function to Append Random Answer Choices to User Select //
const appendAnswers = (response) => {
    if (userType == 'Cat') {
        // Adds four random answers to answer choices in random order from list of Cat Breeds //
        for (let x = 0; x < 3; x++){
            let randomCatAnswer = catBreeds[Math.floor(Math.random() * catBreeds.length)];
            $(`#answer${Math.floor(Math.random() * 5 + 1)}`).html(`<option value = ${randomCatAnswer}>${randomCatAnswer}</option>`);
        };
        // Adds correct answer to answer choices //
        $(`#answer${Math.floor(Math.random() * 5 + 1)}`).html(`<option value = ${response.data.animals[i].breeds.primary}>${response.data.animals[i].breeds.primary}</option>`);
    } else {
        // Adds four random answers to answer choices in random order from list of Dog Breeds //
        for (let x = 0; x < 3; x++){
            let randomDogAnswer = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
            $(`#answer${Math.floor(Math.random() * 5 + 1)}`).html(`<option value = ${randomDogAnswer}>${randomDogAnswer}</option>`);
        };
        // Adds correct answer to answer choices //
        $(`#answer${Math.floor(Math.random() * 5 + 1)}`).html(`<option value = ${response.data.animals[i].breeds.primary}>${response.data.animals[i].breeds.primary}</option>`);
    };
};

// Event Listener for User Interaction with Game Functioniality //
const gameFunction = (response) => {
    appendAnswers(response);
    $('#submit').on('click', () => {
        let userAnswer = $('#bguess :selected').val();
        let correctAnswer = response.data.animals[i].breeds.primary;
        // console.log(correctAnswer); - Debugging
        // console.log(correctAnswer2); - Debugging
        // console.log(userAnswer); - Debugging
        // Conditional to Check User Answer Against Correct Answer
        if(userAnswer === correctAnswer) {
            // alert('Correct! You get two points!')
            score ++;
            $('.scoreCounter').text("Correct! You now have " + score + " Paw Points!");
            $('.imageContainer').hide();
            $('.userInteraction').hide();
            $('.infoContainer').show();
            $('#playAgain').show();
            console.log(score);
            return score;
        } else if (userAnswer != correctAnswer) {
            // alert('Incorrect! Try again!');
            score -= 1;
            $('.scoreCounter').text("Incorrect! You now have " + score + " Paw Points!");
            $('.imageContainer').hide();
            $('.userInteraction').hide();
            $('.infoContainer').show();
            $('#playAgain').show();
            console.log(score)
            return score;
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
        $('.scoreCounter').text("Cheater! You now have " + score + " Paw Points!");
    });
};

// Event Listener for Reset Functionality //
const reset = () => {
    $('#reset').on('click', () => {
        location = location
    });
};

// Event Listener for Play Again //
const playAgain = () => {
    $('#playAgain').on('click',() => {
        $('.infoContainer').hide();
        $('.imageContainer').hide();
        $('.imageContainer').empty();
        $('.infoContainer').empty();
        $('.scoreCounter').hide();
        if (userType == 'Cat'){
            $('.catloader').show().html('<img id = "loader" src = "Images/catloader.gif"/>');
        } else {
            $('.dogloader').show().html('<img id = "loader" src = "Images/dogloader.gif">');
        };
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
