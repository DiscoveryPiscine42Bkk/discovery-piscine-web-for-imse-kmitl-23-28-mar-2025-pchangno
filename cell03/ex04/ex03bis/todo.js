$(document).ready(function() {
  const $ft_list = $("#ft_list");
  const name = "mycookie";
 
  function createTodo() {
      const txt = prompt("Please Enter TO DO LIST :");      
      if (txt) {
          const cookie = Cookies.get(name);
          let values;
          if(cookie) {
              values = JSON.parse(cookie);
          } else {
              values = [];
          }
          values.push(txt);
          Cookies.set(name, JSON.stringify(values));
          const $node = $("<div>").text(txt).click(function() {
              if (confirm("Do you want to Delete?")) {
                  $(this).remove();
                  Cookies.remove(name);
                  
              }
          });
          $ft_list.prepend($node);
      }
  }

  if (Cookies.get(name)) {
      const cookie = Cookies.get(name);
      values = JSON.parse(cookie)
      values.forEach(function(val) {
          if (val) {
              const $node = $("<div>").text(val).click(function() {
                  if (confirm("Do you want to Delete?")) {
                      $(this).remove();
                      Cookies.remove(val);
                      
                  }
              });
              $ft_list.prepend($node);
          }
      });
  }

  $("#create").click(createTodo);
});