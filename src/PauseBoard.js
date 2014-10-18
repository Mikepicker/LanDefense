// Pause Board (UI Object)
var PauseBoard =
{
	pos: null,
	image: null,
	width: 0,
	height: 0,
	
	alpha: 0,
	speed: 0.1,
	state: null,	// Current transition state
	
	// GameState
	gameState: null,
	
	// Buttons
	resumeButton: null,
	restartButton: null,
	quitButton: null,
	
	// Player class
	playerClass: null,
	
	// N.B. default alignment: center
	init: function(pos, width, height, image, gameState, playerClass)
	{
		this.pos = pos
		this.width = width;
		this.height = height;
		this.image = image;
		
		this.state = "hidden";
		this.gameState = gameState;
		
		this.playerClass = playerClass;
		
		// Buttons
		this.resumeButton = Object.create(ImageButton);
		this.restartButton = Object.create(ImageButton);
		this.quitButton = Object.create(ImageButton);
		this.resumeButton.init(this.pos.x + 40, this.pos.y + 250, 300, 100, "resume_button", "resume_button_sel", true);
		this.restartButton.init(this.pos.x + width - 300 - 40, this.pos.y + 250, 300, 100, "restart_button", "restart_button_sel", true);
		this.quitButton.init(this.pos.x + (width/2) - 150, this.pos.y + 350, 300, 100, "quit_button", "quit_button_sel", true);
	},
	
	update: function(dt)
	{
		// Update button positions
		this.resumeButton.x = this.pos.x + 40;
		this.resumeButton.y = this.pos.y + 250;
		this.restartButton.x = this.pos.x + this.width - 300 - 40;
		this.restartButton.y = this.pos.y + 250;
		this.quitButton.x = this.pos.x + (this.width/2) - 150;
		this.quitButton.y = this.pos.y + 350;
		this.resumeButton.update(dt);
		this.restartButton.update(dt);
		this.quitButton.update(dt);
		
		// Pause Board States
		if (this.state === "hidden")
		{
			this.resumeButton.visible = false;
			this.restartButton.visible = false;
			this.quitButton.visible = false;
			
			if (this.gameState.gamePaused)
			{
				this.state = "enter";
				this.resumeButton.visible = true;
				this.restartButton.visible = true;
				this.quitButton.visible = true;
			}
		}
		else if (this.state === "enter")
		{
			this.alpha += this.speed;
			
			if (this.alpha >= 1)
			{
				this.alpha = 1;
				this.state = "stop";
				return;
			}
		}
		else if (this.state === "stop")
		{
			// Resume Button
			if (this.resumeButton.clicked)
			{
				this.state = "exit";
				this.gameState.gamePaused = false;
			}
			
			// Restart Button
			if (this.restartButton.clicked)
			{
				ECSManager.reset();
				EntityFactory.createPlayer(this.playerClass);
				ECSManager.changeState(Object.create(MainState));
			}
			
			// Quit Button
			if (this.quitButton.clicked)
			{
				ECSManager.changeState(Object.create(MainMenuState));
				return;
			}
		}
		else if (this.state === "exit")
		{
			this.alpha -= this.speed;
			
			if (this.alpha < 0)
			{
				this.alpha = 0;
				this.state = "hidden";
				return;
			}
		}
	},
	
	draw: function()
	{
		drawingSurface.globalAlpha = this.alpha;
		this.resumeButton.alpha = this.alpha;
		this.restartButton.alpha = this.alpha;
		this.quitButton.alpha = this.alpha;
		
		// Draw image
		if (this.image)
		{
			drawingSurface.drawImage
			(
				AssetsManager.images[this.image], 
				0, 0, 
				this.width, this.height,
				Math.floor(this.pos.x), Math.floor(this.pos.y), 
				this.width, this.height
			); 
		}
		
		// Draw Text
		var textX = (this.pos.x | 0) + (this.width/2) - 250;
		var textY = 150;
		drawingSurface.drawImage
		(
			AssetsManager.images["paused_text"], 
			0, 0, 
			500, 100,
			textX, textY, 
			500, 100
		); 
		
		// Draw Buttons
		this.resumeButton.draw();
		this.restartButton.draw();
		this.quitButton.draw();
		
		drawingSurface.globalAlpha = 1;
	}
}


