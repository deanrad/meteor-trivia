svg = STDIN.read


# color = svg.gsub!( /none/, '#ee2222')
color = svg

se_nodes = [
  'server/listeners/writeActionsToMongo',
  'methods/client/dispatchAction'
]

se_nodes.each do |n|
  color.sub!(%r{<title>#{n}</title>\s+<ellipse fill="none"}, "<title>#{n}</title>\n<ellipse fill=\"#ee4444\"")
end

print color
print

