import './../styles/styles.css';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes, listAll, list, deleteObject } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBJwX2FSrFkzxWXTiUHzu3TcGHi-ijfPGs",
    authDomain: "sda-firebase-9021a.firebaseapp.com",
    projectId: "sda-firebase-9021a",
    storageBucket: "sda-firebase-9021a.appspot.com",
    messagingSenderId: "994801333963",
    appId: "1:994801333963:web:5f83dfd22504d1c5660d4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


//ZADANKO!

//1. Po kliknieciu w elemencie H1 ma sie pojawic info "Przesyłam..."
//2. Po zakończeniu przesyłania w elemencie H1 ma się pojawić info "Przesłano!"
//3. Dodajemy nowy input, w którym użytkownik może wpisać nazwę pliku
//4. Plik z tą nazwą będzie przesłany
//5. Jeżeli użytkownik nie wybrał pliku i kliknął prześli, to w elemencie H1 wyświetlamy
//   "Error: Wybierz plik" 
// const myBtn = document.getElementById("mySendBtn");
// myBtn.addEventListener("click", () => {
//     const myResult = document.getElementById("myResult");

//     const file = document.getElementById("myFileInput").files[0];
//     if (file) {
//         myResult.innerText = "Przesyłam...";
//         const myFileNameInput = document.getElementById("myFileNameInput");
//         const myFileRef = ref(storage, myFileNameInput.value);

//         uploadBytes(myFileRef, file).then((result) => {
//             myResult.innerText = "Przesłano!";
//         });
//     }
//     else {
//         myResult.innerText = "Error: Wybierz plik!";
//     }
// });

// const imageRef = ref(storage, "ZdjęcieCV.png");
// getDownloadURL(imageRef).then((url) => {
//     const myImage = document.getElementById("myImage");
//     myImage.src = url;
// });


//ZADANKO!
//1. Po przesłaniu obrazka wyświetl ten obrazek w HTMLu
// -- Wykorzystaj metode getDownloadURL
// const myBtn = document.getElementById("mySendBtn");
// myBtn.addEventListener("click", () => {
//     const myResult = document.getElementById("myResult");
//     const file = document.getElementById("myFileInput").files[0];

//     if (file) {
//         myResult.innerText = "Przesyłam...";
//         const myFileNameInput = document.getElementById("myFileNameInput");
//         const myFileRef = ref(storage, myFileNameInput.value);

//         uploadBytes(myFileRef, file).then((result) => {
//             myResult.innerText = "Przesłano!";

//             getDownloadURL(result.ref).then((url) => {
//                 const myImage = document.getElementById("myImage");
//                 myImage.src = url;
//             });
//         });
//     }
//     else {
//         myResult.innerText = "Error: Wybierz plik!";
//     }
// });

//ZADANKO
//1. Wyświetl wszystkie pliki w postaci listy numerowanej bądź nienumerowanej
// const storageRef = ref(storage);
// listAll(storageRef).then((res) => {
//     const myList = document.getElementById("myFilesList");
//     res.items.forEach(item => {
//         const listItem = document.createElement("li");
//         listItem.innerText = item.fullPath;
//         myList.appendChild(listItem);
//     })
// })


// const imageRef = ref(storage, "Test2.jpg");
// deleteObject(imageRef).then(() => {
//     console.log("Plik usunieto!");
// });


//ZADANKO
// Wyswietl wszystkie obrazki, które są w twoim CloudStorage
// const storageRef = ref(storage);
// listAll(storageRef).then((res) => {
//     res.items.forEach(item => {
//         const img = document.createElement("img");
//         const div = document.createElement("div");

//         div.classList.add("card");
//         img.classList.add('image');

//         div.appendChild(img);
//         document.body.appendChild(div);

//         getDownloadURL(item).then((url) => {
//             img.src = url;
//         })
//     })
// })


//ZADANKO
// Dodajemy przycisk usuń, który usuwa wskazane zdjęcie i odświeża liste.
function loadImagesList() {
    const storageRef = ref(storage);
    document.body.innerHTML = "";
    listAll(storageRef).then((res) => {
        res.items.forEach(item => {
            const img = document.createElement("img");
            const div = document.createElement("div");
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.dataset.imageName = item.fullPath;

            // deleteBtn.addEventListener("click", (event) => {
            //     const imageRef = ref(storage, event.target.dataset.imageName);
            //     deleteObject(imageRef).then(() => {
            //         console.log("Plik usunieto!");
            //     });
            // });

            deleteBtn.addEventListener("click", () => {
                deleteObject(item).then(() => {
                    loadImagesList();
                });
            });

            div.classList.add("card");
            img.classList.add('image');

            div.appendChild(img);
            div.appendChild(deleteBtn);
            document.body.appendChild(div);

            getDownloadURL(item).then((url) => {
                img.src = url;
            })
        })
    })
}

loadImagesList();