// From: https://github.com/xolvio/mongodb-diff/blob/master/src/lib/index.js#048344a

import { diff as deepDiff } from 'deep-diff'
import _ from 'lodash'

function getProperty(object, path) {
  return _.get(object, path)
}

function pathToString(path) {
  return path.join('.')
}

function getPropertyPath(changeDiff) {
  return pathToString(changeDiff.path)
}

function isArrayIndexPath(path) {
  return _.isNumber(_.last(path))
}

function isPropertyRemove(change) {
  return change.diff.kind === 'D'
}

function isPropertyUpdate(change) {
  return (change.diff.kind === 'E' || change.diff.kind === 'N') &&
    !isArrayIndexPath(change.diff.path)
}

function isArrayPush(change) {
  return change.diff.kind === 'A' && change.diff.item.kind === 'N'
}

function isArrayPull(change) {
  if (change.diff.kind === 'A' && change.diff.item.kind === 'D') {
    const array = getProperty(change.rhs, change.diff.path)
    if (!array || !_.includes(array, change.diff.item.lhs)) {
      return true
    }
  }

  return false
}

function isArrayUpdate(change) {
  return change.diff.kind === 'A' || (
    (change.diff.kind === 'E' || change.diff.kind === 'N') &&
    isArrayIndexPath(change.diff.path)
  )
}

function setProperty(update, propertyPath, value) {
  if (!update.$set) {
    update.$set = {}
  }
  update.$set[propertyPath] = value
}

function unsetProperty(update, propertyPath) {
  if (!update.$unset) {
    update.$unset = {}
  }
  update.$unset[propertyPath] = true
}

function push(update, propertyPath, value) {
  if (!update.$push) {
    update.$push = {}
  }
  if (!update.$push[propertyPath]) {
    update.$push[propertyPath] = value
  } else {
    if (update.$push[propertyPath].$each) {
      update.$push[propertyPath].$each.push(value)
    } else {
      update.$push[propertyPath] = {
        $each: [update.$push[propertyPath], value],
      }
    }
  }
}

function pull(update, propertyPath, value) {
  if (!update.$pull) {
    update.$pull = {}
  }
  if (!update.$pull[propertyPath]) {
    update.$pull[propertyPath] = value
  } else {
    if (update.$pull[propertyPath].$each) {
      update.$pull[propertyPath].$each.push(value)
    } else {
      update.$pull[propertyPath] = {
        $each: [update.$pull[propertyPath], value],
      }
    }
  }
}

function createChangeHandler(check, updater) {
  return function changeHandler(update, change) {
    if (check(change)) {
      updater(update, change)
      return true
    }
  }
}

function applyChangeHandlers(changeHandlers, update, change) {
  _.every(changeHandlers, (changeHandler) => !changeHandler(update, change))
}

const changeHandlers = [
  createChangeHandler(
    isPropertyUpdate,
    (update, change) => {
      setProperty(update, getPropertyPath(change.diff), change.diff.rhs)
    }
  ),
  createChangeHandler(
    isPropertyRemove,
    (update, change) => {
      unsetProperty(update, getPropertyPath(change.diff))
    }
  ),
  createChangeHandler(
    isArrayPush,
    (update, change) => {
      if (!(update.$set && update.$set[getPropertyPath(change.diff)])) {
        push(update, getPropertyPath(change.diff), change.diff.item.rhs)
      }
    }
  ),
  createChangeHandler(
    isArrayPull,
    (update, change) => {
      pull(update, getPropertyPath(change.diff), change.diff.item.lhs)
    }
  ),
  createChangeHandler(
    isArrayUpdate,
    (update, change) => {
      const propertyPathAsArray = isArrayIndexPath(change.diff.path) ?
        change.diff.path.slice(0, -1) : change.diff.path
      const propertyPath = pathToString(propertyPathAsArray)
      setProperty(update, propertyPath, getProperty(change.rhs, propertyPathAsArray))
    }
  ),
  createChangeHandler(
    () => true,
    (update, change) => {
      throw new Error('Unhandled change: ' + JSON.stringify(change))
    }
  ),
]

const applyTheChangeHandlers = _.partial(applyChangeHandlers, changeHandlers)

export function diff(lhs, rhs) {
  const theDiff = deepDiff(lhs, rhs)
  return _.reduce(
    theDiff,
    (update, changeDiff) => {
      applyTheChangeHandlers(update, { lhs, rhs, diff: changeDiff })
      return update
    },
    {}
  )
}
