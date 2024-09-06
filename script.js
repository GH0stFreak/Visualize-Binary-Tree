const root = document.getElementById('root')
let nodes = document.querySelectorAll('.node')
const footer = document.getElementById('footer')
const input = document.getElementById('input_value')
const delete_node = document.getElementById('delete_node')
let value = ''
let element
let error = ''

const add_left = document.getElementById('add_left')
const add_right = document.getElementById('add_right')

function changeValue(el) {
  value = input.value.slice(-5)
  element.childNodes[1].textContent = value
}
function displayFooter() {
  footer.classList.remove('none')
  element = this
}
function runAtStart() {
  nodes.forEach((node) => {
    node.addEventListener('click', displayFooter)
  })
}
runAtStart()

input.addEventListener('keyup', changeValue)
input.removeEventListener('focusout', changeValue)
input.addEventListener('focusout', () => {
  footer.classList.add('none')
  input.value = ''
})

let bottom_line = document.createElement('span')
bottom_line.classList.add('bottom_line')

let line2 = document.createElement('span')
line2.classList.add('line2')

let child = document.createElement('div')
child.innerHTML = `
    <span class="line"></span>
    <span class="line2"></span>
    <div class="node">
        <span class="circle">L</span>
    </div>
`

let addingChild = (parent, str, value) => {
  child = document.createElement('div')
  child.classList.add(str)
  child.id = str
  child.innerHTML = `
      <span class="line"></span>
      <div class="node">
        <span class="circle">${value}</span>
      </div>
      `
  parent.append(child)
}

add_left.addEventListener('click', () => {
  let parent = element.parentElement
  let addLeftNode = true

  if (!parent.contains(bottom_line)) {
    bottom_line = document.createElement('span')
    bottom_line.classList.add('bottom_line')
    line2 = document.createElement('span')
    line2.classList.add('line2')
    parent.prepend(bottom_line)
    parent.prepend(line2)
  }

  let children = parent.children

  for (let i = 0; i < children.length; i++) {
    let tableChild = children[i]
    if (tableChild.id == 'left') {
      addLeftNode = false
      break
    }
    continue
  }

  if (addLeftNode === true) {
    addingChild(parent, 'left', 'L')
  }

  nodes = document.querySelectorAll('.node')
  runAtStart()
})

add_right.addEventListener('click', () => {
  let parent = element.parentElement
  let addRightNode = true

  if (!parent.contains(bottom_line)) {
    bottom_line = document.createElement('span')
    bottom_line.classList.add('bottom_line')
    line2 = document.createElement('span')
    line2.classList.add('line2')
    parent.prepend(bottom_line)
    parent.prepend(line2)
  }

  let children = parent.children

  for (let i = 0; i < children.length; i++) {
    let tableChild = children[i]
    if (tableChild.id == 'right') {
      addRightNode = false
      break
    }
    continue
  }

  if (addRightNode === true) {
    addingChild(parent, 'right', 'R')
  }

  // Array.from(parent.children).map((el) => {
  //   if (el.id != 'right') {
  //     addRightNode = true
  //   } else {
  //     addRightNode = false
  //     error = 'Right Child already exists'
  //     console.log(error)
  //   }
  // })
  // if (addRightNode === true) {
  //   addingChild(parent, 'right', 'R')
  // }

  nodes = document.querySelectorAll('.node')
  runAtStart()
})

if (footer.classList.contains('none')) {
  document.body.addEventListener('keydown', addChild)
} else {
  document.body.removeEventListener('keydown', addChild)
}

function addChild(event) {
  if (input == document.activeElement) return

  if (event.code == 'KeyA' || event.code == 'KeyD') {
    let parent = element.parentElement
    let addLeftNode = true
    let addRightNode = true
    // console.log(parent)

    let children = parent.children
    if (event.code == 'KeyA') {
      for (let i = 0; i < children.length; i++) {
        let tableChild = children[i]
        if (tableChild.id == 'left') {
          addLeftNode = false
          break
        }
        continue
      }

      if (addLeftNode === true) {
        addingChild(parent, 'left', 'L')
      }
    } else {
      for (let i = 0; i < children.length; i++) {
        let tableChild = children[i]
        if (tableChild.id == 'right') {
          addRightNode = false
          break
        }
        continue
      }

      if (addRightNode === true) {
        addingChild(parent, 'right', 'R')
      }
    }

    if (!parent.contains(bottom_line)) {
      bottom_line = document.createElement('span')
      bottom_line.classList.add('bottom_line')
      line2 = document.createElement('span')
      line2.classList.add('line2')
      parent.prepend(bottom_line)
      parent.prepend(line2)
    }

    nodes = document.querySelectorAll('.node')
    runAtStart()
  }
}

function deleteNode() {
  if (element.classList.contains('root')) return
  let selectedNode = element.parentElement
  let parent = element.parentElement.parentElement
  let has_sibling = false
  if (selectedNode.classList.contains('left')) {
    for (let el of parent.children) {
      if (el.classList.contains('right')) {
        has_sibling = true
        break
      }
    }
  } else if (selectedNode.classList.contains('right')) {
    for (let el of parent.children) {
      if (el.classList.contains('left')) {
        has_sibling = true
        break
      }
    }
  }
  if (has_sibling == false) {
    let elements = parent.childNodes
    console.log(elements)
    for (let i = elements.length - 1; i >= 0; i++) {
      // console.log(elements[i])
      // if (
      //   elements[i].classList.contains('bottom_line') ||
      //   elements[i].classList.contains('line2')
      // )
      //   elements[i].remove()
    }
  }
  selectedNode.remove()
}

delete_node.addEventListener('click', deleteNode)
