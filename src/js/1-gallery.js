import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from "./images.js";

const galleryContainer = document.querySelector(".gallery");

const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img
          class="gallery-image"
          src="${preview}"
          alt="${description}"
        />
      </a>
    </li>
  `
  )
  .join("");

galleryContainer.innerHTML = galleryMarkup;

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  captionPosition: "bottom",
});
