const population = []

const getRandomRGB = function () {
   return Math.floor((Math.random() * 255) + 1)
}

const getRandomI = function (x) {
   return Math.floor((Math.random() * (x)))
}

const pixel1 = [getRandomRGB(), getRandomRGB(), getRandomRGB()]
const pixel2 = [getRandomRGB(), getRandomRGB(), getRandomRGB()]
population.push(pixel1, pixel2)

const createChild = function (pixelA, pixelB) {
   const both = [pixelA[0], pixelA[1], pixelA[2], pixelB[0], pixelB[1], pixelB[2]]
   const spliceB = () => both.splice(getRandomI(both.length), 1)
   spliceB()
   spliceB()
   spliceB()
   population.push(both)
   console.log(population.length) // number of children created at the same time= "createChildren" invocations  
                                    // a new number appearing = "createChild" invocation
}

const createChildren = function (pixelA, pixelB) {
   setTimeout(function () { createChild(pixelA, pixelB) }, 2000)
   setTimeout(function () { createChild(pixelA, pixelB) }, 4000)
   setTimeout(function () { createChild(pixelA, pixelB) }, 6000)
   setTimeout(function () { createChild(pixelA, pixelB) }, 8000)
}

const createCulture = function (x = 2) {
   let round = x // the number of children created in the previous round
   let amount = population.length
   let start = (amount - round) // the first index in population that had no children
   for (let i = start; i < amount; i += 2) {
      createChildren(population[i], population[i + 1])
   }
   // console.log(population.length) // to see the size of the population after each round of multiplying 
   round *= 2
   return setTimeout(function () { createCulture(round) }, 10000)
}


createCulture()