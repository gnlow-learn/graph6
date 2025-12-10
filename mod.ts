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
        this.data.add(this.ref(i, j))
        return this
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
        tri(i+1).forEach(j =>
            str[k++] == "1" && g.add(i, j)
        ))
    
    return g
}
    

console.log(
    graph6("CF")
)
