const loadPhone = async (inputText) =>{
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data);
}

const displayPhone = phones =>{
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.textContent = '';
  // display maximum 20 phones
  seachedPhones = phones.slice(0, 20);

  // display no phones found
  const noFound = document.getElementById('no-found-msg');
  if(phones.length === 0){
    noFound.classList.remove('d-none')
  }
  else{
    noFound.classList.add('d-none')
  }

  // display all phones
  seachedPhones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col')
    phoneDiv.innerHTML = `
    <div class="card">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
    `
    phonesContainer.appendChild(phoneDiv);
  })
}

document.getElementById('search-btn').addEventListener('click', function(){
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  searchField.value = '';
  loadPhone(searchText);
})

// loadPhone();