svg = STDIN.read


# color = svg.gsub!( /none/, '#ee2222')
color = svg

se_nodes = [
  'server/listeners/writeActionsToMongo',
  'methods/client/dispatchAction'
]

source_nodes = [
  'methods/server/dispatchAction',
  'client/streams/serverActionsStream'
]

se_nodes.each do |n|
  color.sub!(%r{<title>#{n}</title>\s+<ellipse fill="none"}, "<title>#{n}</title>\n<ellipse fill=\"#ee6666\"")
end

source_nodes.each do |n|
  color.sub!(%r{<title>#{n}</title>\s+<ellipse fill="none"}, "<title>#{n}</title>\n<ellipse fill=\"#E8ECF5\"")
end

print color
print

