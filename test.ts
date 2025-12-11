import { graph6 } from "./mod.ts"

console.log(graph6("DUW"))
console.log(graph6("DUW").toGraph6())
console.log(graph6("DUW").toAdjMat())

console.log(graph6("CX").isoList().map(x => x.toGraph6()))
