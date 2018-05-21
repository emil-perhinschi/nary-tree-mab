# README

create and manipulate n-ary trees with minimum of effort

see under t/ for examples about how to use it

very early release, not tested in production yet but the basics work

# EXAMPLE
````

const tree = new NaryTree()
const root = tree.create_node(
    // parent id
    null,
    // custom data, can be whatever you want since you're dealing with it
    {x:start_x, y:start_y},  
)

// very basic but seedable random number generator
const rand = new haphazard.BBS(this.state.seed)

const max_y = 70;
const max_x = 30;
let current_depth = 0
const max_depth = 9
const max_children = 3

build_absolutely_random_branches(
    root,
    max_y, max_x,
    current_depth, max_depth,
    max_children,
    rand
)



function build_absolutely_random_branches(
    node,
    max_y, max_x,
    current_depth, max_depth,
    max_children,
    rand
) {
    if (current_depth >= max_depth) {
        return null
    }

    current_depth++
    const new_children_count = get_random_int(max_children)

    let counter = 0
    while (counter < new_children_count) {
        const direction =rand.next() % 2 === 1 ? -1 : 1;
        const start_x = node.data.x
        const start_y = node.data.y
        const end_x = node.data.x + direction * get_random_int(rand, max_x)
        const end_y = node.data.y + get_random_int(rand, max_y)

        const child = node.add_child(
            {
                x: end_x,
                y: end_y
            }
        )
        counter++
        build_absolutely_random_branches(
            child,
            max_x, max_y,
            current_depth, max_depth,
            max_children,
            rand
        )
    }
}


````
