import { resolvePath } from '../util'
export default class HashHistory {
    constructor ({hashbang,onChange}) {
        this.hashbang = hashbang
        this.onChange = onChange
    }

    start () {
        const self = this;
        this.listener = function () {
            const path = location.hash
            let raw = path.replace(/^#!?/,'')
            if(raw.charAt(0) !== '/'){
                raw = '/'+raw
            }
            const formattedPath = self.formatPath(raw);
            if (formattedPath !== path) {
                location.replace(formattedPath)
                return
            }
            // 此处vue-router有一个将query拼接上去的步骤
            // 没有搞懂为什么这么做
            // 先不加上
            // const query = location.search && path.indexOf('?') > -1
            //   ? '&' + location.search.slice(1)
            //   : location.search
            self.onChange(path.replace(/^#!?/, ''));
        }
        // 监听hashchange
        window.addEventListener('hashchange', this.listener)
        this.listener()
    }

    stop () {
        window.removeEventListener('hashchange', this.listener)
    }

    go (path, replace, append) {
        path = this.formatPath(path, append)
        if (replace) {
            location.replace(path)
        } else {
            location.hash = path
        }
    }

    /**
     * format to absolute path
     * 格式化为绝对路径
     */
    formatPath (path,append) {
        const isAbsolute = path.charAt(0) === '/'
        const prefix = '#' + (this.hashbang?'!':'')
        return isAbsolute
            ? prefix + path
            : prefix + resolvePath(location.hash.replace(/^#!?/,''),path,append)
    }
}