import styles from './Lightbox.module.css'
import Image from 'next/image'

export default function Lightbox({data}) {
  const timestamp = new Date(data.timestamp)
  const date = timestamp.toDateString()

  // function hideOnClickOutside(element) {
  //   const outsideClickListener = event => {
  //       if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
  //         element.style.display = 'none'
  //         removeClickListener()
  //       }
  //   }

  //   const removeClickListener = () => {
  //       document.removeEventListener('click', outsideClickListener)
  //   }

  //   document.addEventListener('click', outsideClickListener)
  // }

  return (
    <div className={styles.lightboxContainer}>
      <Image {...data.attr} className={styles.image} />
      <div className={styles.metaContainer}>
        <p className={styles.description}>{data.description}</p>
        <em>{date}</em>
        <div>
          <img src='/heart.svg' height='12px' width='12px' />
          <b>{' ' + data.likes}</b>
        </div>
      </div>
    </div>
  )
}