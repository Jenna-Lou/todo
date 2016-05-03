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
        
        $(document).on('click', '.delete-post', function(){
           
          Backendless.Persistence.of(Posts).remove("446C26E2-1FE0-98FF-FF21-BF824D7BAD00");
           
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