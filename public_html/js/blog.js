$(function () {
    var APPLICATION_ID = "9E68C957-FE0B-B71A-FF22-960C534DBE00",
        SECRET_KEY = "754A82C5-264A-EB53-FF45-B1D1DFA6D700",
        VERSION = "v1";
        
        Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
       
        var postsCollection = Backendless.Persistence.of(Posts).find();
        
        console.log(postsCollection);
        
        var wrapper = {
            posts: postsCollection.data
        };
        
        Handlebars.registerHelper('format', function (time) {
            return moment(time).format("dddd, MMMM Do YYYY");
        });
        
        var blogScript = $("#blogs-template").html();
        var blogTemplate = Handlebars.compile(blogScript);
        var blogHTML = blogTemplate(wrapper);
        
        $('.main-container').html(blogHTML);    
        
          $(document).on('click', '.white-out-post', function(){
         var checkListScript = $("#check-done-template").html();
         var checkListTemplate = Handlebars.compile(checkListScript);
         $('.main-container').html(checkListTemplate);
     });
     
     $(document).on('click','.white-in-post', function(){
         var uncheckListScript = $("#check-done-template").html();
         var uncheckListTemplate =  Handlebars.compile(uncheckListScript);
         $('.main-container').html(uncheckListTemplate);
     });

        
        $(document).on('click', '.delete-post', function(){
           
          Backendless.Persistence.of(Posts).remove("8DD868B9-2A3B-47B9-FFD7-0F6C9EB6F300");
           
        });
        
});

function Posts (args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
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
           content: content
          // authorEmail: Backendless.UserService.getCurrentUser().email
        });
        
        dataStore.save(postObject);
        
        this.title.value = "";
        this.content.value = "";
    }
    });