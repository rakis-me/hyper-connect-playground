async function register() {
    const nodeFetch = await import('node-fetch')
    globalThis.fetch = nodeFetch.default
    globalThis.Request = nodeFetch.Request
    globalThis.Response = nodeFetch.Response
}

register()