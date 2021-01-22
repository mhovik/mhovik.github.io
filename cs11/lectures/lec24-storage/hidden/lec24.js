"use strict";
  window.onload = function() {
    $("show-suboptimal-answer").onclick = function() {
      show($("hidden-suboptimal-answer"));
    }
    $("show-improved-query-answer").onclick = function() {
      show($("hidden-improved-query-answer"));
    }
    $("practice-query1-spec").onclick = function() {
      show($("practice-query1"));
    }
    $("practice-query2-spec").onclick = function() {
      show($("practice-query2"));
    }

  };

  function show(el) {
    el.classList.remove("hidden");
  }

  function $(id) { return document.getElementById(id); }
