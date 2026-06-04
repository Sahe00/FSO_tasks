const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Testauksen salat',
    author: 'Teuvo Testimies',
    url: 'http://testi.com',
    likes: 12,
  },
  {
    title: 'Rauta tottelee',
    author: 'Teemu Testomies',
    url: 'http://testo.com',
    likes: 9,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

// Checking blog is returned as JSON
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// Checking the number of blogs is correct
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique identifier is called id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    assert.ok(blog.id, 'field \'id\' should exist in the blog object') // id actually exists
    assert.strictEqual(blog._id, undefined) // _id not present
  })
})

test.only('a valid blog can be added', async () => {
    const newBlog = 
    {
        title: 'Kone sulaa',
        author: 'Teemu Teknikko',
        url: 'http://hoitoon.com',
        likes: 1,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    const saved = response.body.find(b => b.title === newBlog.title)
    assert.ok(saved) // exists in the first place

    assert.strictEqual(saved.title, newBlog.title)
    assert.strictEqual(saved.author, newBlog.author)
    assert.strictEqual(saved.url, newBlog.url)
    assert.strictEqual(saved.likes, newBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})