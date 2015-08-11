(function() {
  var app = angular.module('Blog', []);

  app.controller('BlogLoopController', function() {
    this.posts = posts;
    this.showingPost = false;

    this.showSinglePost = function(post) {
      this.showingPost = post;
    };

    this.backToBlog = function() {
      this.showingPost = false;
    };
  });

  var posts = [
    {
      title: 'First Post',
      date: 1439215543081,
      author: 'John',
      content: 'First post content. Curabitur dictum, purus eu pulvinar maximus, leo nunc gravida ex, in elementum ante nisi at arcu. Donec auctor ipsum ex, vehicula pretium erat congue non. Proin eu venenatis erat, quis semper leo. Nunc ex ante, interdum nec magna quis, ornare consequat nunc. Phasellus rhoncus, ante id pharetra gravida, orci est eleifend augue, in laoreet nisi ligula id nisi. Quisque aliquam malesuada justo, ut tincidunt nibh.'
    },
    {
      title: 'Second Post',
      date: 1439111111111,
      author: 'Sally',
      content: 'Second post content.<h3>This is a blockquote</h3>. Ut quis enim pellentesque, consequat dui et, pulvinar nisl. In aliquam sit amet lectus vel suscipit. Aliquam venenatis mauris non odio faucibus faucibus. Vestibulum vulputate nulla sed sem rhoncus vestibulum. Curabitur justo neque, pulvinar nec mollis sit amet, pellentesque quis lorem.'
    },
  ];
})()
