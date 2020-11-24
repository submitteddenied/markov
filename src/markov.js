const START_TOKEN = Symbol('start')
const END_TOKEN = Symbol('end')

class MarkovChain {
  constructor(random) {
    this.data = {}
    this.random = random
  }

  /**
   * Reads a phrase and adds it to the chain
   * @param {String} phrase A phrase to be added to the chain - space separated
   */
  addPhrase (phrase) {
    const words = phrase.split(' ').filter(this.filterWords)
    if(words.length === 0) return
    words.unshift(START_TOKEN)
    words.push(END_TOKEN)

    for(let i = 0; i < words.length - 1; i++) {
      const normalized = this.normalize(words[i])
      const wordObj = this.data[normalized] || this.defaultWordObj()
      const nextNormalized = this.normalize(words[i + 1])
      if(wordObj.next[nextNormalized] == undefined) {
        wordObj.next[nextNormalized] = 0
      }
      wordObj.next[nextNormalized]++

      if(wordObj.variants[words[i]] == undefined) {
        wordObj.variants[words[i]] = 0
      }
      wordObj.variants[words[i]]++

      this.data[normalized] = wordObj
    }
  }

  normalize (word) {
    if(typeof word === 'symbol') {
      return word
    }
    //downcase, remove punctuation, etc
    let result = word.toLowerCase()
    result = result.replace(/[^a-z]/g, '')
    return result
  }

  defaultWordObj () {
    return {
      variants: {},
      next: {}
    }
  }

  /**
   * Decides if certain words should be kept or discarded
   * @param {String} word The word to be filtered
   */
  filterWords (word) {
    //For now, just make sure it's at least one letter
    return word.match(/[a-zA-Z]/) !== null
  }

  generatePhrase() {
    let phrase = []
    let currentWord = START_TOKEN
    while(currentWord != END_TOKEN) {
      const nextOptions = this.data[currentWord].next
      const flattenedNext = 
      currentWord = this.pickRandom(nextOptions)
      if(currentWord != END_TOKEN) {
        phrase.push(currentWord)
      }
    }

    return phrase.join(' ')
  }

  pickRandom(nextOptions) {
    let words = Object.keys(nextOptions).reduce((memo, word) => {
      for(let i = 0; i < nextOptions[word]; i++) {
        memo.push(word)
      } 
      return memo
    }, [])
    if(nextOptions[END_TOKEN] != undefined) {
      for(let i = 0; i < nextOptions[END_TOKEN]; i++) {
        words.push(END_TOKEN)
      }
    }
    const max = words.length - 1
    return words[Math.floor(this.random() * max)]
  }
}

module.exports = MarkovChain