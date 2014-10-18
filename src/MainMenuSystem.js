// Main Menu System
var MainMenuSystem = 
{
	playButton: null,
	
	init: function()
	{
		// Play Button
		this.playButton = Object.create(ImageButton);
		var playButtonX = (canvas.width/2) - 150;
		var playButtonY = 300;
		AssetsManager.loadImage("play_button", "./assets/play_button.png");
		AssetsManager.loadImage("play_button_selected", "./assets/play_button_selected.png");
		this.playButton.init(playButtonX, playButtonY, 300, 100, "play_button", "play_button_selected", true);
	},
	
	update: function(dt)
	{
		// Clear canvas
		drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
		drawingSurface.fillStyle = "black";
		drawingSurface.fillRect(0, 0, canvas.width, canvas.height);
		
		// Play Board
		this.playButton.update(dt);
		this.playButton.draw();
		
		if (this.playButton.clicked)
		{
			ECSManager.reset();
			ECSManager.changeState(Object.create(PlayerSelectionState));
		}
	}
}