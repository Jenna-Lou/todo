$(function () {
    var APPLICATION_ID = "9E68C957-FE0B-B71A-FF22-960C534DBE00",
            SECRET_KEY = "754A82C5-264A-EB53-FF45-B1D1DFA6D700",
            VERSION = "v1";

    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    
    Backendless.UserService.logout();
    if(Backendless.UserService.isValidLogin()){
        userLoggedIn(Backendless.LocalCache.get("current-user-id"));
    } else {    
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);
    }

    $(document).on('submit', '.form-signin',  function(event){
        event.preventDefault();
        
        var data = $(this).serializeArray(),
            email = data[0].value,
            password = data[1].value;
            
        Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, gotError));    
    });
    
    $(document).on('click', '.add-blog', function(){
        var addBlogScript = $("#add-blog-template").html();
        var addBlogTemplate = Handlebars.compile(addBlogScript);
    
        $('.main-container').html(addBlogTemplate);
    });
    $(document).on('submit', '.form-add-blog', function(event){
        event.preventDefault();
        
        var data = $(this).serializeArray(),
            title = data[0].value,
            content = data[1].value;
            
            if (content === "" || title ===""){
                Materialize.toast('Cannot leave title or content empty!', 4000);
            }
            else{
        var dataStore = Backendless.Persistence.of(Posts);
        
        var postObject = new Posts({
           title: title,
           content: content,
           authorEmail: Backendless.UserService.getCurrentUser().email
        });
        
        dataStore.save(postObject);
        
        this.title.value = "";
        this.content.value = "";
    }
    });
    
    $(document).on('click', '.logout', function(){
       Backendless.UserService.logout(new Backendless.Async(userLoggedOut, gotError)); 
       
       var loginScript = $("#login-template").html();
       var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);
    });
});

function Posts(args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}

function userLoggedIn(user) {
    console.log("user succsessfully logged in");
    var userData;
    if(typeof user === "string") {
        userData = Backendless.Data.of(Backendless.User).findById(user);
    } else {
        userData = user;
    }
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(userData);
    
    $('.main-container').html(welcomeHTML);
}
function userLoggedOut(){
    console.log("successfully logged out");
}

function gotError(error) {
    console.log("Error message - " + error.message);
    console.log("Error code - " + error.code);
    Materialize.toast('Incorrect!', 4000);
}

$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );