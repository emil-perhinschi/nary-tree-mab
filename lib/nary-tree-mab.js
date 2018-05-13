// keeping a list of nodes in a map, keyed on the .id property
// to find a node by id look in the node map (.nodes_list)
// to find the children or the parent look in the node in the parent or children
// properties

//TODO: k, max_depth
export class NaryTree {
    constructor(k = null, max_depth = null) {
        this.k = k
        this.max_depth = max_depth
        this.root_id = null
        this.last_node_id = null
        this.nodes_list = new Map()
    }

    root() {
        if ( this.root_id === null ) {
            return null
        }
        return this.nodes_list.get(this.root_id)
    }

    set_root(node) {
        if (!(node instanceof NaryNode)) {
            throw new Error("set_root expects a NaryNode as paramenter")
        }
        const old_root_id = this.root_id

        this.root_id = node.id
        this.nodes_list.set(node.id, node)
    }

    create_node(parent_id, data, children = []) {
        const node = new NaryNode( data, parent_id, children )
        // no root, so we set this node to be it
        if (this.last_node_id === null) {
            if ( parent_id != null) {
                throw new Error("there is no root defined for this tree, cannot set a parent")
            }
            node.id = 0
            this.set_root(node)
            this.last_node_id = 0
        } else {
            node.id = this.last_node_id + 1
            node.parent_id = parent_id
            this.last_node_id = node.id
            this.nodes_list.set(node.id, node)
        }
        node.tree = () => this
        return node
    }

    node(node_id) {
        if (parseInt(node_id) !== node_id) {
            throw new Error("node_id " + node_id + " must be an integer")
        }
        return this.nodes_list.get(node_id)
    }

    remove_node(node_id) {
        const tree = this
        const node = this.nodes_list.get(node_id)
        node.get_children().forEach(
            function (item) {
                tree.remove_node(item.id)
                tree.nodes_list.delete(item.id)
            }
        )
        this.nodes_list.delete(node_id)
    }
}

// NaryNode because lots of other things are called Node
class NaryNode {
    constructor( data, parent_id = 0, children = []) {
        this.id = null
        this.data = data
        this.parent_id = parent_id
        this.children = children
        this.tree = () => null // set it to a closure around the tree object
    }

    get_children() {
        return Array.from(
            this.children,
            (node_id) => this.tree().node(node_id)
        )
    }

    set_children(children = []) {
        this.children = children
    }

    set_parent(parent_id) {
        if (parseInt(parent_id) !== parent_id ) {
            throw new Error("parent_id is not an integer")
        }
        this.parent_id = parent_id
    }

    parent() {
        if ( this.parent_id !== null ) {
            return this.tree().node(this.parent_id)
        }
        return null
    }

    data() {
        return this.data
    }

    set_data(data) {
        this.data
    }

    add_child(data, children = []) {
        const child = this.tree().create_node(this.id, data, children)
        this.children.push(child.id)
        return child
    }

    remove_child(child_id) {
        this.tree().remove_node(child_id)
        this.children = this.children.filter((i) => i !== child_id )
    }

    path(callback = (i) => i.id) {
        if ( this.parent() !== null ) {
            const path_fragment = this.parent().path(callback)
            path_fragment.push( callback(this) )
            return path_fragment
        }
        return [ callback(this) ]
    }
}
