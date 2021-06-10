import { useEffect, useRef } from 'react'
import styles from './Lightbox.module.css'
import Image from 'next/image'

export default function Lightbox({ data, closeLightBox }) {
  const timestamp = new Date(data.timestamp)
  const date = timestamp.toDateString()
  const lightBoxBG = useRef()

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick)
    document.addEventListener("keydown", handleEscapeKeyClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
      document.removeEventListener("keydown", handleEscapeKeyClick)
    }
  })

  const handleOutsideClick = (event) => {
    lightBoxBG.current && !lightBoxBG.current.contains(event.target) && closeLightBox()
  }

  const handleEscapeKeyClick = (event) => {
    if (event.code == 'Escape') {
      handleOutsideClick(event)
    }
  }

  return (
    <section className={styles.blurredBackground}>
      <div className={styles.lightboxContainer} ref={lightBoxBG}>
        <button className={styles.closeButton} onClick={closeLightBox}>
          <img src='/close.svg' />
        </button>
        <div className={styles.centerImage}>
          <img src={data.attr.src} alt={data.attr.src} className={styles.heroImg} />
        </div>
        <div className={styles.metaContainer}>
          <p className={styles.description}>{data.description}</p>
          <small>{date}</small>
          <div>
            <img src='/heart.svg' height='12px' width='12px' />
            <b>{' ' + data.likes}</b>
          </div>
        </div>
      </div>
    </section>
  )
}