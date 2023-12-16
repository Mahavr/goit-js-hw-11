import getPhotos from './js/fetch-photos';
import onError from './js/error';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
let page = 1;
let hits=0;
let currentName = '';
const hideElement = element => element.classList.add('visually-hidden');
const showElement = element => element.classList.remove('visually-hidden');
hideElement(loadBtn);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});
function markup(name) {
  getPhotos(name, page).then(resp => {
    hits += resp.hits.length;
    if (resp.totalHits < 1) {
      const text = 'Sorry, there are no images matching your search query';
      onError(text);
      return;
    } else {
      const photosMarkup = resp.hits
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) => `
  <div class="photo-card" >
    <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
    <div class="info">
      <p class="info-item">
        <b>Likes<br /> ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views<br /> ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments<br /> ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads<br /> ${downloads}</b>
      </p>
    </div>

  </div>`
        )
        .join('');
      if (resp.hits.length < 40) {
        hideElement(loadBtn);
      }
      if (hits >= resp.totalHits) {
        Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
        hideElement(loadBtn);
  
      } else {
        showElement(loadBtn);
      }
      gallery.insertAdjacentHTML('beforeend', photosMarkup);
      lightbox.refresh();
    }
  });
}
function onSubmit(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';
  hits = 0;
  page = 1;
  hideElement(loadBtn);
  currentName = form.elements.searchQuery.value.trim().toLowerCase();
  markup(currentName);
}
function onLoad(evt) {
  page += 1;
  markup(currentName);
  lightbox.refresh();
}
form.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onLoad);
