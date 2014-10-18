// End Game Board (UI Object)
var EndGameBoard =
{
	pos: null,
	image: null,
	width: 0,
	height: 0,
	
	alpha: 0,
	speed: 0.01,
	state: null,	// Current transition state
	active: false,
	textID: null,
	
	// Buttons
	restartButton: null,
	
	// Player class
	playerClass: null,
	
	// N.B. default alignment: center
	init: function(pos, width, height, image, playerClass)
	{
		this.pos = pos
		this.width = width;
		this.height = height;
		this.image = image;
		
		this.state = "hidden";
		
		this.playerClass = playerClass;
		
		// Buttons
		this.restartButton = Object.create(ImageButton);
		
		this.restartButton.init(this.pos.x + (width/2) - 150, this.pos.y + 350, 300, 100, "restart_button", "restart_button_sel", true);
	},
	
	update: function(dt)
	{
		// Update button positions
		this.restartButton.x = this.pos.x + (this.width/2) - 150;
		this.restartButton.y = this.pos.y + 350;
		this.restartButton.update(dt);
		
		// Pause Board States
		if (this.state === "hidden")
		{
			this.restartButton.visible = false;
				
			if (this.active)
			{
				this.state = "enter";
				this.restartButton.visible = true;
			}
		}
		else if (this.state === "enter")
		{
			this.alpha += this.speed * dt;
			
			if (this.alpha >= 1)
			{
				this.alpha = 1;
				this.state = "stop";
				return;
			}
		}
		else if (this.state === "stop")
		{
			// Restart Button
			if (this.restartButton.clicked)
			{
				ECSManager.reset();
				EntityFactory.createPlayer(this.playerClass);
				ECSManager.changeState(Object.create(MainState));
			}
		}
		else if (this.state === "exit")
		{
			this.alpha -= this.speed * dt;
			
			if (this.alpha < 0)
			{
				this.alpha = 0;
				this.state = "hidden";
				this.active = false;
				return;
			}
		}
	},
	
	draw: function()
	{
		drawingSurface.globalAlpha = this.alpha;
		this.restartButton.alpha = this.alpha;
		
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
		var textX = (this.pos.x | 0) + (this.width/2) - 150;
		var textY = 200;
		drawingSurface.drawImage
		(
			AssetsManager.images[this.textID], 
			0, 0, 
			300, 100,
			textX, textY, 
			300, 100
		); 
		
		// Draw Buttons
		this.restartButton.draw();
		
		drawingSurface.globalAlpha = 1;
	}
}


