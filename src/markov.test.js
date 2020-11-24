const Markov = require('./markov.js')

describe('MarkovChain', () => {
  test('can be constructed without errors', () => {
    new Markov()
  })

  test('can add a phrase', () => {
    const m = new Markov()
    m.addPhrase('hello world this is god')

    let props = [
      'hello',
      'world',
      'this',
      'is',
      'god']
    props.forEach(item => expect(m.data).toHaveProperty(item));
  })

  test('can generate a phrase', () => {
    const m = new Markov(Math.random)
    m.addPhrase('you can never step in the same river twice')

    expect(m.generatePhrase()).toEqual('you can never step in the same river twice')
  })

  test('words are normalized as they are entered', () => {
    const m = new Markov(Math.random)
    m.addPhrase('hello')
    m.addPhrase('Hello')
    m.addPhrase('hello.')
    m.addPhrase('"hello"')

    expect(m.data).toHaveProperty('hello')
    expect(m.data).not.toHaveProperty('Hello')
    expect(m.data).not.toHaveProperty('"hello"')
  })
})