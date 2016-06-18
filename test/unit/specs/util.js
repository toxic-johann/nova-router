import * as util from '../../../src/util.js'

describe('Util',function  (argument) {
    it('resolvePath',function(){
        expect(util.resolvePath('/a', 'b')).toBe('/b')
        expect(util.resolvePath('/a/', 'b')).toBe('/a/b')
        expect(util.resolvePath('/a', '/b')).toBe('/b')
        expect(util.resolvePath('/a/', '/b')).toBe('/a/b')
        // append mode
        expect(util.resolvePath('/a', 'b', true)).toBe('/a/b')
        expect(util.resolvePath('/a/', 'b', true)).toBe('/a/b')
        expect(util.resolvePath('/a', '/b', true)).toBe('/a/b')
        expect(util.resolvePath('/a/', '/b', true)).toBe('/a/b')
        // relative query
        expect(util.resolvePath('/a', '?b=1')).toBe('/a?b=1')
        expect(util.resolvePath('/a/', '?b=1')).toBe('/a/?b=1')
    })

    it('mapParams', function () {
        expect(util.mapParams('/a/:id', { id: 'b' })).toBe('/a/b')
        expect(util.mapParams('/a/:id/', { id: 'b' })).toBe('/a/b/')
        expect(util.mapParams('/a/:id/c/:d', { id: 'b', d: 'd' })).toBe('/a/b/c/d')
        expect(util.mapParams('/a/:id/c/:d', { id: 'b', d: 'd' }, { e: 123 })).toBe('/a/b/c/d?e=123')
    })
})