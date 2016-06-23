$(() => {
  $('#btn-reg').on('click', () => {
    if ($('#password').val() !== $('#confirm-password').val()) {
      window.alert('两次输入不一致')
      return
    }
    $.post('/reg', {
      username: $('#username').val(),
      password: $('#password').val()
    }, (res) => {
      if (!res.status) {
        alert('reg success')
        window.location = '/'
      } else {
        alert(`reg fail: ${res.errorInfo}`)
      }
    })
    console.log('btn reg click')
  })
})
