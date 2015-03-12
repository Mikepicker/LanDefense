// Player Selection Menu
var PlayerSelectionState =
{
	initialized: false,
	
	init: function()
	{
		// Reset ECS Manager
		ECSManager.reset();
		
		SoundSystem.reset();
		
		// Systems
		ECSManager.addSystem(Object.create(PlayerSelectionSystem));
		ECSManager.addSystem(Object.create(SoundSystem));
		
		this.initialized = true;
	},
};