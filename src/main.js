const mathB = new MathB()
const tests = new testing()
const getRandomI = mathB.getRandomI
const isByPercent = mathB.isByPercent


class Pixel {
   constructor(id = null) {
      this.currentGeneration = 1
      this.partner = null
      this.id = id
      this.genes = { R: null, G: null, B: null }
      this.attraction = null
      this.kids = { id: [], genes: [] }
      this.matchTries = 0
      this.createTries = 0
   }

   createPixel = function (id, a, b) {
      let p = new Pixel(id)
      // this.pixelID++
      pixels.pixelID++
      if (a) { // if new pixel has parents:
         p.genes = { // set kid's genes between parents Genes
            R: a.genes.R > b.genes.R ?
               a.genes.R - getRandomI(a.genes.R - b.genes.R) :
               a.genes.R + getRandomI(b.genes.R - a.genes.R),
            G: a.genes.G > b.genes.G ?
               a.genes.G - getRandomI(a.genes.G - b.genes.G) :
               a.genes.G + getRandomI(b.genes.G - a.genes.G),
            B: a.genes.B > b.genes.B ?
               a.genes.B - getRandomI(a.genes.B - b.genes.B) :
               a.genes.B + getRandomI(b.genes.B - a.genes.B),
         }
         let per // set chances for gene A based on parents 
         a.genes.A || b.genes.A ? per = 60 : per = 30
         let geneA = isByPercent(per)
         geneA ? p.genes.A = (getRandomI(100) / 100) : null
         a.kids.id.push(id); a.kids.genes.push({ R: p.R, G: p.G, B: p.B })
         b.kids.id.push(id); b.kids.genes.push({ R: p.R, G: p.G, B: p.B })
      }
      else { // if new pixel has no parents- part of first 5 generations:
         p.genes = { R: getRandomI(255), G: getRandomI(255), B: getRandomI(255) }
         isByPercent(50) ? p.genes.A = (getRandomI(100) / 100) : null
      }
      return p
   }

   isMatch = function (a, b) { // checks attraction chances and return true/false based on those chances
      if (a.partner || b.partner) { console.log(`DON'T DO THAT ${b.id}!!!!`) } // matched pixels can't match again
      a.matchTries++;
      b.matchTries++
      let genesDistance = 0 // combining distances between genes
      genesDistance += a.genes.R > b.genes.R ? a.genes.R - b.genes.R : b.genes.R - a.genes.R
      genesDistance += a.genes.G > b.genes.G ? a.genes.G - b.genes.G : b.genes.G - a.genes.G
      genesDistance += a.genes.B > b.genes.B ? a.genes.B - b.genes.B : b.genes.B - a.genes.B
      let attraction = genesDistance
      a.genes.A && b.genes.A || !a.genes.A && !b.genes.A ? // adjusting attraction based on existence of A
         attraction = Math.floor(attraction *= 1.2) :
         attraction = Math.floor(attraction *= 0.8)
      attraction = Math.floor((attraction / 762) * 100) //turn to percent (of maximum distance: 254*3)
      let generationalAttraction = Math.floor((attraction) * (a.currentGeneration) * 2) // set attraction based on generation
      let match = (isByPercent(generationalAttraction) ? true : false)
      if (match || a.currentGeneration === 6) {
         a.attraction = b.attraction = attraction // set pixel's attraction to attraction with actual match
         a.partner = b.id
         b.partner = a.id
         return true
      }
      return false
   }

   multiply = function (a, b) { // call pixels.generateXPixels based on attraction
      a.createTries++
      b.createTries++
      let multiply = isByPercent(a.attraction + 35)
      multiply ? pixels.generateXPixels(1, a, b) : null
   }
}
let pixel = new Pixel()

class Pixels {
   constructor() {
      this.population = [[], [], [], [], [], []]
      this.pixelID = 1
   }

   generateXPixels = function (pixels, a, b) { // create a child pixel or X random pixels
      for (let i = 0; i < pixels; i++) {
         let p = pixel.createPixel(this.pixelID, a, b)
         this.population[0].push(p)
      }
   }

   createFirstGenerations = function (x) { //create generations until generations 6 exists
      if (!this.population[4][0]) {
         this.population.unshift([])
         this.generateXPixels(x)
         // this.generateXPixels(x - 15 + getRandomI(30)) 
         return this.createFirstGenerations(x)
      }
      this.population.unshift([])
   }

   setCurrentGeneration = function () {
      for (let i = 1; i < 8; i++) {
         for (let k = 0; k < this.population[i].length; k++) {
            this.population[i][k].currentGeneration = i + 1
         }
      }
   }

   createPopulation = async (numberOfGenerations = 10, pixelsPerGeneration = 60, track = -2) => {
      this.createFirstGenerations(pixelsPerGeneration)
      this.setCurrentGeneration()

      for (let i = 2; i < 6; i++) { // match and multiply generations 3-6
         let singles = this.population[i].filter(p => !p.partner) // array referencing to singles
         for (let j = 0; j < Math.floor(singles.length); j += 2) {
            let k = getRandomI(singles.length - j - 2) // set new index (within correct range) to match with i 0
            pixel.isMatch(singles[0], singles[k])
            singles.push(...singles.splice(k, 1)) // pushes pixels who tried matching to end of array
            singles.push(...singles.splice(0, 1))
         }
         !this.population[i][0].partner ? this.population[i][0].matchTries = this.population[i][0].currentGeneration - 2 : null // if array is odd, first pixel in array "matchTries" is wrong if single- correct  
         let couples = this.population[i].filter(p => p.partner) // array referencing to coupled
         for (let j = 0; j < couples.length; j++) {
            if (couples[j].currentGeneration - (couples[j].createTries + couples[j].matchTries) == 2) { // if matched & didn't try creating this generation- multiply
               pixel.multiply(couples[j], couples.find(p => p.id === couples[j].partner))
            }
         }
      }
      this.population.splice(8) // killing generation 9
      numberOfGenerations--
      track++
      if (numberOfGenerations > 0) {
         // console.log(track,this.population[track]) // track a generation's development 
         return (this.createPopulation(numberOfGenerations, pixelsPerGeneration, track))
      }
      return (this.population)
   }
}

let pixels = new Pixels
// pixels.createPopulation(20, 50)

let allTests = async function (numberOfGenerations, pixelsPerGeneration) {
   let testPopulation = await pixels.createPopulation(numberOfGenerations, pixelsPerGeneration)
   console.log(`test:`, numberOfGenerations, `generations passed,`, pixelsPerGeneration, `pixels per starter generations`, testPopulation)
   tests.goneAfter8Generations(testPopulation)
   tests.createOnly3to6(testPopulation)
   tests.aChildMaxPerGeneration(testPopulation)
   tests.matchOnly3to6(testPopulation)
   tests.matchMaxOnceAGeneration(testPopulation)
   tests.childGeneInRange(testPopulation)
   tests.someGeneA(testPopulation)
   tests.attractOpposite(testPopulation)
   tests.settleOverGeneration(testPopulation)
   // tests.onlyMatchSameGeneration(testPopulation)
   tests.noSiblingPartner(testPopulation)
   tests.onlyOnePartner(testPopulation)
}

// allTests(10, 50) // test after 10 generations, generate first generations with 50 pixels
allTests(20, 50)
// allTests(30, 50)
// allTests(50, 50)
// allTests(100, 50)
