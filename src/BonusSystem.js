// Bonus System
var BonusSystem = 
{
	gameState: null,
	player: null,
	
	init: function()
	{
		// Get game state and player
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE))
			{
				this.gameState = ECSManager.getComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE);
			}
			
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_PLAYER))
			{
				this.player = ECSManager.entities[i];
			}
		}
	},
	
	update: function(dt)
	{
		var playerPos = ECSManager.getComponent(this.player, ComponentType.COMPONENT_POSITION).position;
		var playerBox = ECSManager.getComponent(this.player, ComponentType.COMPONENT_BOX);
		
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			var ent = ECSManager.entities[i];
			
			// LIFE BONUS
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_LIFEBONUS))
			{
				var entPos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var entBox = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
				
				if (Utils.rectCollision(playerPos, entPos, playerBox, entBox))
				{
					if (this.gameState.lives < this.gameState.maxLives)
						this.gameState.lives += 1;
						
					ECSManager.removeEntity(ent);
					continue;
				}
			}
			// GOLD BONUS
			else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_GOLDBONUS))
			{
				var entPos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var entBox = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
				
				if (Utils.rectCollision(playerPos, entPos, playerBox, entBox))
				{
					// Show score
					EntityFactory.createScoreBonus(entPos.x + entBox.width/2 + 16, entPos.y + entBox.height/2, CONFIG.goldBonusAmount);
					
					this.gameState.golds += CONFIG.goldBonusAmount;
					ECSManager.removeEntity(ent);
					continue;
				}
			}
			// SCORE (the score you see when you kill an enemy)
			else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_GOLDSCORE))
			{
				var entDisp =  ECSManager.getComponent(ent, ComponentType.COMPONENT_DISPLAY);
				entDisp.alpha -= 0.01;
				if (entDisp.alpha < 0)
					ECSManager.removeEntity(ent);
			}
		}
	}
}