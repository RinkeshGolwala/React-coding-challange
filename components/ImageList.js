import { useState, useEffect, useRef } from 'react'
import styles from './ImageList.module.css'
import ImageCard from './ImageCard'
import Lightbox from './Lightbox'

export default function ImageList() {
  const [photoList, setPhotoList] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState()
  const [currentPhotoDetails, setCurrentPhotoDetails] = useState()
  const [page, setPage] = useState(1)
  const loaderRef = useRef(null)

  useEffect(() => {
    fetch('/api/photos/' + page)
      .then(res => res.json())
      .then(data => {
        setPhotoList([...photoList, ...data.list])
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [page])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  useEffect(() => {
    if (currentPhoto) {
      fetch('/api/photo/' + currentPhoto)
        .then(res => res.json())
        .then(setCurrentPhotoDetails)
        .catch(err => console.log(err))
    }
  }, [currentPhoto])

  const handleScroll = () => {
    // To get page offset of last user
    const loadingDiv = loaderRef.current
    if (loadingDiv) {
      const loadingDivOffset = loadingDiv.offsetTop + loadingDiv.clientHeight
      const pageOffset = window.pageYOffset + window.innerHeight

      if (pageOffset > loadingDivOffset && !loading) {
        setPage(page + 1)
        setLoading(true)
      }
    }
  }

  const closePhoto = () => {
    setCurrentPhoto(null)
    setCurrentPhotoDetails(null)
  }

  return (
    <>
      <section className={styles.listContainer}>
        {photoList.map(photo => <ImageCard key={photo.id} {...photo} onClick={setCurrentPhoto} />)}
        <div ref={loaderRef}></div>
      </section>
      {/* {currentPhotoDetails && <Lightbox data={currentPhotoDetails} onClose={closePhoto} />} */}
    </>
  )
}