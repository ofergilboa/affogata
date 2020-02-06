const mathB = new MathB()
const tests = new testing()
const getRandomRGB = mathB.getRandomRGB
const getRandomI = mathB.getRandomI
const isByPercent = mathB.isByPercent

let g = [[], [], []]
const pop = [g, g, g, g, g, g, g, g]

const generatePixel = function (x) {
   let p = {
      gene: { R: getRandomRGB(), G: getRandomRGB(), B: getRandomRGB() },
      tried: 0,
   }
   if (isByPercent(x)) {
      p.gene.A = (getRandomI(100) / 100)
   }
   return p
}

const generateXPixels = function (x) {
   for (let i = 0; i < x; i++) {
      pop[0][0].push(generatePixel(50))
   }
}

// creating generations of random pixels till there are enough generations old enough to couple 
const firstGens = function (x) {
   pop.unshift([[], [], []])
   pop.splice(8, 1)
   if (!pop[5][0][0]) {
      generateXPixels(x - 15 + getRandomI(30))
      return firstGens(x)
   }
}

// checks attraction chances and return true/false based on those chances
const isMatch = function (a, b) {
   if (a.tried == 3) { return true }
   let comp = 0
   comp += Math.abs(a.gene.R - b.gene.R)
   comp += Math.abs(a.gene.G - b.gene.G)
   comp += Math.abs(a.gene.B - b.gene.B)
   if (a.gene.A && b.gene.A || !a.gene.A && !b.gene.A) {
      comp = Math.floor(comp *= 0.8)
   }
   comp = 100 - (Math.floor(100 / 765 * comp))
   a.attraction = comp
   b.attraction = comp
   comp *= a.tried * 0.25 + 0.35
   let match = (isByPercent(comp) ? true : false)
   if (match) {
      a.attraction = Math.floor(comp)
      b.attraction = Math.floor(comp)
   }
   return match
}

const createChild = function (a, b) {
   let per
   a.gene.A || b.gene.A ? per = 60 : per = 30
   let geneA = isByPercent(per)
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
      curG: 1
   }
   geneA ? p.gene.A = (getRandomI(100) / 100) : null
   pop[0][0].push(p)
}

// once a generation (3-6), activated on all couples 
const match = function (a, b) {
   let child = isByPercent(a.attraction * 3 || 50)
   if (child) {
      createChild(a, b)
   }
}

const newGen = function (numOfGen = 10, pixPerGen = 40) {
   firstGens(pixPerGen)
   for (i = 2; i < 6; i++) {
      for (j = 0; pop[i][0].length > 1; j) {
         let k = j + getRandomI(pop[i][0].length - j)
         if (isMatch(pop[i][0][j], pop[i][0][k])) {
            pop[i][1].push(...pop[i][0].splice(k, 1))
            pop[i][1].push(...pop[i][0].splice(j, 1))
         } else {
            pop[i][0][j].tried++
            pop[i][0][k].tried++
            pop[i][2].push(...pop[i][0].splice(k, 1))
            pop[i][2].push(...pop[i][0].splice(j, 1))
         }
      }
      pop[i][0].push(...pop[i][2].splice(0))
      for (j = 0; j < pop[i][1].length; j += 2) {
         match(pop[i][1][j], (pop[i][1][j + 1]))
      }
   }
   // console.log(pop)
   numOfGen--
   if (numOfGen > 0)
      return setTimeout(function () { newGen(numOfGen) }, 1000)
}

newGen(10, 40)

tests.goneAfter8Gen()
tests.createOnly3to6()
tests.matchMaxOnceAGen()
tests.childGeneInRange()
tests.someGeneA()
tests.attractOpposite()
tests.settleOverGens()
tests.onlyOnePartner()
tests.noSiblingPartner()



