/* eslint-disable @stylistic/js/indent */
const { test, after, describe, beforeEach } = require('node:test')
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

// Populating the database with test blogs
beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of initialBlogs) {
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})

// Checking if a blog can be deleted
describe('remove blogs', () => {
    test.only('a blog can be deleted', async () => {
        const blogsBefore = await Blog.find({})
        const blogToDelete = blogsBefore[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        const blogsAfter = await Blog.find({})
        assert.strictEqual(blogsAfter.length, blogsBefore.length - 1)
        assert.ok(!blogsAfter.some(blog => blog.id === blogToDelete.id)) // Can't have the id of a deleted blog
    })

    test.only('delete non-existant blog', async () => {
        const invalidId = '111111111111111111111111'

        await api
            .delete(`/api/blogs/${invalidId}`)
            .expect(404)
    })

    after(async () => {
      await mongoose.connection.close()
    })
})