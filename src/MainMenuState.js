// Main Menu State
var TILE_SIZE = 64;

var MainMenuState =
{
	initialized: false,
	
	init: function()
	{
		// Reset ECS Manager
		ECSManager.reset();
		
		// Systems
		ECSManager.addSystem(Object.create(MainMenuSystem));
		
		this.initialized = true;
	},
};