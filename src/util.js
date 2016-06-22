import RouteRecognizer from 'route-recognizer'
const genQuery = RouteRecognizer.prototype.generateQueryString
/**
 * Resolve a relative path.
 * 根据相对路径拼接出绝对路径
 *
 * @param {String} base
 * @param {String} relative
 * @param {Boolean} append ?是否要拼接
 * @return {String}
 */
export function resolvePath (base, relative, append) {
  let query = base.match(/(\?.*)$/)
  if (query) {
    query = query[1]
    base = base.slice(0, -query.length)
  }
  // a query!
  if (relative.charAt(0) === '?') {
    return base + relative
  }
  const stack = base.split('/')
  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop()
  }
  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/')
  for (let i = 0; i < segments.length; i++) {
    let segment = segments[i]
    if (segment === '.') {
      continue
    } else if (segment === '..') {
      stack.pop()
    } else {
      stack.push(segment)
    }
  }
  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('')
  }
  return stack.join('/')
}

/**
 * 判断是否是promise
 * @param  {[type]}  p [description]
 * @return {Boolean}   [description]
 */
export function isPromise (p) {
  return p &&
    typeof p.then === 'function'
}

/**
 * 判断是不是object
 * @param  {[type]}  val [description]
 * @return {Boolean}     [description]
 */
export function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

/**
 * 通用warn函数
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
export function warn (msg) {
  /* istanbul ignore next */
  if (typeof console !== 'undefined') {
    console.error('[nova-router] ' + msg)
  }
}


/**
 * Map the dynamic segments in a path to params.
 * 将动态片段置换为相应数值
 *
 * @param {String} path
 * @param {Object} params
 * @param {Object} query
 */

export function mapParams (path, params = {}, query) {
  path = path.replace(/:([^\/]+)/g, (_, key) => {
    const val = params[key]
    /* istanbul ignore if */
    if (!val) {
      warn(
        'param "' + key + '" not found when generating ' +
        'path for "' + path + '" with params ' + JSON.stringify(params)
      )
    }
    return val || ''
  })
  if (query) {
    path += genQuery(query)
  }
  return path
}

export function inBrowser () {
    return Object.prototype.toString.call(window) === "[object Window]"
}