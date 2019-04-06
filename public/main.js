var thumbUp = document.getElementsByClassName("fa-star");
var trash = document.getElementsByClassName("fa-trash-alt");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});



fetch('https://ghibliapi.herokuapp.com/films')
.then(res => res.json())
.then(movies => {
  for (let i = 0; i < movies.length; i++) {
    const title = document.createElement('h2')
    const description = document.createElement('p')
    const director = document.createElement('h3')

    const moviePoster = document.createElement('section')

    const movieTitle = document.createTextNode(movies[i].title)
    const movieDescription = document.createTextNode(movies[i].description)
    const movieDirector = document.createTextNode(movies[i].director)
    title.appendChild(movieTitle)
    description.appendChild(movieDescription)
    moviePoster.appendChild(title)
    moviePoster.appendChild(description)
    moviePoster.appendChild(movieDirector)
    document.getElementById('container').appendChild(moviePoster)
  }
})
.catch(error => console.log(error))
