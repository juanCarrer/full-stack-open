const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((accumulator, curentValue) => {
    return { likes: accumulator.likes + curentValue.likes }
  })
  return likes.likes
}

module.exports = {
  dummy,
  totalLikes
}
