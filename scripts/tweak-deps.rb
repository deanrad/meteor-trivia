#!/bin/ruby

require 'pp'
require 'json'

exclude = ARGV[1]
# print exclude
# exit 1

deps = JSON.parse(STDIN.read)

# example = {
#     "client/main":[],
#     "routes":["../meteor/reactrouter:react-router-ssr","../node_modules/react-router/lib/index","../node_modules/react/react"],
#     "server/main":[],
#     "store/reducers/root":[],
#     "store/store":["../node_modules/redux/lib/index","store/reducers/root"]
# }

noMeteor = Proc.new { |dep| 
    dep.sub '../meteor/', ''
}

noNodeMods = Proc.new { |dep| 
    newdep = dep.dup
    newdep.sub! /.*node_modules\//, 'npm:'
    newdep.sub! /\/lib\/index$/, ''
    newdep.sub! /\/index$/, ''
    newdep
}

depth = Proc.new do |dep|
    dep.sub %r{(\.\./)+imports/}, ''
end

double = Proc.new do |dep|
    dep.sub %r{(.*)/(\1)$}, '\1'
end

tweaked = deps.inject({}){ |all, (mod, deps)| 
    newKey = double.call(mod)

    all[newKey] = deps.map do |dep|
        double[depth[noNodeMods[noMeteor[dep]]]]
    end

    all
}

# invisible ones
tweaked['methods/dispatchAction'] << 'client/methods' << 'server/methods'
tweaked['store/reducers/root'] << 'store/reducers/client/reset'

exclude && tweaked.each{ |mod, deps| deps.reject!{ |d| d.include?(exclude) } }

print JSON.dump(tweaked)
print "\n"
