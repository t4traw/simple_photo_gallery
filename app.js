function sleep(milsec) {
  return new Promise(resolve => setTimeout(resolve, milsec));
}

async function generateGallery(files) {
  let file_counter = files.length
  let file_name = new Array()
  let file_path = new Array()
  let images_counter = 0

  document.getElementById('app').textContent = null

  for (let i = 0; i < file_counter; i++) {
    if (!files[i].name.match(/\.jpg|\.jpeg|\.png/)) { continue };
    file_name.push(files[i].name.match(/(.*)(?:\.([^.]+$))/)[1])
    file_path.push(files[i].webkitRelativePath)
  }

  for (let i = 0; i < 6; i++) {
    let image = document.createElement('div')
    image.classList.add('slides')

    image.style.backgroundImage = 'url(' + file_path[images_counter] + ')'
    image.classList.add('animated')
    image.classList.add('slow')
    image.classList.add('fadeIn')

    let desc = document.createElement('p')
    let text = document.createTextNode(file_name[i])
    desc.classList.add("description")
    desc.appendChild(text)

    image.appendChild(desc)
    document.getElementById('app').appendChild(image)
    images_counter++
  }

  slides = document.getElementsByClassName('slides')
  while (true) {
    for (let i = 0; i < 6; i++) {
      await sleep(5000)

      let newNode = document.createElement('div')
      newNode.style.backgroundImage = 'url(' + file_path[images_counter] + ')'
      newNode.classList.add('slides')
      newNode.classList.add('animated')
      newNode.classList.add('slow')
      newNode.classList.add('fadeIn')
      newNode.style.backgroundImage = 'url(' + file_path[images_counter] + ')'

      let desc = document.createElement('p')
      let text = document.createTextNode(file_name[images_counter])
      desc.classList.add("description")
      desc.appendChild(text)
      newNode.appendChild(desc)

      document.getElementById('app').replaceChild(newNode, slides[i])
      images_counter++
      if (images_counter >= (file_counter - 1)) {
        images_counter = 0
      }
    }
  }
}
