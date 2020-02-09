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
         createdKidsAtGens: { 3: 0, 4: 0, 5: 0, 6: 0 },
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
      if (!this.pop[4][0][0] && !this.pop[4][1][0] && !this.pop[5][1][0]) {
         this.pop.unshift([[], [], []])
         this.generateXPixels(pixPerGen)
         // this.generateXPixels(pixPerGen - 15 + getRandomI(30))
         return this.firstGens(pixPerGen)
      }
      this.pop.unshift([[], [], []])
   }

   // checks attraction chances and return true/false based on those chances
   isMatch = function (a, b) {
      a.tried++
      b.tried++
      let comp = 0
      comp += a.gene.R > b.gene.R ? a.gene.R - b.gene.R : b.gene.R - a.gene.R
      comp += a.gene.G > b.gene.G ? a.gene.G - b.gene.G : b.gene.G - a.gene.G
      comp += a.gene.B > b.gene.B ? a.gene.B - b.gene.B : b.gene.B - a.gene.B
      let geneDist = comp
      if (a.gene.A && b.gene.A || !a.gene.A && !b.gene.A) {
         comp = Math.floor(comp *= 1.2)
      }
      comp = Math.floor((comp / 765) * 3 * 100)
      let comp2 = Math.floor((comp) * (((a.curGen + b.curGen) / 2) * 0.4))
      // console.log(comp2/comp)
      let match = (isByPercent(comp2) ? true : false)
      if (match || a.curGen == 6 && b.curGen == 6) {
         a.attraction = comp
         b.attraction = comp
         a.geneDist = geneDist
         b.geneDist = geneDist
         a.matchedAtGen = a.curGen
         b.matchedAtGen = b.curGen
         a.partnerGenAtMatch = b.curGen
         b.partnerGenAtMatch = a.curGen
      }
      if (a.curGen == 6 && b.curGen == 6) { return true }
      return match
   }

   // once a generation (3-6), activated on all couples 
   isMultiply = function (a, b) {
      let child = isByPercent((a.attraction + b.attraction) / 2 || 50)
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
         matchedAtGen: `did not matched yet`,
         geneDist: `non yet`,
         tried: 0,
         numKids: 0,
         kids: [],
         parentsGenAtBirth: (a.curGen + b.curGen) / 2,
         createdKidsAtGens: { 3: 0, 4: 0, 5: 0, 6: 0 },
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
      if (!this.pop[5][0][0] && !this.pop[5][1][0]) {
         this.firstGens(pixPerGen)
      } else {
         this.pop.unshift([[], [], []])
      }
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 2; j++) {
            for (let k = 0; k < this.pop[i][j].length; k++) {
               this.pop[i][j][k].curGen = i + 1
            }
         }
      }
      for (let i = 2; i < 6; i++) {
         for (let j = 0; this.pop[i][0].length > 1; null) {
            let k = getRandomI(this.pop[i][0].length - 1) + 1
            // console.log(j, k, this.pop[i][0].length)
            if (this.isMatch(this.pop[i][0][0], this.pop[i][0][k])) {
               this.pop[i][1].push(...this.pop[i][0].splice(k, 1))
               this.pop[i][1].push(...this.pop[i][0].splice(0, 1))
            } else {
               this.pop[i][2].push(...this.pop[i][0].splice(k, 1))
               this.pop[i][2].push(...this.pop[i][0].splice(0, 1))
            }
         }
         // this.pop[i][0][0] ? console.log(this.pop[i][0].length, i, this.pop[i][0][0].curGen, this.pop[i][0]) : null
         this.pop[i][0].push(...this.pop[i][2].splice(0))
         for (let j = 0; j < this.pop[i][1].length; j += 2) {
            this.isMultiply(this.pop[i][1][j], (this.pop[i][1][j + 1]))
         }
      }
      // this.pop.unshift([[], [], []])
      this.pop.splice(8)

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
   tests.childGeneInRange(testPop)
   tests.someGeneA(testPop)
   tests.attractOpposite(testPop)
   tests.settleOverGens(testPop)
   // tests.onlyOnePartner(testPop)
   tests.onlyMatchSameGen(testPop)
   tests.aChildMaxPerGen(testPop)
   tests.noSiblingPartner(testPop)
}

// allTests(10, 50)
allTests(20, 50)
// allTests(30, 50)
// allTests(50, 50)
// allTests(100, 50)
