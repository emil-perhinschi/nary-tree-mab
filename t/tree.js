const tree_namespace = require("nary-tree-mab")
const tap = require("tap")

tree = new tree_namespace.NaryTree()
tap.equals(null, tree.root())
const node = tree.create_node(null, "asdf", [])
const root = tree.root()
console.log("Rooooooooooooooooooooooooooooooooot", root)

console.log(node)
console.log(tree)
const tree_object = node.tree()
console.log(tree_object)

node.data = "xyz"

console.log(tree)

console.log(tree.root())
const child1 = tree.create_node(tree.root_id, "1234")
console.log(tree)
console.log("child1", child1)
child1.add_child("1010")
child1.add_child("1010")
child1.add_child("1010")
child1.add_child("1010")
child1.add_child("1010")
const children_of_1 = child1.get_children()
console.log(children_of_1)

const child5 = tree.node(5)
console.log("child_5", child5)
child5.add_child("5010")
child5.add_child("5010")
child5.add_child("5010")
child5.add_child("5010")
child5.add_child("5010")
console.log("child5 with children", child5)
console.log("children of child5", child5.get_children())
console.log("children of child1", child1.get_children())

const child11 = tree.node(11)
console.log("PPPPPPPPPPPPPPPPPppaaaaaaaaaaaaaaaaath", child11.path())
console.log(
    "PPPPPPPPPPPPPPPPPppaaaaaaaaaaaaaaaaath with callback",
    child11.path( (item) => item.id + "::" + item.data )
)
// tree.remove_node(child1.id)
// console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrooooot", root)
// console.log(tree)
