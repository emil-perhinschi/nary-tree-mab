// keeping a list of nodes in a map, keyed on the .id property
// to find a node by id look in the node map (.nodes_list)
// to find the children or the parent look in the node in the parent or children
// properties

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
        if (!(node instanceof Node)) {
            throw new Error("set_root expects a Node as paramenter")
        }
        const old_root_id = this.root_id

        this.root_id = node.id
        this.nodes_list.set(node.id, node)
    }

    create_node(parent_id, data, children = []) {
        const node = new Node(parent_id, data, children)
        // no root, so we set this node to be it
        if (this.last_node_id === null) {
            if ( parent_id != 'undefined') {
                throw new Error("there is no root defined for this tree, cannot set a parent")
            }
            node.set_id(0)
            this.set_root(node)
            this.last_node_id = 0
        } else {
            node.set_id(this.last_node_id + 1)
            node.parent_id = parent_id
            this.last_node_id = node.id
            this.nodes_list.set(node.id, node)
        }
        node.tree = () => this
    }
}

class Node {
    constructor( data, parent_id = 0, children = []) {
        this.id = null
        this.data = data
        this.parent_id = parent_id
        this.children = children
        this.tree = () => null // set it to a closure around the tree object
    }

    id() {
        return this.id
    }

    set_id(id) {
        this.id = id
    }

    children() {
        return this.children
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
        return this.parent_id
    }

    data() {
        return this.data
    }

    set_data(data) {
        this.data
    }
}
