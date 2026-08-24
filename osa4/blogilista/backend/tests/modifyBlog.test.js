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

describe('modify blogs', () => {
    test.only('a blog can be modified', async () => {
        const blogBefore = await Blog.findOne({})
        const updatedInfo = {
            title: 'Päivitetty titteli',
            author: 'Päivitetty tekijä',
            url: 'http://uusi.com',
            likes: 99
        }

        await api
            .put(`/api/blogs/${blogBefore.id}`)
            .send(updatedInfo)
            .expect(200)

        const blogAfter = await Blog.findById(blogBefore.id)

        assert.notStrictEqual(blogAfter.title, blogBefore.title)
        assert.strictEqual(blogAfter.title, updatedInfo.title)
        assert.strictEqual(blogAfter.author, updatedInfo.author)
        assert.strictEqual(blogAfter.url, updatedInfo.url)
        assert.strictEqual(blogAfter.likes, updatedInfo.likes)
    })


    after(async () => {
        await mongoose.connection.close()
    })
})