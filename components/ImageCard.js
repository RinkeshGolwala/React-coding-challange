import styles from './ImageCard.module.css'
import Image from 'next/image'

export default function ImageCard(props) {
  const timestamp = new Date(props.timestamp)
  const date = timestamp.toDateString().slice(4)
  const handlePhotoSelection = () => {
    console.log('phtot id: ', props)
    props.onClick(props.id)
  }
  return (
    <div className={styles.card} onClick={handlePhotoSelection}>
      <Image {...props.attr} className={styles.image} />
      <div className={styles.metaContainer}>
        <p className={styles.description} title={props.description}>{props.description}</p>
        <em>{date}</em>
        <div>
          <img src='/heart.svg' height='12px' width='12px' />
          <b>{' ' + props.likes}</b>
        </div>
      </div>
    </div>
  )
}