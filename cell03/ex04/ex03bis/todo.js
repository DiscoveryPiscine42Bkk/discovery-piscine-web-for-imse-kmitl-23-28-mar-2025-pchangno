$(document).ready(function () {
    const $ft_list = $("#ft_list");
    const cookieName = "MyCookie"; 
  
    function createTodo() {
      const txt = prompt("Please Enter TO DO LIST :");
      if (txt && txt.trim() !== "") { 
        let values = getCookieValues();
        values.push(txt);
        updateCookie(values);
        addTodoToDOM(txt);
      }
    }
  
    function getCookieValues() {
      const cookie = Cookies.get(cookieName);
      return cookie ? JSON.parse(cookie) : [];
    }
  
    function updateCookie(values) {
      Cookies.set(cookieName, JSON.stringify(values), { expires: 365 }); 
    }
  
    function addTodoToDOM(text) {
      const $node = $("<div>").text(text).click(function () {
        if (confirm("Do you want to Delete?")) {
          const textToRemove = $(this).text();
          $(this).remove();
          removeTodoFromCookie(textToRemove);
        }
      });
      $ft_list.prepend($node);
    }
  
    function removeTodoFromCookie(textToRemove) {
      let values = getCookieValues();
      const updatedValues = values.filter((val) => val !== textToRemove);
      updateCookie(updatedValues);
    }
  
    
    const initialValues = getCookieValues();
    initialValues.forEach((val) => {
      if (val) {
        addTodoToDOM(val);
      }
    });
  
    $("#create").click(createTodo);
  });