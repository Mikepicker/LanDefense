// Loading Menu
var LoadingState =
{
	initialized: false,
	
	init: function()
	{
		// Reset ECS Manager
		ECSManager.reset();
		
		// Systems
		ECSManager.addSystem(Object.create(LoadingSystem));
		
		this.initialized = true;
	},
};