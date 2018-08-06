import Firebase from "firebase/app"
import "firebase/database"
import LRU from "lru-cache"

// export const createApi = ({ config, version }) => {
//   Firebase.initializeApp(config)
//   return Firebase.database().ref(version)
// }

// snippet from https://github.com/vuejs/vue-hackernews-2.0/blob/master/src/api/create-api-server.js
export function createApi({ config, version }) {
  let api
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    Firebase.initializeApp(config)
    api = process.__API__ = Firebase.database().ref(version)

    api.onServer = true

    // fetched item cache
    api.cachedItems = LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })

    // cache the latest story ids
    api.cachedIds = {}
    ;["top", "new", "show", "ask", "job"].forEach(type => {
      api.child(`${type}stories`).on("value", snapshot => {
        api.cachedIds[type] = snapshot.val()
      })
    })
  }
  return api
}
