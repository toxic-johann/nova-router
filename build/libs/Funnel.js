'use strict';
function Funnel () {
    // 定义内部属性
    this.pool = [];
    this.lock = false;
    let self = this;

    // 定义外部方法
    this._push = function() {
        let args = [].slice.call(arguments);
        this.pool = this.pool.concat(args);
    };

    this._through = function(func){
        if(this.lock || this.pool.length == 0){
            return false;
        }
        this.lock = true;
        func(this.pool[0]).then(function(){
            self._unlock(func)
        })
    };

    this._unlock = function(func) {
        this.pool.splice(0,1);
        this.lock = false;
        if(this.pool.length > 0){
            this._through(func)
        }
    };
}

module.exports = Funnel;
