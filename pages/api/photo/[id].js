export default (req, res) => {
  return new Promise (resolve => {
  const {id} = req.query
  const options = {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
  }

  fetch(`https://api.unsplash.com/photos/${id}`, options)
    .then(res => res.json())
    .then(data => {
      if (data) {
        res.status(200).send(formatImgData(data))
      } else {
        res.status(500).send({ error: 'Image unavailable right now!' })
      }
      resolve()
    })
    .catch(error => {
      res.status(500).send({ error: `Error occurred while fetching image. Error: ${error}` })
      resolve()
    })
  })
}

const formatImgData = (img) => {
    return {
      id: img.id,
      attr: {
        alt: img.alt_description || '',
        src: img?.urls?.regular,
        height: img.height,
        width: img.width
      },
      description: img.description,
      timestamp: img.created_at,
      likes: img.likes,
      color: img.color,
      user:{
        name: img.user.name,
        bio: img.user.bio
      }
    }
}
