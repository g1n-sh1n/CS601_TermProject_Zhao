import { useEffect, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle.tsx";
import { photos } from "../data/gallery.ts";

// Photo gallery: small thumbnails load first, the full image opens in a <dialog>.
function GalleryPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open / close the native <dialog> through the DOM
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  const current = openIndex !== null ? photos[openIndex] : null;

  const step = (delta: number) => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + delta + photos.length) % photos.length);
  };

  return (
    <section aria-labelledby="gallery-title">
      <SectionTitle id="gallery-title" level={1}>Gallery</SectionTitle>
      <p className="muted">Select a photo to see it larger.</p>

      <ul className="gallery-grid">
        {photos.map((photo, index) => (
          <li key={photo.src}>
            <button type="button" className="gallery-thumb" onClick={() => setOpenIndex(index)}>
              <img src={photo.thumb} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />
              <span className="gallery-caption">{photo.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        onClose={() => setOpenIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        aria-label="Photo viewer"
      >
        {current && (
          <figure>
            <img src={current.src} alt={current.alt} width={current.width} height={current.height} />
            <figcaption>{current.caption}</figcaption>
          </figure>
        )}
        <div className="lightbox-controls">
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo">‹ Prev</button>
          <button type="button" onClick={() => setOpenIndex(null)}>Close</button>
          <button type="button" onClick={() => step(1)} aria-label="Next photo">Next ›</button>
        </div>
      </dialog>
    </section>
  );
}

export default GalleryPage;
