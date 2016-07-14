/* eslint-disable no-eval, prefer-rest-params */
/*
    Like mdg:validated-method, but differing in client-side behavior.
    A function created via UniMethod.define returns a Promise for the
    server value. It can be created with a single function, or with
    an object {clientStub, serverMethod}, in which case the return value
    will have fields `optimisticValue` and `finalValue [Promise]`, and
    still behave as a `then`able.

    Before:

    Meteor.methods({foo: (arg1, arg2) => true)

    Meteor.call('foo', 'arg1', 'arg2', (err, result) => {
        if (err) ...
    })

    Before: (MDG version)

    let arg1 = 'arg1', arg2 = arg2
    let fooMethod = new ValidatedMethod({
      name: 'foo',
      run: (argObject) => true
    })
    let clientValue = fooMethod.call({arg1, arg2}, (err, result) => {
        if (err) ...
        let serverValue = result
    })


    After:

    let fooMethod = UniMethod.define('foo', ({arg1, arg2}) => true)
    fooMethod({arg1, arg2})

    or

    let methods = UniMethod.methods({
        foo: ({arg1, arg2}) => true
    })
    methods.foo(arg1, arg2)

    Advantages:
    No callbacks. Promises. Bluebird ones, even.
    No positional arguments. Named arguments.
    No magic strings. Callable objects.
    No `.call`. Just call it as a function

    Usage:

    Apps.update = UniMethod.define('app.update', function({id, fields})...)

    TODO:

    Allow for mixins, such as MustBeLoggedIn, or MustBeInRole('teacher')
*/

import Promise from 'bluebird'
import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

export const nameUniMethod = function(ddpName) {
    let camelize = (str) =>
        str.replace(/[-_\s]+(.)?/g, (match, c) =>
            (c ? c.toUpperCase() : '')
        )

    let methodName = camelize(ddpName.replace('.', '-'))

    let idRegex = /^[a-zA-Z0-9]+$/
    // https://gist.github.com/mathiasbynens/6334847
    let reservedRegex = /^(do|if|in|for|let|new|try|var|case|else|enum|eval|null|this|true|void|with|await|break|catch|class|const|false|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/ // eslint-disable-line max-len
    if (! idRegex.test(methodName)) {
        throw new Error(`${methodName} can not be made into a valid javascript identifier`)
    }
    if (reservedRegex.test(methodName)) {
        throw new Error(`${methodName} can not be a JavaScript keyword`)
    }
    return methodName
}

//const UniMethod = {
UniMethod = {
    methods(defs) {
        return _.reduce(defs, (all, definition, name) => {
            all[name] = UniMethod.define(name, definition)
            return all
        }, {})
    },
    define(ddpName, opts) {
        if (_.isFunction(opts)) {
            let fn = opts
            opts = {
                clientStub: fn,
                serverMethod: fn
            }
        }

        let mdgMethod = new ValidatedMethod({
            name: ddpName,
            validate: opts.validate || function() {},
            applyOptions: opts.applyOptions,
            run: function (...args) {
                if (this.isSimulation) {
                    return opts.clientStub.apply(this, args)
                }
                return opts.serverMethod.apply(this, args)
            }
        })

        function uniMethodBody(arg) { // eslint-disable-line no-unused-vars
            // Keep the simple, Fiber-based sync-style API on the server
            if (Meteor.isServer) return mdgMethod.call(arg)

            let clientStubReturn = null

            let serverReturnPromise = new Promise((resolve, reject) => {
                clientStubReturn = mdgMethod.call(arg, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                    return undefined // dont return from callback - screws it up!
                })
            })

            return {
                optimisticValue: clientStubReturn,
                finalValue: serverReturnPromise,
                then: function(success, err) {
                    return this.finalValue.then(success, err)
                },
                catch: function(err) {
                    return this.finalValue.catch(err)
                }
            }
        }

        let methodName = nameUniMethod(ddpName)

        let returnFunction = null
        eval(`
            returnFunction = function ${methodName} (arg, oopsArg) {
                if (oopsArg) {
                    throw new Error('UniMethod expects a single object of named parameters.')
                }
                return uniMethodBody(arg)
            }
        `)

        UniMethod[ddpName] = returnFunction

        return returnFunction
    }
}
