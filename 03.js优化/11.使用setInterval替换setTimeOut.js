let num = 0
// function fn() {
//     num ++
//     console.log('lg is a coder')
//     if (num<3) {
//         setTimeout(fn,1000)
//     }
// }

// fn()

function fn() {
    num ++
    console.log(111)
    if (num>=3) {
        clearInterval(timer)
    }
}
timer = setInterval(fn, 1000);