export default (req, res) => {
  return new Promise (resolve => {
  const {page} = req.query
  const options = {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
  }

  fetch(`https://api.unsplash.com/photos?page=${page}&per_page=20`, options)
    .then(res => res.json())
    .then(list => {
      if (Array.isArray(list)) {
        const formattedImages = formatImgList(list)
        res.status(200).json({ list: formattedImages })
      } else {
        res.status(500).send({ error: 'Images unavailable right now!' })
      }
      resolve()
    })
    .catch(error => {
      res.status(500).send({ error: `Error occurred while fetching images. Error: ${error}` })
      resolve()
    })
  })
}

const formatImgList = (list) => {
  return list.map(img => {
    return {
      id: img.id,
      attr: {
        alt: img.alt_description || '',
        src: img?.urls?.small,
        height: '300px',
        width: img.height && img.width ? `${300 * img.width / img.height}px` : '300px'
      },
      description: img.description,
      timestamp: img.created_at,
      likes: img.likes,
      color: img.color
    }
  })
}