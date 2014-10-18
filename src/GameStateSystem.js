// Game State
var GameStateSystem = 
{
	gameState: null,
	player: null,
	
	init: function()
	{
		// Get the Game State and Player
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE))
			{
				this.gameState = ECSManager.getComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE);
				break;
			}
			
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_PLAYER))
			{
				this.player = ECSManager.entities[i];
				break;
			}
		}
	},
	
	update: function(dt)
	{
		
	}
}