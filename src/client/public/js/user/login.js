$(() => {
  $('#btn-login').on('click', () => {
    $.post('/login', {
      username: $('#username').val(),
      password: $('#password').val()
    }, (res) => {
      if (!res.status) {
        alert('login success')
        window.location = '/'
      } else {
        alert(`login fail: ${res.errorInfo}`)
      }
    })
  })
})
