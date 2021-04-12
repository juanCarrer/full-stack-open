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

const findMaxByKey = (key, array) => {
  let max = {}
  array.reduce((accumulator, currentValue) => {
    if (accumulator[key] > currentValue[key]) {
      max = accumulator
    } else {
      max = currentValue
    }
    return currentValue
  })
  return max
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

  return findMaxByKey('blogs', authorsWithBlogs)
}

const mostLikes = (blogs) => {
  const authorsWithLikes = blogs.map(item => {
    return {
      author: item.author,
      likes: item.likes
    }
  })

  let formatedLikes = []

  authorsWithLikes.forEach(authorwithLikes => {
    if (!IsAuthorOnArray(formatedLikes, authorwithLikes.author || formatedLikes.length === 0)) {
      formatedLikes.push({ author: authorwithLikes.author, likes: authorwithLikes.likes })
    } else {
      formatedLikes = formatedLikes.map(item => {
        if (item.author === authorwithLikes.author) {
          return { author: authorwithLikes.author, likes: item.likes + authorwithLikes.likes }
        }
        return item
      })
    }
  })

  return findMaxByKey('likes', formatedLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
