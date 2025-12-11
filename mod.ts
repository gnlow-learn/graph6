const inf = function* () {
    while (true) yield
}
const tri =
(n: number) =>
    inf()
        .map((_, i) => i)
        .take(n)

const insert =
<A>(as: A[], a: A) =>
(i: number) =>
    [...as.slice(0, i), a, ...as.slice(i)]

const permutation =
(n: number): number[][] =>
    n == 1
        ? [[0]]
        : permutation(n-1)
            .values()
            .flatMap(l => tri(n).map(insert(l, n-1)))
            .toArray()

export class UndirectedSimple {
    n
    edges = new Set<string>
    constructor(n: number) {
        this.n = n
    }
    ref(i: number, j: number) {
        return [i, j].toSorted().join(",")
    }
    unref(s: string) {
        return s.split(",").map(Number) as [number, number]
    }
    add(i: number, j: number) {
        if (i != j)
            this.edges.add(this.ref(i, j))
        return this
    }
    has(i: number, j: number) {
        return this.edges.has(this.ref(i, j))
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
                /.{1,6}/g,
                x => String.fromCharCode(parseInt(x.padEnd(6, "0"), 2)+63),
            )
    }
    toAdjMat() {
        return tri(this.n).map(i =>
            tri(this.n).map(j =>
                this.has(i, j) ? 1 : 0
            ).toArray()
        ).toArray()
    }

    static fromEdges(n: number, e: Iterable<string>) {
        const g = new UndirectedSimple(n)
        g.edges = new Set(e)
        return g
    }

    mapEdge(f: (i: number, j: number) => [i: number, j: number]) {
        return UndirectedSimple.fromEdges(
            this.n,
            this.edges.values()
                .map(s => this.unref(s))
                .map(([i, j]) => f(i, j))
                .map(([i, j]) => this.ref(i, j)),
        )
    }
    isoList() {
        return permutation(this.n).map(l =>         
            this.mapEdge((i, j) => [l[i], l[j]])
        )
    }
}

export const graph6 =
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
