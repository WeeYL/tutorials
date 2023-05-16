export function secToMins(sec:number) {
    const _min = Math.floor(sec / 60) + `m`
    const _sec = sec % 60 > 0? sec % 60 + `s`: ""
    return `${_min} ${_sec}`
}