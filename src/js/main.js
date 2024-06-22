import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '44527465-372387a79420ecddf2afa63d2';
const BASE_URL = 'https://pixabay.com/api/';
let currentPage = 1;
let currentQuery = '';
const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

const loadMoreBtn = document.querySelector('.load-more');
const hideLoadMoreBtn = () => loadMoreBtn.classList.add('hide');
const showLoadMoreBtn = () => loadMoreBtn.classList.remove('hide');

const loader = document.querySelector('.loader-wrapper');
const showLoader = () => loader.classList.remove('hide');
const hideLoader = () => loader.classList.add('hide');

searchForm.addEventListener('submit', async event => {
	event.preventDefault();
	gallery.innerHTML = '';
	currentPage = 1;
	currentQuery = event.target.searchQuery.value;
	await fetchImages();
});

loadMoreBtn.addEventListener('click', async () => {
	currentPage += 1;
	await fetchImages();
});

async function fetchImages() {
  showLoader();
  hideLoadMoreBtn();

	try {
		const response = await fetch(
			`${BASE_URL}?key=${API_KEY}&q=${currentQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`,
		);
		const data = await response.json();

		if (data.hits.length === 0) {
      hideLoadMoreBtn();

			iziToast.info({
				title: 'Info',
        position: 'topRight',
				message:
					'Sorry, there are no images matching your search query. Please try again.',
			});

			return;
		}

		renderGallery(data.hits);
		showLoadMoreBtn();

		if (currentPage === 1) {
			iziToast.success({
				title: 'Success',
        position: 'topRight',
				message: `Hooray! We found ${data.totalHits} images.`,
			});
		}

		if (data.totalHits <= currentPage * 40) {
			hideLoadMoreBtn();

			iziToast.info({
				title: 'Error',
        position: 'topRight',
				message: "We're sorry, but you've reached the end of search results.",
			});
		}

		const lightbox = new SimpleLightbox('.gallery a', {});

		lightbox.refresh();
	} catch (error) {
		console.error('Error fetching images:', error);
	} finally {
    hideLoader();
  }
}

function renderGallery(images) {
	const markup = images
		.map(
			(image) => `
    <a href="${image.largeImageURL}" class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <i class="fas fa-heart"></i> <b>Likes</b> ${image.likes}
        </p>
        <p class="info-item">
          <i class="fas fa-eye"></i> <b>Views</b> ${image.views}
        </p>
        <p class="info-item">
          <i class="fas fa-comment"></i> <b>Comments</b> ${image.comments}
        </p>
        <p class="info-item">
          <i class="fas fa-download"></i> <b>Downloads</b> ${image.downloads}
        </p>
      </div>
    </a>
  `,
		)
		.join("");

	gallery.insertAdjacentHTML("beforeend", markup);

	const { height: cardHeight } =
		gallery.firstElementChild.getBoundingClientRect();

	window.scrollBy({
		top: cardHeight * 2,
		behavior: "smooth",
	});
}
