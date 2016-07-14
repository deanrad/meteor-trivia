import { Meteor } from 'meteor/meteor'
import { expect } from 'meteor/practicalmeteor:chai'
import UniMethod, { nameUniMethod } from './index'

let shouldNotBeHere = () => { throw new Error('should not be here') }
let isBluebird = (promiseInstance) => (!! promiseInstance.constructor.props)


describe('UniMethod.methods({})', () => {
    it('Should produce an object whose values are UniMethods', () => {
        let result = UniMethod.methods({
            simple: (arg) => {
                return (Meteor.isClient ? 'client' : 'server') + '/' + arg
            },
            clientServer: {
                clientStub: function(arg) { return 'Client Stub Value: ' + arg },
                serverMethod: function(arg) { return 'Real Server Value: ' + arg }
            }
        })
        expect(result).to.be.instanceof(Object)
        expect(result.simple).to.be.instanceof(Function)
        expect(result.clientServer).to.be.instanceof(Function)
    })
})

describe('UniMethod.define', () => {
    let subject = UniMethod.define('client-server-method', {
        clientStub: function(arg) { return 'Client Stub Value: ' + arg },
        serverMethod: function(arg) { return 'Real Server Value: ' + arg }
    })

    it('Returns a function', () => {
        expect(subject).to.be.instanceof(Function)
    })

    describe('The returned function', () => {
        describe('creating #name from the given name', () => {
            it('Has the camelized name on #name', () => {
                expect(subject.name).to.equal('clientServerMethod')
            })
            it('should make foo-bar into fooBar', () => {
                expect(nameUniMethod('foo-bar')).to.equal('fooBar')
            })
            it('should make foo_bar into fooBar', () => {
                expect(nameUniMethod('foo_bar')).to.equal('fooBar')
            })
            it('should make foo.bar into fooBar', () => {
                expect(nameUniMethod('foo.bar')).to.equal('fooBar')
            })
            it('should make foobar1 into foobar1', () => {
                expect(nameUniMethod('foobar1')).to.equal('foobar1')
            })
            it('should throw if given a reserved word', () => {
                expect(nameUniMethod.bind(null, 'function')).to.throw(Error)
            })
            it('should be ok with embedded reserved word', () => {
                expect(nameUniMethod('new-board-eval')).to.equal('newBoardEval')
            })
            it('should throw if given punctuation', () => {
                expect(nameUniMethod.bind(null, ';attack!')).to.throw(Error)
            })
        })
        describe('calling it', () => {
            it('should throw if called with > 1 argument', () => {
                let arg1 = 'arg1'
                expect(subject.bind(null, arg1, 'b')).to.throw(Error)
            })
            it('may be called with 0 arguments', () => {
                if (Meteor.isServer) {
                    expect(subject()).to.include('Real Server Value:')
                } else {
                    return subject().then(
                        v => expect(v).to.include('Real Server Value:'),
                        shouldNotBeHere
                    )
                }
            })
        })
    })

    describe('When defined with name and function, calling it', () => {
        let subject = UniMethod.define('name-and-function', (arg) => {
            return (Meteor.isClient ? 'client' : 'server') + '/' + arg
        })
        let result = subject('arg1')

        if (Meteor.isClient) {
            it('has a "then" method, and acts as a Promise', () => {
                expect(result).to.have.property('then')

                return result.then(
          v => expect(v).to.equal('server/arg1'),
          shouldNotBeHere
        )
            })

            it('has a "catch" method, and acts as a Promise', () => {
                expect(result).to.have.property('catch')

                return result.catch(shouldNotBeHere)
            })

            it('contains the result of the clientStub in #optimisticValue', () => {
                expect(result.optimisticValue).to.equal('client/arg1')
            })

            it('contains a Bluebird promise for the real (server) result in  #finalValue', () => {
                expect(result.finalValue).to.have.property('then')
                expect(isBluebird(result.finalValue))
        /* ALWAYS return the promise chain from the test or you'll silence errors! */
                return result.finalValue.then(
            v => expect(v).to.equal('server/arg1'),
            shouldNotBeHere
        )
            })
        }

        if (Meteor.isServer) {
            it('returns an immediate value', () => {
                expect(result).to.equal('server/arg1')
            })
        }
    })

    describe('When defined with name, {clientStub, serverMethod}, calling it', () => {
        if (Meteor.isClient) {
            let result = subject('arg1')

            it('has a "then" method, and acts as Bluebird promise', () => {
                expect(result).to.have.property('then')

                return result.then(
          v => expect(v).to.equal('Real Server Value: arg1'),
          shouldNotBeHere
        )
            })

            it('has a "catch" method, and acts as Bluebird promise', () => {
                expect(result).to.have.property('catch')

                return result.catch(shouldNotBeHere)
            })

            it('contains the result of the clientStub in #optimisticValue', () => {
                expect(result.optimisticValue).to.equal('Client Stub Value: arg1')
            })

            it('contains a Bluebird promise for the real (server) result in  #finalValue', () => {
                expect(result.finalValue).to.have.property('then')
                expect(isBluebird(result.finalValue))
        /* ALWAYS return the promise chain from the test or you'll silence errors! */
                return result.finalValue.then(
            v => expect(v).to.equal('Real Server Value: arg1'),
            shouldNotBeHere
        )
            })
        }

        if (Meteor.isServer) {
            it('returns an immediate value', () => {
                let result = subject('arg1')
                expect(result).to.equal('Real Server Value: arg1')
            })
        }
    })
})

