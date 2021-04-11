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

const IsAuthorOnArray = (array, author) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].author === author) {
      return true
    }
  }
  return false
}

const mostBlogs = (blogs) => {
  const authorsName = blogs.map(item => {
    return item.author
  })

  let authorsWithBlogs = [{ author: authorsName[0], blogs: 1 }]

  authorsName.forEach(authorName => {
    if (!IsAuthorOnArray(authorsWithBlogs, authorName)) {
      authorsWithBlogs.push({ author: authorName, blogs: 1 })
    } else {
      authorsWithBlogs = authorsWithBlogs.map(item => {
        if (item.author === authorName) {
          return { author: authorName, blogs: item.blogs + 1 }
        }
        return item
      })
    }
  })

  let max = {}

  authorsWithBlogs.reduce((accumulator, currentValue) => {
    if (accumulator.blogs > currentValue.blogs) {
      max = accumulator
    } else {
      max = currentValue
    }
    return currentValue
  })

  return max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
