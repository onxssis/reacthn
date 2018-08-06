// extract hostname from url
export function getHost(url) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
  const parts = host.split(".").splice(-3)

  if (parts[0] === "www") parts.shift()
  return parts.join(".")
}

// convert timestamp to human readable format
export function diffForHumans(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute")
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour")
  } else {
    return pluralize(~~(between / 86400), " day")
  }
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + "s"
}
