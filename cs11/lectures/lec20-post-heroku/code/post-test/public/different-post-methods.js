"use strict";

(function() {
  window.addEventListener("load", init);

  function init() {
    let url = "/postTest";
    let data = {
      username: 'example',
      "hello": "world"
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)));


    let formData = new FormData();
    formData.append("username", "Test");
    formData.append("goodbye", "world");
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)));


    let searchParams = new URLSearchParams();
    searchParams.set("search", "Hello World");
    fetch(url, {
      method: 'POST',
      body: searchParams
    })
      .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))

  }
})();