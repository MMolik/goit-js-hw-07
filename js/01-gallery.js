import { galleryItems } from "./gallery-items.js";
const gallery = document.querySelector(".gallery");

const galleryElements = galleryItems.map((item) => {
  const galleryItem = document.createElement("div");
  galleryItem.classList.add("gallery__item");

  const galleryLink = document.createElement("a");
  galleryLink.classList.add("gallery__link");
  galleryLink.href = item.original;

  const galleryImage = document.createElement("img");
  galleryImage.classList.add("gallery__image");
  galleryImage.src = item.preview;
  galleryImage.dataset.source = item.original;
  galleryImage.alt = item.description;

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
});

gallery.append(...galleryElements);

gallery.addEventListener("click", (event) => {
  event.preventDefault();

  // What if clicked outside the image
  const isImageClicked = event.target.classList.contains("gallery__image");

  if (isImageClicked) {
    const lightbox = basicLightbox.create(
      `
        <img src="${event.target.dataset.source}" width="800" height="600">
      `,
      {
        onShow: (instance) => {
          console.log("Lightbox is shown");
          // Dodaj kod do wykonania po pokazaniu lightboxa
        },
        onClose: (instance) => {
          console.log("Lightbox is closed");
          // Dodaj kod do wykonania po zamknięciu lightboxa
          window.removeEventListener("keydown", closeLightboxOnEsc);
        },
      }
    );

    lightbox.show();

    // "ESC" Close)
    const closeLightboxOnEsc = (e) => {
      if (e.key === "Escape") {
        lightbox.close();
        window.removeEventListener("keydown", closeLightboxOnEsc);
      }
    };

    // "ESC" listener close
    window.addEventListener("keydown", closeLightboxOnEsc);
  }
});
