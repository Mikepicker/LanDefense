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
					
					// Play Sound
					SoundSystem.playSound("life",1,1,0);
					
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
					var goldsFound = Math.floor((Math.random() * 100) + 50);
					
					// Show score
					EntityFactory.createScoreBonus(entPos.x + entBox.width/2 + 16, entPos.y + entBox.height/2, goldsFound);
					
					this.gameState.golds += goldsFound;
					ECSManager.removeEntity(ent);
					
					// Play Sound
					SoundSystem.playSound("gold",1,1,0);
		
					continue;
				}
			}
			// HEAL POTION
			else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_HEALPOTION))
			{
				var entPos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var entBox = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
				var plGE = ECSManager.getComponent(this.player, ComponentType.COMPONENT_GAMEENTITY);
				
				if (Utils.rectCollision(playerPos, entPos, playerBox, entBox))
				{
					var healthFound = Math.floor((Math.random() * 500) + 100);
					
					plGE.health += healthFound;
					
					// Check for max health
					if (plGE.health > plGE.maxHealth)
						plGE.health = plGE.maxHealth;
						
					ECSManager.removeEntity(ent);
					
					// Play Sound
					SoundSystem.playSound("potion",1,1,0);
					
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