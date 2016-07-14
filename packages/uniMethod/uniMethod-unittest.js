import UniMethod from './index'
import td from 'testdouble'

module.exports = ({ validatedMethodStub }) =>
    describe('UniMethod', () => {
        afterEach(() => td.reset())

        describe('#methods', () => {
            it('should call #define for each method in the map', () => {
                let defineStub = td.replace(UniMethod, 'define')
                UniMethod.methods({
                    one: () => {},
                    two: { foo: 'bar' },
                })
                td.verify(defineStub('one', td.matchers.isA(Function)))
                td.verify(defineStub('two', td.matchers.isA(Object)))
            })
        })

        describe('#define', () => {
            describe('with name, function arguments', () => {
                it('should call through to mdg:validated-method', () => {
                    UniMethod.define('one', () => {})
                    td.verify(validatedMethodStub(td.matchers.contains({
                        name: 'one',
                    })))
                   /* and other validated-method-specific properties */
                })
            })

            describe('with name, {clientStub, serverMethod} arguments', () => {
                it('should call through to mdg:validated-method', () => {
                    UniMethod.define('two', {
                        clientStub: () => {},
                        serverMethod: () => {},
                    })
                    td.verify(validatedMethodStub(td.matchers.contains({
                        name: 'two',
                    })))
                })
            })
        })
    })
