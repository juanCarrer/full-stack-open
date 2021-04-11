const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((accumulator, curentValue) => {
    return { likes: accumulator.likes + curentValue.likes }
  })
  return likes.likes
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((accumulator, currentValue) => {
    if (accumulator.likes >= currentValue.likes) {
      return accumulator
    }
    return currentValue
  })
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
