// Modal
const searchData = localStorage.getItem('searchHistoryData');
let searchHistory = [];
if (searchData !== null) {
  searchHistory = JSON.parse(searchData);
}


const searchInput = document.querySelector('.search-input');
const searchToggle = document.querySelector('.mobile-search');
const searchMobileModal = document.querySelector('.search-modal-mobile');
const searchMobalCloseBtn = searchMobileModal.querySelector('.close-btn');
const searchOverlay = document.querySelector('.overlay');

searchInput.addEventListener('click', () => {
  searchModal.classList.add('clicked');
  createHistory();
});

function openSearchModal() {
  if (!searchMobileModal.classList.contains('clicked')) {
    searchMobileModal.classList.add('clicked');
    searchOverlay.classList.add('clicked');
    window.addEventListener('click', closeSearchModal)
    createHistory();
  }
}

searchToggle.addEventListener('click', openSearchModal);

function closeSearchModalBtn() {
  searchMobileModal.classList.remove('clicked');
  searchOverlay.classList.remove('clicked');
  createHistory();
}

searchMobalCloseBtn.addEventListener('click', closeSearchModalBtn);

function closeSearchModal(e) {
  if (e.target.className === 'overlay clicked') {
    searchMobileModal.classList.remove('clicked');
    searchOverlay.classList.remove('clicked');
    window.removeEventListener('click', closeSearchModal)
  }
}

document.addEventListener('click', (e) => {
  if (
    e.target.classList.value !== 'search-input' &&
    e.target.classList.value !== 'btn-del' &&
    e.target.classList.value !== 'btn-del-all'
  ) {
    searchModal.classList.remove('clicked');
  }

  if (e.target.classList.value == 'btn-del') {
    e.preventDefault();
    const inText = e.target.previousSibling.innerText;
    searchHistory = searchHistory.filter((text) => {
      return text !== inText;
    });
    localStorage.setItem('searchHistoryData', JSON.stringify(searchHistory));
    createHistory();
  }

  if (e.target.classList.value == 'list-item') {
    touchList(e.target.firstChild.innerText);
  }
});

const touchList = (touchListText) => {
  if (searchHistory.includes(touchListText)) {
    searchHistory = searchHistory.filter((text) => {
      return text !== touchListText;
    });
    searchHistory.unshift(touchListText);
    localStorage.setItem('searchHistoryData', JSON.stringify(searchHistory));
  }
};


const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!searchHistory.includes(searchInput.value) && searchInput.value) {
    if (searchHistory.length > 4) {
      searchHistory.pop();
      searchHistory.unshift(searchInput.value);
    } else {
      searchHistory.unshift(searchInput.value);
    }
  } else if (searchHistory.includes(searchInput.value)) {
    searchHistory = searchHistory.filter((text) => {
      return text !== searchInput.value;
    });
    searchHistory.unshift(searchInput.value);
  }
  localStorage.setItem('search', searchInput.value);
  localStorage.setItem('searchHistoryData', JSON.stringify(searchHistory));
  location.href = `http://${location.host}/search/?q=${searchInput.value}`;
});


const searchDataDeleteBtn = document.querySelector('.btn-del-all');
searchDataDeleteBtn.addEventListener('click', () => {
  searchHistory = [];
  localStorage.setItem('searchHistoryData', JSON.stringify(searchHistory));
  createHistory();
});


const searchHistoryList = document.querySelector('.list-history');
const removeChildAll = (ele) => {
  while (ele.hasChildNodes()) {
    ele.removeChild(ele.firstChild);
  }
};
const createHistory = () => {
  removeChildAll(searchHistoryList);
  if (searchHistory.length > 0) {
    searchHistory.forEach((v) => {
      const searchList = document.createElement('li');
      const listItem = document.createElement('a');

      const searchText = document.createElement('strong');
      searchText.appendChild(document.createTextNode(v));

      const deleteBtn = document.createElement('button');
      const deleteImage = document.createElement('img');

      listItem.setAttribute('class', 'list-item');
      listItem.setAttribute('href', `/search/?q=${v}`);
      searchText.setAttribute('class', 'txt-item');
      deleteBtn.setAttribute('class', 'btn-del');
      deleteImage.setAttribute('src', '/src/assets/images/icon-close.svg');
      deleteImage.setAttribute('alt', '삭제버튼');
      deleteImage.setAttribute('class', 'close-img');

      deleteBtn.appendChild(deleteImage);

      listItem.appendChild(searchText);
      listItem.appendChild(deleteBtn);

      searchList.appendChild(listItem);

      searchHistoryList.appendChild(searchList);
    });
  }
};
