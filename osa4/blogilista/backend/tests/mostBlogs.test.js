const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    test('of empty list is null', () => {
        const blogs = []
        assert.deepStrictEqual(listHelper.mostBlogs(blogs), null)
    })
    test('when list has only one blog', () => {
        const blogs = [
            {
                title: 'Testauksen salat',
                author: 'Teuvo Testimies',
                url: 'http://testi.com',
                likes: 12,
            }
        ]
        assert.deepStrictEqual(listHelper.mostBlogs(blogs), { author: 'Teuvo Testimies', blogs: 1 })
    })
    test('of a bigger list correct author is returned', () => {
         const blogs = [
            { title: 'A', author: 'Alice', likes: 3 },
            { title: 'B', author: 'Bob', likes: 4 },
            { title: 'C', author: 'Alice', likes: 1 },
            { title: 'D', author: 'Alice', likes: 7 },
        ]
        assert.deepStrictEqual(listHelper.mostBlogs(blogs), { author: 'Alice', blogs: 3})
    })
})