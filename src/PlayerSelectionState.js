// Player Selection Menu
var PlayerSelectionState =
{
	initialized: false,
	
	init: function()
	{
		// Reset ECS Manager
		ECSManager.reset();
		
		// Systems
		ECSManager.addSystem(Object.create(PlayerSelectionSystem));
		
		this.initialized = true;
	},
};