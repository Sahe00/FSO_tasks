const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const { title, author, url, likes } = request.body

    const returnedBlog = await Blog.findById(request.params.id)
    if (!returnedBlog) {
      return response.status(404).end()
    }

    returnedBlog.title = title
    returnedBlog.author = author
    returnedBlog.url = url
    returnedBlog.likes = likes

    const updatedBlog = await returnedBlog.save()
    return response.status(200).json(updatedBlog)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ error: 'Failed to update blog' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (deletedBlog === null) {
    return response.status(404).json({ error: 'blog was not found' })
  }
  response.status(204).end()
})

module.exports = blogsRouter

