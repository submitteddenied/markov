More proverbs at: https://www.phrases.org.uk/meanings/proverbs.html

Do the thing!
```
const MarkovChain = require('./src/markov')
const markov = new MarkovChain(Math.random)

const proverbs = fs
  .readFileSync('./sample/proverbs.txt', 'utf8')
  .split('\r\n')
  .filter((i) => i) // Remove empty "falsy" strings

proverbs.forEach((i) => markov.addPhrase(i))

markov.generatePhrase()
```