import td from 'testdouble'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
chai.use(chaiImmutable)

td.replace('meteor/meteor', { Meteor: { isClient: false, isServer: true } })
