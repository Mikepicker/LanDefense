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
		AssetsManager.loadImage("warrior_button", "./assets/warrior_button.png");
		AssetsManager.loadImage("warrior_button_selected", "./assets/warrior_button_selected.png");
		this.warriorButton.init(warriorButtonX, warriorButtonY, 200, 200, "warrior_button", "warrior_button_selected", true);
		
		// Ranger Button
		this.rangerButton = Object.create(ImageButton);
		var rangerButtonX = (2 * offset) + 200;
		var rangerButtonY = (canvas.height/2) - 100;
		AssetsManager.loadImage("ranger_button", "./assets/ranger_button.png");
		AssetsManager.loadImage("ranger_button_selected", "./assets/ranger_button_selected.png");
		this.rangerButton.init(rangerButtonX, rangerButtonY, 200, 200, "ranger_button", "ranger_button_selected", true);
		
		// Wizard Button
		this.wizardButton = Object.create(ImageButton);
		var wizardButtonX = (3 * offset) + 400;
		var wizardButtonY = (canvas.height/2) - 100;
		AssetsManager.loadImage("wizard_button", "./assets/wizard_button.png");
		AssetsManager.loadImage("wizard_button_selected", "./assets/wizard_button_selected.png");
		this.wizardButton.init(wizardButtonX, wizardButtonY, 200, 200, "wizard_button", "wizard_button_selected", true);
	},
	
	update: function(dt)
	{
		// Clear canvas
		drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
		drawingSurface.fillRect(0, 0, canvas.width, canvas.height);
		
		// Buttons
		this.warriorButton.update(dt);
		this.warriorButton.draw();
		
		this.rangerButton.update(dt);
		this.rangerButton.draw();
		
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