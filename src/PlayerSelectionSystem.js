// Player Selection System
var PlayerSelectionSystem = 
{
	warriorButton: null,
	rangerButton: null,
	wizardButton: null,
	
	init: function()
	{
		var offset = (canvas.width - (3 * 200)) / 4;
		
		// Warrior Button
		this.warriorButton = Object.create(ImageButton);
		var warriorButtonX = offset;
		var warriorButtonY = (canvas.height/2) - 100;
		
		this.warriorButton.init(warriorButtonX, warriorButtonY, 200, 200, "warrior_button", "warrior_button_selected", true);
		
		// Ranger Button
		this.rangerButton = Object.create(ImageButton);
		var rangerButtonX = (2 * offset) + 200;
		var rangerButtonY = (canvas.height/2) - 100;
		
		this.rangerButton.init(rangerButtonX, rangerButtonY, 200, 200, "ranger_button", "ranger_button_selected", true);
		
		// Wizard Button
		this.wizardButton = Object.create(ImageButton);
		var wizardButtonX = (3 * offset) + 400;
		var wizardButtonY = (canvas.height/2) - 100;
		
		this.wizardButton.init(wizardButtonX, wizardButtonY, 200, 200, "wizard_button", "wizard_button_selected", true);
	},
	
	update: function(dt)
	{
		// Draw Splash Screen
		drawingSurface.drawImage(AssetsManager.images["splash"],
								 0,0,1024,640);
		
		// Title
		drawingSurface.font = "120px gothic";
		drawingSurface.textAlign = "center";
		
		drawingSurface.fillStyle = 'rgb(0,0,0)';
		drawingSurface.fillText("LanDefense", canvas.width/2, 100);
		drawingSurface.fillStyle = 'rgb(255,255,255)';
		drawingSurface.fillText("LanDefense", canvas.width/2, 110);
		
		// Hint
		drawingSurface.font = "80px gothic";
		drawingSurface.textAlign = "center";
		
		drawingSurface.fillStyle = 'rgb(0,0,0)';
		drawingSurface.fillText("Choose your hero!", canvas.width/2, canvas.height/2 + 286);
		drawingSurface.fillStyle = 'rgb(255,255,255)';
		drawingSurface.fillText("Choose your hero!", canvas.width/2, canvas.height/2 + 280);
		
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
		
		// Buttons
		drawingSurface.drawImage(AssetsManager.images["select_shadow"],
								 this.warriorButton.x + 5,
								 this.warriorButton.y + 5);
		this.warriorButton.update(dt);
		this.warriorButton.draw();
								
		drawingSurface.drawImage(AssetsManager.images["select_shadow"],
								 this.rangerButton.x + 5,
								 this.rangerButton.y + 5);
		this.rangerButton.update(dt);
		this.rangerButton.draw();
		
		drawingSurface.drawImage(AssetsManager.images["select_shadow"],
								 this.wizardButton.x + 5,
								 this.wizardButton.y + 5);
		this.wizardButton.update(dt);
		this.wizardButton.draw();
		
		if (this.warriorButton.clicked)
		{
			ECSManager.reset();
			EntityFactory.createPlayer("warrior");
			ECSManager.changeState(Object.create(MainState));
		}
		
		else if (this.rangerButton.clicked)
		{
			ECSManager.reset();
			EntityFactory.createPlayer("ranger");
			ECSManager.changeState(Object.create(MainState));
		}
		
		else if (this.wizardButton.clicked)
		{
			ECSManager.reset();
			EntityFactory.createPlayer("wizard");
			ECSManager.changeState(Object.create(MainState));
		}
	}
}