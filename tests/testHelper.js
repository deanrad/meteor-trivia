import td from 'testdouble'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import _ from 'underscore'
chai.use(chaiImmutable)

td.replace('meteor/meteor', { Meteor: { isClient: false, isServer: true } })
td.replace('meteor/underscore', _)
