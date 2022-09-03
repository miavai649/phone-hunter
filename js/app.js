const loadPhone = async (inputText, dataLimit) =>{
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) =>{
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.textContent = '';
  // display maximum 20 phones
  const showAll = document.getElementById('show-all');
  if(dataLimit && phones.length > 10){
    phones = phones.slice(0, 10);
    showAll.classList.remove('d-none')
  }
  else{
    showAll.classList.add('d-none')
  }

  // display no phones found
  const noFound = document.getElementById('no-found-msg');
  if(phones.length === 0){
    noFound.classList.remove('d-none')
  }
  else{
    noFound.classList.add('d-none')
  }

  // display all phones
  phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col')
    phoneDiv.innerHTML = `
    <div class="card">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `
    phonesContainer.appendChild(phoneDiv);
  })
  // stop spinners
  toggleSpinner(false);
}

const processSearch = (dataLimit) =>{
   // start spinners
   toggleSpinner(true);
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
  //  searchField.value = '';
   loadPhone(searchText, dataLimit);
}

// handle search button click
document.getElementById('search-btn').addEventListener('click', function(){
  processSearch(10);
})

// search input field enter key handler

const toggleSpinner = isLoading =>{
  const spinnerSection = document.getElementById('spinners');
  if(isLoading){
    spinnerSection.classList.remove('d-none');
  }
  else{
    spinnerSection.classList.add('d-none')
  }
}

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function(){
  processSearch();
})

const loadPhoneDetails = async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone =>{
  console.log(phone);
  const modalTitle = document.getElementById('phoneDetailModalLabel')
  modalTitle.innerText = phone.name;
}

loadPhone('apple');