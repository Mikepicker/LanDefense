// Main Menu System
var MainMenuSystem = 
{
	playButton: null,
	
	init: function()
	{
		// Play Button
		this.playButton = Object.create(ImageButton);
		var playButtonX = (canvas.width/2) - 150;
		var playButtonY = 430;
		this.playButton.init(playButtonX, playButtonY, 300, 100, "play_button", "play_button_selected", true);
	},
	
	update: function(dt)
	{
		// Draw Splash Screen
		drawingSurface.drawImage(AssetsManager.images["splash"],
								 0,0,1024,640);
		
		// Play Board
		this.playButton.update(dt);
		this.playButton.draw();
		
		if (this.playButton.clicked)
		{
			ECSManager.reset();
			ECSManager.changeState(Object.create(PlayerSelectionState));
		}
		
		// Display highest score
		var currHighScore = 0;
		if (localStorage.high_score)
			currHighScore = parseInt(localStorage.getItem("high_score"));
			
		drawingSurface.font = "120px gothic";
		drawingSurface.textAlign = "center";
		
		// Title
		drawingSurface.fillStyle = 'rgb(0,0,0)';
		drawingSurface.fillText("LanDefense", canvas.width/2, 100);
		drawingSurface.fillStyle = 'rgb(255,255,255)';
		drawingSurface.fillText("LanDefense", canvas.width/2, 110);
		
		// Score
		drawingSurface.font = "80px gothic";
		
		drawingSurface.fillStyle = 'rgb(0,0,0)';
		drawingSurface.fillText("high score: " + currHighScore, canvas.width/2, canvas.height/2 + 286);
		drawingSurface.fillStyle = 'rgb(255,255,255)';
		drawingSurface.fillText("high score: " + currHighScore, canvas.width/2, canvas.height/2 + 280);
		
		// Credits
		drawingSurface.textAlign = "left";
		drawingSurface.font = "18px Comic Sans MS";
		drawingSurface.fillStyle = 'rgb(0,0,0)';
		drawingSurface.fillText("Twitter: @Mikepicker", 10, canvas.height/2 + 312);
		drawingSurface.fillStyle = 'rgb(255,255,255)';
		drawingSurface.fillText("Twitter: @Mikepicker", 10, canvas.height/2 + 310);
		
		drawingSurface.textAlign = "left";
		drawingSurface.font = "18px Comic Sans MS";
		drawingSurface.fillStyle = 'rgb(0,0,0)';
		drawingSurface.fillText("Credits: Michele Rullo, Giada Gallinari", 700, canvas.height/2 + 312);
		drawingSurface.fillStyle = 'rgb(255,255,255)';
		drawingSurface.fillText("Credits: Michele Rullo, Giada Gallinari", 700, canvas.height/2 + 310);
	}
}