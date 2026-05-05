const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
    test('of empty list is zero', () => {
        const blogs = []
        assert.deepStrictEqual(listHelper.favoriteBlog(blogs), null)
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
        assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[0])
    })
    test('of a bigger list correct blog is returned', () => {
        const blogs = [
            { title: 'Testauksen salat', author: 'Teuvo Testimies', url: 'http://testi.com', likes: 3 },
            { title: 'Aamuvalko', author: 'Keijo Kokeilu-ukko', url: 'http://kokeilusivu.com', likes: 4 },
            { title: 'Suorituksen rukous', author: 'Taavi Tarkistaja', url: 'http://testing.com', likes: 1 }
        ]
        assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[1])
    })
})