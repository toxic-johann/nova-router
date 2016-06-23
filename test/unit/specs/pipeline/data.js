import {test, assertCalls} from '../../lib/pipeline-test-util.js'
import * as routerUtil from '../../../../src/util.js'

describe('data',function () {
    beforeEach (function(){
        spyOn(routerUtil,'warn')
    })

    it('initial load',function(done){
        test({
            data:{
                data:function(transition) {
                    setTimeout(function () {
                        transition.next({
                            msg:transition.to.params.msg
                        })
                    },wait)
                }
            }
        },function(router,calls){
            router.go('/data/hello')
            assertCalls(calls,['data.data'])
            expect(router.routerView.children[0].content).toBe('data')
            expect(router.routerView.children[0].loadingRouteData).toBe(true)
            setTimeout(function(){
                expect(router.routerView.children[0].loadingRouteData).toBe(false)
                expect(router.routerView.children[0].$route.params.msg).toBe('hello')
                expect(router.routerView.children[0].msg).toBe('hello')
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait * 2)
        })
    })

    it('reload', function (done) {
        test({
            data: {
                data:function(transition){
                    setTimeout(function () {
                        transition.next({
                            msg:transition.to.params.msg
                        })
                    },wait)
                },
                activate:function(){
                    // just for logging
                }
            }
        },function (router, calls) {
            router.go('/data/hello')
            assertCalls(calls,['data.activate','data.data'])
            expect(router.routerView.children[0].loadingRouteData).toBe(true)
            setTimeout(function(){
                expect(router.routerView.children[0].loadingRouteData).toBe(false)
                expect(router.routerView.children[0].$route.params.msg).toBe('hello')
                expect(router.routerView.children[0].msg).toBe('hello')
                expect(routerUtil.warn).not.toHaveBeenCalled()
                router.go('/data/reload')
                assertCalls(calls,['data.activate','data.data','data.data'])
                expect(router.routerView.children[0].loadingRouteData).toBe(true)
                setTimeout(function(){
                    expect(router.routerView.children[0].loadingRouteData).toBe(false)
                    expect(router.routerView.children[0].$route.params.msg).toBe('reload')
                    expect(router.routerView.children[0].msg).toBe('reload')
                    expect(routerUtil.warn).not.toHaveBeenCalled()
                    done()
                },wait * 2)
            },wait * 2)
        })
    })

    it('promise reslove',function(done){
        test({
            data:{
                data:function(transition) {
                    return new Promise((reslove,reject)=>{
                        setTimeout(function () {
                            reslove()
                        },wait)
                    })
                        
                }
            }
        },function(router,calls){
            router.go('/data/hello')
            assertCalls(calls,['data.data'])
            expect(router.routerView.children[0].content).toBe('data')
            expect(router.routerView.children[0].loadingRouteData).toBe(true)
            setTimeout(function(){
                expect(router.routerView.children[0].loadingRouteData).toBe(false)
                expect(router.routerView.children[0].$route.params.msg).toBe('hello')
                expect(router.routerView.children[0].msg).toBe(undefined)
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait * 2)
        })
    })

    it('promise reslove with msg',function(done){
        test({
            data:{
                data:function(transition) {
                    return new Promise((reslove,reject)=>{
                        setTimeout(function () {
                            reslove(transition.to.params.msg)
                        },wait)
                    })
                        
                }
            }
        },function(router,calls){
            router.go('/data/hello')
            assertCalls(calls,['data.data'])
            expect(router.routerView.children[0].content).toBe('data')
            expect(router.routerView.children[0].loadingRouteData).toBe(true)
            setTimeout(function(){
                expect(router.routerView.children[0].loadingRouteData).toBe(false)
                expect(router.routerView.children[0].$route.params.msg).toBe('hello')
                expect(router.routerView.children[0].msg).toBe(undefined)
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait * 2)
        })
    })

    it('promise reject',function(done){
        test({
            data:{
                data:function(transition) {
                    return new Promise((reslove,reject)=>{
                        setTimeout(function () {
                            reject()
                        },wait)
                    })
                        
                }
            }
        },function(router,calls){
            router.go('/data/hello')
            assertCalls(calls,['data.data'])
            expect(router.routerView.children[0].content).toBe('data')
            expect(router.routerView.children[0].loadingRouteData).toBe(true)
            setTimeout(function(){
                expect(router.routerView.children[0].loadingRouteData).toBe(false)
                expect(router.routerView.children[0].$route.params.msg).toBe('hello')
                expect(router.routerView.children[0].msg).toBe(undefined)
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait * 2)
        })
    })

    it('return object containing promise', function (done) {
        let date = new Date()
        test({
            data: {
                data:function(transition){
                    return {
                        msg:new Promise(function(reslove,reject){
                            setTimeout(function(){
                                reslove(transition.to.params.msg)
                            },wait)
                        })
                    }
                }
            }
        },function(router,calls){
            router.go('/data/hello')
            assertCalls(calls,['data.data'])
            expect(router.routerView.children[0].content).toBe('data')
            expect(router.routerView.children[0].loadingRouteData).toBe(true)
            setTimeout(function(){
                expect(router.routerView.children[0].loadingRouteData).toBe(false)
                expect(router.routerView.children[0].$route.params.msg).toBe('hello')
                expect(router.routerView.children[0].msg).toBe('hello')
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait * 2)
        })
    })

    it('return object with many types of data', function (done) {
        let date = new Date()
        let arr = [4,5,6]
        let obj = {test:{test:'i am a test'}}
        test({
            data: {
                data:function(transition){
                    return {
                        booleanTest:true,
                        numberTest:10,
                        stringTest:"test",
                        dateTest:date,
                        arrayTest:arr,
                        objectTest:obj
                    }
                }
            }
        },function(router,calls){
            router.go('/data/hello')
            assertCalls(calls,['data.data'])
            expect(router.routerView.children[0].content).toBe('data')
            expect(router.routerView.children[0].loadingRouteData).toBe(false)
            expect(router.routerView.children[0].$route.params.msg).toBe('hello')
            expect(router.routerView.children[0].booleanTest).toBe(true)
            expect(router.routerView.children[0].numberTest).toBe(10)
            expect(router.routerView.children[0].dateTest).toBe(date)
            expect(router.routerView.children[0].dateTest instanceof Date).toBe(true)
            expect(router.routerView.children[0].arrayTest).toBe(arr)
            expect(router.routerView.children[0].objectTest).toBe(obj)
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })
    
    it('return object containing promise reject', function (done) {
        test({
            data: {
                data:function(transition){
                    return {
                        msg:new Promise(function(reslove,reject){
                            setTimeout(function(){
                                reject()
                            },wait)
                        })
                    }
                }
            }
        },function(router,calls){
            router.go('/data/hello')
            assertCalls(calls,['data.data'])
            expect(router.routerView.children[0].content).toBe('data')
            expect(router.routerView.children[0].loadingRouteData).toBe(true)
            setTimeout(function(){
                expect(router.routerView.children[0].loadingRouteData).toBe(false)
                expect(router.routerView.children[0].$route.params.msg).toBe('hello')
                expect(router.routerView.children[0].msg).toBe(undefined)
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait * 2)
        })
    })
})