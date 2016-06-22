import {test, assertCalls} from '../../lib/pipeline-test-util.js'
import * as routerUtil from '../../../../src/util.js'

describe('full', function () {

    beforeEach(function () {
        spyOn(routerUtil, 'warn')
    })

    it('should call hooks in correct order',function(done) {
        function makeConfig () {
            return {
                canActivate:function(){
                    // sync boolean
                    return true
                },
                activate: function(transition){
                    setTimeout(function(){
                        transition.next()
                        // multiple call should warn
                        transition.next()
                    },wait)
                },
                canDeactivate:function() {
                    // promise boolean
                    return new Promise((resolve,rejct)=>{
                        setTimeout(function(){
                            resolve(true)
                        },wait)
                    })
                },
                deactivate:function(transition) {
                    // promise next
                    console.log("deactivateing")
                    return new Promise((resolve,rejct)=>{
                        setTimeout(resolve,wait)
                    })
                }
            }
        }

        test({
            a:makeConfig(),
            b:makeConfig(),
            c:makeConfig(),
            d:makeConfig(),
        },function(router, calls, emitter) {
            router.go('/a/b')
            emitter.once('b.activate',function(){
                assertCalls(calls,[
                    // initial render
                    'a.canActivate','b.canActivate','a.activate','b.activate'
                ])
                expect(router.routerView.children[0].content).toBe('a')
                expect(router.routerView.children[0].children.length).toBe(0)
                setTimeout(function () {
                expect(routerUtil.warn.calls.count()).toBe(2)
                    expect(routerUtil.warn).toHaveBeenCalledWith('transition.next() should be called only once.')
                    // expect(router.routerView.children[0].content).toBe('a')
                    expect(router.routerView.children[0].children[0].content).toBe('b')
                    router.go('/c/d')
                    console.log("go to cd")
                    // done()
                }, wait)
            })

            emitter.once('d.activate', function () {
                assertCalls(calls, [
                    // initial render
                    'a.canActivate', 'b.canActivate', 'a.activate', 'b.activate',
                    // check can deactivate current views from bottom up
                    'b.canDeactivate', 'a.canDeactivate',
                    // check can activate new views from top down
                    'c.canActivate', 'd.canActivate',
                    // deactivate old views from bottom up
                    'b.deactivate', 'a.deactivate',
                    // activate new views from top down
                    'c.activate', 'd.activate'
                ])
                expect(router.routerView.children[0].content).toBe('c')
                expect(router.routerView.children[0].children.length).toBe(0)
                // wait until activation to assert render content
                setTimeout(function () {
                    expect(routerUtil.warn.calls.count()).toBe(4)
                    expect(router.routerView.children[0].content).toBe('c')
                    expect(router.routerView.children[0].children[0].content).toBe('d')
                    done()
                }, wait)
            })

        })
    })
})