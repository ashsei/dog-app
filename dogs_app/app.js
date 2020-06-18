// Information Needed for PetFinder API //
var pf = new petfinder.Client({apiKey: "RrxzFfseW2JF3FXz9fbQvlZTdWoouqTj2s3fLbPveZEMMz1D1k", secret: "nL5HscHhnUuX1VjziUMcNRQrMWBAafXrvED23lpb"});


// Searches for Animals
let animal;


// Array of random Zip codes to use in Animal Search
let randomZipCode = [
    "30101", "31404", "60181", "01040", "33880", "20877", "60453", "03054", "06824", "06877", "48195", "02852", "11757"
]

// Assigns Random Zip Code from above array to randomZip variable to use in animalSearch
let randomZip = randomZipCode[Math.floor(Math.random() * randomZipCode.length)]

console.log(randomZip);

animalSearch = () => {
    pf.animal.search({
        type: "dog",
        location: randomZip,
    })
    .then(function (response) {
            console.log(response.data);
            // Randomizes which animal to choose
            let i = Math.floor(Math.random() * 20)
            console.log(response.data.animals[i]);
            animal = response.data.animals[i];
            // Checks that Animal response has a photo, if not, reruns function.
            if (animal.primary_photo_cropped === null){
                animalSearch();
            } else {
                const $petImg = $('<img>').attr('src', animal.primary_photo_cropped.full);
                $('.container').append($petImg);
            }
        })
        .catch(function (error) {
            console.log(error)
        });   
}

animalSearch();