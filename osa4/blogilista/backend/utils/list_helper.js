const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs = []) => {
    return blogs.reduce((previous, current) => {
        return previous + current.likes
    }, 0)
}

const favoriteBlog = (blogs = []) => {
    if (blogs.length === 0) {
        return null
    }

    return blogs.reduce((previous, current) => {
        return current.likes > previous.likes ? current : previous
    })
}

const mostBlogs = (blogs = []) => {
    if (blogs.length === 0) {
        return null
    }

    const counts = _.countBy(blogs, 'author')

    const result = _.maxBy(
        Object.entries(counts),
        ([author, count]) => count
    )

    return {
        author: result[0],
        blogs: result[1]
    }
}

const mostLikes = (blogs = []) => {
    if (blogs.length === 0) {
        return null
    }

    const likesByAuthor = blogs.reduce((prev, blog) => {
        prev[blog.author] = (prev[blog.author] || 0) + blog.likes
        return prev
    }, {})

    const result = _.maxBy(
        Object.entries(likesByAuthor),
        ([author, likes]) => likes)

    return {
        author: result[0],
        likes: result[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}