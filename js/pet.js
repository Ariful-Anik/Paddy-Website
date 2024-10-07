//category section

async function fetchCategory() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
//   console.log(data.categories);
  displayCategories(data.categories);
}
// ---------remove active class -------- 

const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName("category-btn");
    for(let btn of buttons){
      btn.classList.remove('active');
    }
  }

// -----for loading icon---

const loadCategoryImages = (category) =>{
    console.log(category);

    

    const createVideoContainer = document.getElementById('bestDeal');
  
    createVideoContainer.classList.remove('grid');
    
    createVideoContainer.innerHTML = `
      <div class="flex justify-center items-center mt-[300px] w-full">
          
          <span class="loading loading-bars loading-lg"></span>
      </div>
    `;
  
    //loading with a 2-second delay
    setTimeout(() => {
      fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          removeActiveClass();
          const activeBtn = document.getElementById(`btn-${category}`);
             console.log(activeBtn);
            activeBtn.classList.add("active");
          createVideoContainer.classList.add('grid');
          displayLoadImages(data.data);
        })
        .catch((error) => console.log(error));
    }, 1000); // 1-second delay

    
    
   

}




const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category");
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.addEventListener('click',() => loadCategoryImages(category.category));
    categoryDiv.classList.add(
      "border",
      "p-5",
      "rounded-3xl",
      "gap-4",
      
      "flex",
      "justify-center",
      "items-center",
      "category-btn"
    );
    categoryDiv.id = `btn-${category.category}`;

    categoryDiv.innerHTML = `
        <img src=${category.category_icon} alt=""> 
        <p class="text-2xl font-bold text-center">${category.category}</p>
       
        
        `;

        categoryContainer.appendChild(categoryDiv);
        
  });
  
  
};



fetchCategory();


async function loadImages() {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    // console.log(data.pets);
    displayLoadImages(data.pets);
    
}

const displayLoadImages = (items) =>{
    const cardContainer = document.getElementById('bestDeal');
    cardContainer.innerHTML ="";
    if(items.length == 0){
    cardContainer.classList.remove('grid');
    cardContainer.innerHTML =
    `
        <div class = "min-h-[600px] w-full flex flex-col gap-5 justify-center items-center">
        <img src = "assests/Icon.png"/>
        <h2 class = "text-center text-xl">
            No Content Here in this Categery.
        </h2>
        </div>
    `
    ;
    return;
    }

    else{
    cardContainer.classList.add('grid');
    }

    items.forEach(item =>{
        console.log(item);
        const card = document.createElement('div');
        card.classList = "max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-4 ";
        card.innerHTML = 
        `
            <img class="w-full h-48 object-cover" src=${item.image} alt=${item.pet_name}>
            <div class="px-4 py-4">
            <h3 class="font-bold text-lg">${item.pet_name}</h3>
            <ul class="text-sm text-gray-700 space-y-1">
                <li><i class="fa fa-paw"></i> Breed: ${item.breed ? item.breed : "Not Available"}</li>
                <li><i class="fa fa-calendar"></i> Birth: ${item.date_of_birth ? item.date_of_birth: "Not Available"}</li>
                <li><i class="fa fa-venus"></i> Gender: ${item.gender ? item.gender : "Not Available"}</li>
                <li><i class="fa fa-dollar-sign"></i> Price: ${item.price ? item.price : "Not Available"}$</li>
            </ul>
            <div class="flex space-x-4 mt-4">
           
                <button onclick = "AddToCart('${item.image}')" class="text-gray-500 border px-3"><i class="fas fa-thumbs-up"></i></button>
                <button id="adoptBtn-${item.petId}" onclick="adoptPet('${item.petId}',this)"  class=" text-emerald-500 font-bold px-4 py-2 border rounded">Adopt</button>
        <button onclick ="openModal('${item.petId}')" class="border border-emerald-500 text-emerald-500 px-4 py-2 rounded">Details</button>
            </div>
            </div>
        
        `

        cardContainer.appendChild(card);
    });



}

// ---------modal count ----------

// Showing 3 Second Modal
const adoptPet = (Petad, adoptBtn) => {
    const modal = document.getElementById('modal');
    const countdownElement = document.getElementById('countdown');
    
    let count = 3;

    modal.classList.remove('hidden');
    countdownElement.textContent = count;

    const interval = setInterval(() => {
        count--;
        countdownElement.textContent = count;
        if (count === 0) {
            clearInterval(interval);
            adoptBtn.disabled = true; 
            adoptBtn.classList = "bg-gray-400 text-white font-bold px-4 py-2 border rounded";

            setTimeout(() => {
                modal.classList.add('hidden');
                document.getElementById('my_modal_2').close();
            }, 1000); 
        }
    }, 1000);

    document.getElementById('my_modal_2').showModal();
    
    fetchPetDetails(Petad);

};

// ------------modals -------------- 

async function openModal(petId) {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    const petData = data.petData;
    
    // Populate the modal with pet data
    document.getElementById("modal-pet-name").innerText = petData.pet_name;
    document.getElementById("modal-breed").innerText = `Breed: ${petData.breed}`;
    document.getElementById("modal-birth").innerText = `Birth: ${petData.date_of_birth}`;
    document.getElementById("modal-gender").innerText = `Gender: ${petData.gender}`;
    document.getElementById("modal-price").innerText = `Price: ${petData.price}$`;
    document.getElementById("modal-image").src = petData.image;

    // Show the modal
    document.getElementById('my_modal_4').showModal();
}

function closeModal() {
    document.getElementById('my_modal_4').close();
}

// ----------add to cart ---------
const AddToCart = (info) =>{

    const bestDealContainer = document.getElementById('bestDealCart');
    const cartCard = document.createElement('div');
    cartCard.classList = "h-[100px]  ";
    console.log(info);
    cartCard.innerHTML = 
    `
        <img class="rounded-2xl p-2 h-[100px] border" src= ${info} alt="">
        
    `
    bestDealContainer.appendChild(cartCard);
}


// --------- sorting functions --------

const sortByPrice = (items) => {
    // Sort items based on price in descending order
    return items.sort((a, b) => b.price - a.price);
};
document.getElementById('sortPriceBtn').addEventListener('click', async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    
    // Sort pets by price in descending order
    const sortedItems = sortByPrice(data.pets);
    
    // Display sorted items
    displayLoadImages(sortedItems);
});
loadImages();

// View button to main section function
const scrollToBestDealSection = () => {
    const bestDealSection = document.getElementById('bestDealCart');
    if (bestDealSection) {
        bestDealSection.scrollIntoView({ behavior: 'smooth' });
    }
  };