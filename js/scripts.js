/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests
 * script.js */


const url = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const body = document.querySelector('body');
const gallery = document.getElementById('gallery');

//  FETCH FUNCTION
fetch(url)
    .then (checkStatus)
    .then(response => response.json())
    .then(data => {generateGallery(data.results)})
    .catch(error => console.log(error));
    

//  HELPER FUNCTIONS
function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

//displays employee profiles
function showProfile(employee) {
    let profileCard= `
        <div class="card">
          <div class="card-img-container">
            <img class="card-img" src="${employee.picture.medium}" alt=profile picture">
            </div>
            <div class="card-info-container">
              <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
              <p class="card-text">${employee.email}</p>
              <p class="card-text cap">${employee.location.city}</p>
            </div>
          </div>
    `
    gallery.insertAdjacentHTML('beforeend', profileCard); 
  
}

//generates employee modal
function showModal(employee){
    const modalInfo= `
    <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${employee.picture.medium} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.location.city}</p>
                        <hr>
                        <p class="modal-text">${employee.cell}</p>
                        <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${formatDob(employee.dob.date)} </p>
                    </div>
                </div>
    
    `;

    body.insertAdjacentHTML('beforeend', modalInfo);
} 
function formatDob(dob){
  dateString = "1993-01-27T02:32:04.156Z"
  date = new Date(dateString);

  d = date.getDate();
  m = date.getMonth() + 1;
  y = date.getFullYear();

  String(m).padStart(2, "0") + "/" + String(d).padStart(2, "0") + "/" + String(y);
}

//displays profiles when a card is clicked
function displayModal(data){
  const profiles = document.querySelectorAll(".card")
  for(let i=0; i<profiles.length; i++){
      profiles[i].addEventListener('click', ()=>{
          showModal(data[i])
          closeModal()
      })
  }
}

//close button functionality 
function closeModal(){
    const closeBtn = document.querySelector('#modal-close-btn');
    const modal = document.querySelector('.modal-container');
    closeBtn.addEventListener('click', (e) => {
        modal.remove();
    })
}
    


//displays employee gallery and modal information
function generateGallery(data){
    data.map(employee=>{
        showProfile(employee)
    })
    displayModal(data)
}