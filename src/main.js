const mathB = new MathB()
const tests = new testing()
const getRandomRGB = mathB.getRandomRGB
const getRandomI = mathB.getRandomI
const isByPercent = mathB.isByPercent

let g = [[], [], []]
class Pixels {
   constructor() {
      this.pop = [g, g, g, g, g, g, g, g]
   }

   generatePixel = function (percentOfA) {
      let p = {
         gene: { R: getRandomRGB(), G: getRandomRGB(), B: getRandomRGB() },
         curGen: 0,
         tried: 0,
         matchedAtGen: `did not matched yet`,
         partnerGenAtMatch: `did not matched yet`,
         numKids: 0,
         kids: [],
         createdKidsAtGens: {3:0, 4:0, 5:0, 6:0},
         parentsGenAtBirth: `has no parents`
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
      a.tried++
      b.tried++
      if (a.tried == 4 && b.tried == 4) { return true }
      let comp = 0
      comp += a.gene.R > b.gene.R ? a.gene.R - b.gene.R : b.gene.R - a.gene.R
      comp += a.gene.G > b.gene.G ? a.gene.G - b.gene.G : b.gene.G - a.gene.G
      comp += a.gene.B > b.gene.B ? a.gene.B - b.gene.B : b.gene.B - a.gene.B
      if (a.gene.A && b.gene.A || !a.gene.A && !b.gene.A) {
         comp = Math.floor(comp *= 1.2)
      }
      comp = Math.floor(comp / 765 * 100)
      comp = Math.floor((comp + 15) * ((a.tried + b.tried) / 2) * 0.7)
      let match = (isByPercent(comp) ? true : false)
      if (match) {
         a.attraction = Math.floor(comp)
         b.attraction = Math.floor(comp)
         a.matchedAtGen = a.curGen
         b.matchedAtGen = b.curGen
         a.partnerGenAtMatch = b.curGen
         b.partnerGenAtMatch = a.curGen
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
      a.createdKidsAtGens[a.curGen]++
      b.createdKidsAtGens[b.curGen]++
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
         curGen: 0,
         tried: 0,
         numKids: 0,
         kids: [],
         parentsGenAtBirth: (a.curGen + b.curGen) / 2
      }
      let per
      a.gene.A || b.gene.A ? per = 60 : per = 30
      let geneA = isByPercent(per)
      geneA ? p.gene.A = (getRandomI(100) / 100) : null
      this.pop[0][0].push(p)
      a.kids.push(p.gene)
      b.kids.push(p.gene)
   }

   newPop = async (numOfGen = 10, pixPerGen = 60, test = false, track = -2) => {
      this.firstGens(pixPerGen)
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 2; j++) {
            for (let k = 0; k < this.pop[i][j].length; k++) {
               this.pop[i][j][k].curGen++
            }
         }
      }
      for (let i = 3; i < 7; i++) {
         for (let j = 0; this.pop[i][0].length > 1; null) {
            let k = getRandomI(this.pop[i][0].length)
            // this.pop[i][0][k].tried++
            // this.pop[i][0][0].tried++
            if (this.isMatch(this.pop[i][0][0], this.pop[i][0][k])) {
               this.pop[i][1].push(...this.pop[i][0].splice(k, 1))
               this.pop[i][1].push(...this.pop[i][0].splice(0, 1))
            } else {
               this.pop[i][2].push(...this.pop[i][0].splice(k, 1))
               this.pop[i][2].push(...this.pop[i][0].splice(0, 1))
            }
         }
         this.pop[i][0][0] ? console.log(this.pop[i][0].length, i, this.pop[i][0][0].curGen, this.pop[i][0]) : null
         this.pop[i][0].push(...this.pop[i][2].splice(0))
         for (let j = 0; j < this.pop[i][1].length; j += 2) {
            this.isMultiply(this.pop[i][1][j], (this.pop[i][1][j + 1]))
         }
      }
      numOfGen--
      track++
      if (numOfGen > 0) {
         if (test) {
            return (this.newPop(numOfGen, pixPerGen, true, track))
         } else {
            // console.log(track,this.pop[track])
            return (setTimeout(() => this.newPop(numOfGen, pixPerGen, false, track), 100))
         }
      } else if (test) {
         // return (this.pop)
         return (this.pop)
      } else {
         // console.log(1, this.pop)
      }
   }
}

let PixelsPop = new Pixels
// PixelsPop.newPop(10, 50)

let allTests = async function (numOfGen, pixPerGen) {
   let testPop = await PixelsPop.newPop(numOfGen, pixPerGen, true)
   console.log(`test`, testPop)
   tests.goneAfter8Gen(testPop)
   tests.createOnly3to6(testPop)
   tests.matchOnly3to6(testPop)
   tests.matchMaxOnceAGen(testPop)
   // tests.childGeneInRange(testPop)
   // tests.someGeneA(testPop)
   // tests.attractOpposite(testPop)
   // tests.settleOverGens(testPop)
   // tests.onlyOnePartner(testPop)
   // tests.noSiblingPartner(testPop)
}

allTests(30, 50)
