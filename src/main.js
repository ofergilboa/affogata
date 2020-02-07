const mathB = new MathB()
// const tests = new testing()
const getRandomRGB = mathB.getRandomRGB
const getRandomI = mathB.getRandomI
const isByPercent = mathB.isByPercent

let g = [[], [], []]

class Pixels {
   constructor() {
      this.pop = [g, g, g, g, g, g, g, g]
      // this.curGen = 1
   }

   generatePixel = function (percentOfA) {
      let p = {
         gene: { R: getRandomRGB(), G: getRandomRGB(), B: getRandomRGB() },
         tried: 0,
         numKids: 0,
         kids: []
      }
      if (isByPercent(percentOfA)) {
         p.gene.A = (getRandomI(100) / 100)
      }
      return p
   }

   generateXPixels = function (pixels) {
      for (let i = 0; i < pixels; i++) {
         this.pop[0][0].push(this.generatePixel(50))
      }
   }

   // creating generations of random pixels till there are enough generations old enough to couple 
   firstGens = function (pixPerGen) {
      this.pop.unshift([[], [], []])
      this.pop.splice(8, 1)
      if (!this.pop[5][0][0]) {
         this.generateXPixels(pixPerGen)
         // this.generateXPixels(pixPerGen - 15 + getRandomI(30))
         return this.firstGens(pixPerGen)
      }
   }

   // checks attraction chances and return true/false based on those chances
   isMatch = function (a, b) {
      if (a.tried == 3 && b.tried == 3) { return true }
      let comp = 0
      comp += a.gene.R > b.gene.R ? a.gene.R - b.gene.R : b.gene.R - a.gene.R
      comp += a.gene.G > b.gene.G ? a.gene.G - b.gene.G : b.gene.G - a.gene.G
      comp += a.gene.B > b.gene.B ? a.gene.B - b.gene.B : b.gene.B - a.gene.B
      if (a.gene.A && b.gene.A || !a.gene.A && !b.gene.A) {
         comp = Math.floor(comp *= 1.2)
      }
      comp = Math.floor(comp / 765 * 100)
      // console.log(1, comp)
      comp = Math.floor((comp + 15) * ((a.tried + b.tried) / 2 + 1) * 0.7)
      // console.log(2, comp)
      a.attraction = comp
      b.attraction = comp
      let match = (isByPercent(comp) ? true : false)
      if (match) {
         a.attraction = Math.floor(comp)
         b.attraction = Math.floor(comp)
      }
      return match
   }

   // once a generation (3-6), activated on all couples 
   isMultiply = function (a, b) {
      let child = isByPercent((a.attraction + b.attraction) * 2 || 50)
      if (child) {
         this.createChild(a, b)
      }
   }

   createChild = function (a, b) {
      a.numKids++
      b.numKids++
      let p = {
         gene: {
            R: a.gene.R > b.gene.R ?
               a.gene.R - getRandomI(a.gene.R - b.gene.R) :
               a.gene.R + getRandomI(b.gene.R - a.gene.R),
            G: a.gene.G > b.gene.G ?
               a.gene.G - getRandomI(a.gene.G - b.gene.G) :
               a.gene.G + getRandomI(b.gene.G - a.gene.G),
            B: a.gene.B > b.gene.B ?
               a.gene.B - getRandomI(a.gene.B - b.gene.B) :
               a.gene.B + getRandomI(b.gene.B - a.gene.B),
         },
         tried: 0,
         numKids: 0,
         kids: []
      }
      let per
      a.gene.A || b.gene.A ? per = 60 : per = 30
      let geneA = isByPercent(per)
      geneA ? p.gene.A = (getRandomI(100) / 100) : null
      this.pop[0][0].push(p)
      a.kids.push(p.gene)
      b.kids.push(p.gene)
   }

   newPop = (numOfGen = 10, pixPerGen = 60, track = -1) => {
      this.firstGens(pixPerGen)
      for (let i = 2; i < 6; i++) {
         for (let j = 0; this.pop[i][0].length > 1; j) {
            let k = j + getRandomI(this.pop[i][0].length - j)
            if (this.isMatch(this.pop[i][0][j], this.pop[i][0][k])) {
               this.pop[i][1].push(...this.pop[i][0].splice(k, 1))
               this.pop[i][1].push(...this.pop[i][0].splice(j, 1))
            } else {
               this.pop[i][0][k].tried++
               this.pop[i][0][j].tried++
               this.pop[i][2].push(...this.pop[i][0].splice(k, 1))
               this.pop[i][2].push(...this.pop[i][0].splice(j, 1))
            }
         }
         this.pop[i][0].push(...this.pop[i][2].splice(0))
         for (let j = 0; j < this.pop[i][1].length; j += 2) {
            this.isMultiply(this.pop[i][1][j], (this.pop[i][1][j + 1]))
         }
      }
      // console.log(this.pop[track])
      // console.log(this.pop)
      numOfGen--
      track++
      if (numOfGen > 10) {
         // return (setTimeout(() => this.newPop(numOfGen, pixPerGen, track), 100))
         return this.pop
      }
   }
}
let PixelsPop = new Pixels
let genA = PixelsPop.newPop(12, 60)
console.log(genA)


let genB = PixelsPop.newPop(30, 60)
let genC = PixelsPop.newPop(100, 60)

// console.log(gent)

// tests.goneAfter8Gen()
// tests.createOnly3to6()
// tests.matchMaxOnceAGen()
// tests.childGeneInRange()
// tests.someGeneA()
// tests.attractOpposite()
// tests.settleOverGens()
// tests.onlyOnePartner()
// tests.noSiblingPartner()



//  add = function(a, b){
//    return a + b
// }

// module.exports = add
