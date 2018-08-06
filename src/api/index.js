import { createApi } from "./firebase"
const HN_BASE_URL = "https://hacker-news.firebaseio.com"
const HN_VERSION = "/v0"

const api = createApi({
  config: {
    databaseURL: HN_BASE_URL
  },
  version: HN_VERSION
})

export function fetch(child) {
  const cache = api.cachedItems

  if (cache && cache.has(child)) {
    console.log(`cache hit for ${child}.`)
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once(
        "value",
        snapshot => {
          const val = snapshot.val()

          // mark the timestamp when this item is cached
          if (val) {
            val.lastUpdated = Date.now()
            cache && cache.set(child, val)
            console.log(`fetched ${child}. | cached | ${val}`)
            resolve(val)
          } else {
            resolve({})
          }
        },
        reject
      )
    })
  }
}

const Api = {
  fetchIdsByType(type) {
    return fetch(`${type}stories`)
  },

  fetchItem(id) {
    return fetch(`item/${id}`)
  },

  fetchItems(ids) {
    return Promise.all(
      ids.map(id => {
        return this.fetchItem(id)
      })
    )
  },

  fetchUser(id) {
    return fetch(`user/${id}`)
  },

  watchList(type, cb) {
    let first = true
    const ref = api.child(`${type}stories`)

    const handler = snapshot => {
      if (first) {
        first = false
      } else {
        cb(snapshot.val())
      }
    }

    ref.on("value", handler)

    return () => {
      ref.off("value", handler)
    }
  }
}

if (api.onServer) {
  reloadCache()
}

function reloadCache() {
  Api.fetchItems((api.cachedIds.top || []).slice(0, 30))
  setTimeout(reloadCache, 1000 * 60 * 15)
}

export default Api
