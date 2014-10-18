// Control System
var keyPressed={};

var ControlSystem = 
{
	map: null,
	camera: null,
	gameState: null,
	
	init: function()
	{
		window.addEventListener("keydown", function(event)
		{
			keyPressed[event.keyCode] = true;
			event.preventDefault(); // Disable window scrolling with arrow keys
		}, false);
		
		window.addEventListener("keyup", function(event)
		{
			keyPressed[event.keyCode] = false;
			event.preventDefault(); // Disable window scrolling with arrow keys
		}, false);
		
		// Get map and camera
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_MAP))
			{
				this.map = ECSManager.getComponent(ECSManager.entities[i], ComponentType.COMPONENT_MAP);
			}
			
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_CAMERA))
			{
				this.camera = ECSManager.entities[i];
			}
			
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE))
			{
				this.gameState = ECSManager.getComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE);
			}
		}
	},
	
	update: function(dt)
	{
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			var ent = ECSManager.entities[i];
			
			// Toggle game paused
			if (keyPressed[KeyboardKeys.PAUSE])
			{
				this.gameState.gamePaused = !this.gameState.gamePaused;
				keyPressed[KeyboardKeys.PAUSE] = false;
			}
				
			// Movement
			if (this.checkComponents(ent))
			{
				var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
				var pos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
				var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
				var control = ECSManager.getComponent(ent, ComponentType.COMPONENT_KEYBOARD);
				var cameraPos = ECSManager.getComponent(this.camera, ComponentType.COMPONENT_POSITION).position;
					
				// Mouse events:
				// 1 click on enemy -> range attack
				// 2 clicks on enemy -> chase and melee attack
				// 1 click on ground -> move to point
				if (UISystem.CLICKED || ECSManager.hasComponent(ent, ComponentType.COMPONENT_RESPAWN))
					return;
					
				if (MOUSE_CLICKED || TOUCH_TAP)
				{
					var offsetX, offsetY;
					
					if (MOUSE_CLICKED)
					{
						offsetX = MOUSE_X;
						offsetY = MOUSE_Y;
					}
					else if (TOUCH_TAP)
					{
						offsetX = TOUCH_X;
						offsetY = TOUCH_Y;
					}
					
					MOUSE_CLICKED = false;
					TOUCH_TAP = false;
					
					var clickedPos = Object.create(Vector2);
					clickedPos.set(cameraPos.x + offsetX, cameraPos.y + offsetY);
					
					// If player clicks on an enemy, his character will shoot
					var enemy = GameEntitySystem.getEnemyInPosition(clickedPos, this.map);
					
					if (enemy)	// If there is an enemy player has to shoot him
					{
						this.gameState.selectedEntity = enemy;
							
						// If player is already shooting the enemy and the user clicks again
						// -> chase enemy and attack
						if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_RANGEATTACKER))
						{
							var rangeComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_RANGEATTACKER);
							
							if (rangeComp.targetEntity.ID === enemy.ID)
							{
								GameEntitySystem.toChaseEnemyState(ent, enemy);
							}
							else
								rangeComp.targetEntity = enemy;
						}
						else
						{
							GameEntitySystem.toRangeAttackState(ent, enemy);
						}
					}
					else	// Otherwise it has to move toward that point
					{
						var targetPos = Object.create(Vector2);
						targetPos.set(cameraPos.x + offsetX, cameraPos.y + offsetY);
						GameEntitySystem.toMoveToLocationState(ent, targetPos);
						
						// Red Cross to mark position
						EntityFactory.createRedCross(targetPos);
					}
				}
			}
		}
	},
	
	checkComponents: function(ent)
	{
		return  !ECSManager.hasComponent(ent, ComponentType.COMPONENT_DEAD) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_GAMEENTITY) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_POSITION) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_KEYBOARD) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOTION) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_ANIMATION) &&
				!ECSManager.hasComponent(ent, ComponentType.COMPONENT_EARTHSTRIKE) &&
				!ECSManager.hasComponent(ent, ComponentType.COMPONENT_MULTIPLEARROWS);
	}
}