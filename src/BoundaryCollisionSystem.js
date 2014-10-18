// Boundary Collisions System
var BoundaryCollisionSystem = 
{
	map: null,
	gameState: null,
	
	init: function()
	{
		// Get the map
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_MAP))
			{
				this.map = ECSManager.entities[i];
			}
			
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE))
			{
				this.gameState = ECSManager.getComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE);
			}
		}
	},
	
	update: function(dt)
	{
		
		// Check collision for each game entity
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			var ent = ECSManager.entities[i];
			
			// No boundary collisions for missiles
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MISSILE))
				continue;
				
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_POSITION) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOTION) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_BOX))
			{
				var entPos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var entBox = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
				var entMot = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
				var mapPos = ECSManager.getComponent(this.map, ComponentType.COMPONENT_POSITION).position;
				var mapBox = ECSManager.getComponent(this.map, ComponentType.COMPONENT_BOX);
				
				var boundaryHit = false;
				
				// Player can't go out of map bounds
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_PLAYER))
				{
					var control = ECSManager.getComponent(ent, ComponentType.COMPONENT_KEYBOARD);
					
					if (entPos.x <= mapPos.x)
					{
						entPos.x = mapPos.x;
						boundaryHit = true;
					}
				
					if (entPos.x + entBox.width >= mapPos.x + mapBox.width)
					{
						entPos.x = mapPos.x + mapBox.width - entBox.width;
						boundaryHit = true;
					}
				}
				else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_ENEMY))
				{
					// Delete entities that go out of map left bound
					if (entPos.x + entBox.width <= 0)
					{
						if (this.gameState.lives > 0)
							this.gameState.lives--;
						
						this.gameState.enemiesAlive--;
						ECSManager.removeEntity(ent);
						continue;
					}
				}
				else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_SCENEOBJECT))
				{
					if (entPos.y >= mapPos.y + mapBox.height + 1000)
					{
						entPos.y = mapPos.y + mapBox.height - entBox.height;
						ECSManager.removeEntity(ent);
					}
					
					continue;
				}
				
				if (entPos.y <= mapPos.y)
				{
					entPos.y = mapPos.y;
					boundaryHit = true;
				}
				
				if (entPos.y + entBox.height >= mapPos.y + mapBox.height)
				{
					entPos.y = mapPos.y + mapBox.height - entBox.height;
					boundaryHit = true;
				}
				
				// Stop player if hits boundary
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_PLAYER) && 
					ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOVETOLOCATION) &&
					!ECSManager.hasComponent(ent, ComponentType.COMPONENT_RESPAWN) && boundaryHit)
				{
					GameEntitySystem.toIdleState(ent);
				}
			}
		}
	}
}