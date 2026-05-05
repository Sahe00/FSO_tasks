const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        assert.strictEqual(listHelper.totalLikes(blogs), 0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const blogs = [
            {
                title: 'Testauksen salat',
                author: 'Teuvo Testimies',
                url: 'http://testi.com',
                likes: 12,
            }
        ]
        assert.strictEqual(listHelper.totalLikes(blogs), 12)
    })
    test('of a bigger list is calculated right', () => {
        const blogs = [
            { title: 'Testauksen salat', author: 'Teuvo Testimies', url: 'http://testi.com', likes: 3 },
            { title: 'Aamuvalko', author: 'Keijo Kokeilu-ukko', url: 'http://kokeilusivu.com', likes: 4 },
            { title: 'Suorituksen rukous', author: 'Taavi Tarkistaja', url: 'http://testing.com', likes: 1 }
        ]
        assert.strictEqual(listHelper.totalLikes(blogs), 8)
    })
})