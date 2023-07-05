class StateChange{
  constructor(){
    this.title = createElement('h1');
    this.playButton = createButton('PLAY');
    this.infoButton = createButton('INFO');
    this.backstory = createElement('h3')
  }

  display(){
    this.title.position(windowWidth/2-250,windowHeight/2 - 300);
    this.title.html("CLONE ESCAPE");
    this.title.class("gameTitle");
    this.playButton.position(windowWidth/2-300,windowHeight/2-50);
    this.playButton.class("customButton");
    this.infoButton.position(windowWidth/2+200,windowHeight/2-50);
    this.infoButton.class("customButton");
    this.infoButton.mousePressed(()=>{
      this.showInfo()
    })
    this.playButton.mousePressed(()=>{
      gameState="play";
      this.playButton.hide();
      this.infoButton.hide();
      this.backstory.hide();
      this.title.hide();
    })
  }

  showInfo(){
    var message = `The turtle gets captured by ghosts and wants to 
    make it to sea. \n 
    You will have to get past the ghosts and eat kale to replenish your hunger bar.`
    this.backstory.html(message)
    this.backstory.class("leadersText");
    this.backstory.position(windowWidth/2-800, windowHeight/2);
  }
}