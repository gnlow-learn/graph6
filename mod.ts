const inf = function* () {
    while (true) yield
}
const tri =
(n: number) =>
    inf()
        .map((_, i) => i)
        .take(n)

class UndirectedSimple {
    n
    data = new Set<string>
    constructor(n: number) {
        this.n = n
    }
    ref(i: number, j: number) {
        return [i, j].toSorted().join(",")
    }
    add(i: number, j: number) {
        if (i != j)
            this.data.add(this.ref(i, j))
        return this
    }
    has(i: number, j: number) {
        return this.data.has(this.ref(i, j))
    }
    
    toGraph6() {
        let str = ""
        tri(this.n-1).forEach(i =>
            tri(i+1).forEach(j =>
                str += this.has(i+1, j) ? "1" : "0"
            )
        )

        return String.fromCharCode(this.n+63)
            + str.replaceAll(
                /.{6}/g,
                x => String.fromCharCode(parseInt(x, 2)+63),
            )
    }
    toAdjMat() {
        return tri(this.n).map(i =>
            tri(this.n).map(j =>
                this.has(i, j) ? 1 : 0
            ).toArray()
        ).toArray()
    }
}

const graph6 =
(s: string) => {
    const [n, ...cs] = s.split("")
        .map(x => x.charCodeAt(0)-63)
    
    const str = cs.map(x => x.toString(2).padStart(6, "0")).join("")

    const g = new UndirectedSimple(n)

    let k = 0
    tri(n-1).forEach(i =>
        tri(i+1).forEach(j => {
            str[k++] == "1" && g.add(i+1, j)
        })
    )
    
    return g
}
    

console.log(graph6("CF"))
console.log(graph6("CF").toGraph6())
console.log(graph6("CF").toAdjMat())
