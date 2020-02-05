const mathB = new MathB()
const getRandomRGB = mathB.getRandomRGB
const getRandomI = mathB.getRandomI
const isByPercent = mathB.isByPercent

const population = [[], [], [], [], [], [], [], [],]

const generatePixel = function (x) {
   let p = {
      gene: { R: getRandomRGB(), G: getRandomRGB(), B: getRandomRGB() },
      curG: 1, tried: 0, sit: `single`
   }
   if (isByPercent(x)) {
      p.gene.A = (getRandomI(100) / 100)
   }
   return p
}

const generateXPixels = function (x) {
   for (let i = 0; i < x; i++) {
      population[0].push(generatePixel(50))
   }
}

generateXPixels(300)

const testComp = function (a, b) {
   let comp = 0
   comp += Math.abs(a.gene.R - b.gene.R)
   comp += Math.abs(a.gene.G - b.gene.G)
   comp += Math.abs(a.gene.B - b.gene.B)
   if (a.gene.A && b.gene.A || !a.gene.A && !b.gene.A) {
      comp = Math.floor(comp *= 0.8)
   }
   comp = 100 - (Math.floor(100 / 765 * comp))
   // console.log(comp)
   return comp
}

// for (let i = 0; i < 300; i += 2) {
//    testComp(population[0][i], population[0][i+1])
// }



const createChild = function (pixelA, pixelB) {
   const both = [pixelA[0], pixelA[1], pixelA[2], pixelB[0], pixelB[1], pixelB[2]]
   const spliceB = () => both.splice(getRandomI(both.length), 1)
   spliceB()
   spliceB()
   spliceB()
   population.push(both)
}

const createChildren = function (pixelA, pixelB) {
   createChild(pixelA, pixelB)
   createChild(pixelA, pixelB)
   createChild(pixelA, pixelB)
   createChild(pixelA, pixelB)
}

const createCulture = function (x = 2) {
   let round = x // the number of children created in the previous round
   let amount = population.length
   let start = (amount - round) // the first index in population that had no children
   for (let i = start; i < amount; i += 2) {
      createChildren(population[i], population[i + 1])
   }
   console.log(population) // to see the size of the population after each round of multiplying 
   round *= 2
   return (round < 10 ? createCulture(round) : null)
}


// createCulture()