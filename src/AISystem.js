// AISystem
var AISystem =
{
	player: null,
	
	init: function()
	{
		// Get player
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_PLAYER))
			{
				this.player = ECSManager.entities[i];
			}
		}
	},
	
	update: function(dt)
	{
		// Player auto target
		this.playerAutoTarget();
		
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			var ent = ECSManager.entities[i];
			
			// Skip if entity is freeze or it received an impulse
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_DEAD) ||
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_FREEZE) ||
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_IMPULSE))
				continue;
				
			if (this.checkComponents(ent))
			{
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_REINFORCEMENTAI))
					this.handleReinforcementAI(ent);
				else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_STANDARDENEMYAI))
					this.handleStandardEnemyAI(ent);
				else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_AGGRESSIVEAI))
					this.handleAggressiveAI(ent);
				else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_ELUSIVEAI))
					this.handleElusiveAI(ent);
			}
		}
	},
	
	playerAutoTarget: function()
	{
		// Get components
		var gameEntity = ECSManager.getComponent(this.player, ComponentType.COMPONENT_GAMEENTITY);
		var position = ECSManager.getComponent(this.player, ComponentType.COMPONENT_POSITION).position;
		
		if (!ECSManager.hasComponent(this.player, ComponentType.COMPONENT_DEAD) &&
			!ECSManager.hasComponent(this.player, ComponentType.COMPONENT_RANGEATTACKER) &&
			!ECSManager.hasComponent(this.player, ComponentType.COMPONENT_MELEEATTACKER) &&
			!ECSManager.hasComponent(this.player, ComponentType.COMPONENT_MOVETOLOCATION) &&
			!ECSManager.hasComponent(this.player, ComponentType.COMPONENT_SEEKENTITY) &&
			!ECSManager.hasComponent(this.player, ComponentType.COMPONENT_EARTHSTRIKE) &&
			!ECSManager.hasComponent(this.player, ComponentType.COMPONENT_MULTIPLEARROWS) &&
			!ECSManager.hasComponent(this.player, ComponentType.COMPONENT_FROZENRAIN))
		{
			for (var j = 0; j < ECSManager.entities.length; j++)
			{
				var enemy = ECSManager.entities[j];
				
				if (this.checkComponents(enemy) && this.areEnemy(this.player, enemy))
				{
					// Get Enemy components
					var enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
					var enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
					
					// Check if enemy is inside the playing area
					if (enemyPos.x > 30 * TILE_SIZE)
						continue;
	
					if (gameEntity.quiver)
					{
						// If Enemy is close.. chase and attack him
						currPosToEnemy = Object.create(Vector2);
						currPosToEnemy.set((enemyPos.x + enemyBox.width/2) - position.x, (enemyPos.y + enemyBox.height/2) - position.y);
						
						if (currPosToEnemy.length() <= 800)
						{
							GameEntitySystem.toRangeAttackState(this.player, enemy);
							return;
						}
					}
				}
			}
		}
	},
	
	handleReinforcementAI: function(ent)
	{
		// Don't do anything if entity is attacking
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MELEEATTACKER) ||
			ECSManager.hasComponent(ent, ComponentType.COMPONENT_RANGEATTACKER))
			return;
		
		// Get components
		var aiComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_REINFORCEMENTAI);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		var reinf = ECSManager.getComponent(ent, ComponentType.COMPONENT_REINFORCEMENT);
		
		// Get center position of the entity
		var centerPos = Object.create(Vector2);
		centerPos.set(position.x + box.width/2, position.y + box.height/2);
		
		for (var j = 0; j < ECSManager.entities.length; j++)
		{
			var enemy = ECSManager.entities[j];
			
			if (this.checkComponents(enemy) && this.areEnemy(ent, enemy))
			{
				// Get Enemy components
				var enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
				var enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
				
				// Distance to Enemy
				var distToEnemy = Object.create(Vector2);
				distToEnemy.set((enemyPos.x + enemyBox.width/2) - reinf.position.x, (enemyPos.y + enemyBox.height/2) - reinf.position.y);
				
				if (!ECSManager.hasComponent(ent, ComponentType.COMPONENT_SEEKENTITY) &&
					!ECSManager.hasComponent(ent, ComponentType.COMPONENT_MELEEATTACKER))
				{
					// If Enemy is close.. chase and attack him
					if (distToEnemy.length() <= aiComp.fov)
					{
						GameEntitySystem.toChaseEnemyState(ent, enemy);
						return;
					}
				}
				
				// Shoot enemy if this entity is capable of shooting
				if (gameEntity.quiver)
				{
					// If Enemy is close.. chase and attack him
					currPosToEnemy = Object.create(Vector2);
					currPosToEnemy.set((enemyPos.x + enemyBox.width/2) - position.x, (enemyPos.y + enemyBox.height/2) - position.y);
					
					if (currPosToEnemy.length() >= aiComp.fov && currPosToEnemy.length() <= 600)
					{
						GameEntitySystem.toRangeAttackState(ent, enemy);
						return;
					}
				}
			}
		}
		
		var distToLastPos = Object.create(Vector2);
		distToLastPos.set(centerPos.x - reinf.position.x, centerPos.y - reinf.position.y);
			
		// Stop chasing if Enemy goes too far or is dead
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_SEEKENTITY))
		{
			var seekEntityComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_SEEKENTITY);
			
			if (ECSManager.hasComponent(seekEntityComp.targetEntity, ComponentType.COMPONENT_DEAD) || distToLastPos.length() > aiComp.chaseRange)
			{
				GameEntitySystem.toMoveToLocationState(ent, reinf.position);
			}
		}
		
		// Move to target position if thrown far (explosion?)
		if (!ECSManager.hasComponent(ent, ComponentType.COMPONENT_SEEKENTITY) &&
			!ECSManager.hasComponent(ent, ComponentType.COMPONENT_MELEEATTACKER) &&
			!ECSManager.hasComponent(ent, ComponentType.COMPONENT_RANGEATTACKER) &&
			distToLastPos.length() > 1)
		{
			GameEntitySystem.toMoveToLocationState(ent, reinf.position);
			gameEntity.orientation = "right";
			return;
		}
	},
	
	handleStandardEnemyAI: function(ent)
	{
		// Don't do anything if entity is attacking
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MELEEATTACKER))
			return;
			
		for (var j = 0; j < ECSManager.entities.length; j++)
		{
			var enemy = ECSManager.entities[j];
			
			if (this.checkComponents(enemy) && this.areEnemy(ent, enemy))
			{
				// Get components
				var aiComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_STANDARDENEMYAI);
				var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
				var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
				var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
				var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
				
				// Get Enemy components
				var enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
				var enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
					
				// Get center position of the entity
				var centerPos = Object.create(Vector2);
				centerPos.set(position.x + box.width/2, position.y + box.height/2);
				
				// Distance to Enemy
				var distToEnemy = Object.create(Vector2);
				distToEnemy.set((enemyPos.x + enemyBox.width/2) - centerPos.x, (enemyPos.y + enemyBox.height/2) - centerPos.y);
						
				// Stop chasing if Enemy goes too far
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_SEEKENTITY))
				{
					var distToLastPos = Object.create(Vector2);
					distToLastPos.set(centerPos.x - aiComp.lastPos.x, centerPos.y - aiComp.lastPos.y);
					
					if (distToLastPos.length() > aiComp.chaseRange)
					{
						// Resume traveling
						var targetPos = Object.create(Vector2);
						targetPos.set(-100, position.y);
						GameEntitySystem.toMoveToLocationState(ent, targetPos);
					}
				}
				else
				{
					// Shoot enemy if this entity is capable of shooting
					if (gameEntity.quiver)
					{
						// Stop shooting if target is too far
						if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_RANGEATTACKER))
						{
							var rangeAttackComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_RANGEATTACKER);
							var currTarget = rangeAttackComp.targetEntity;
							var currTargetPos = ECSManager.getComponent(currTarget, ComponentType.COMPONENT_POSITION).position;
							var currTargetBox = ECSManager.getComponent(currTarget, ComponentType.COMPONENT_BOX);
							
							currPosToEnemy = Object.create(Vector2);
							currPosToEnemy.set((currTargetPos.x + currTargetBox.width/2) - position.x, (currTargetPos.y + currTargetBox.height/2) - position.y);
						
							if (currPosToEnemy.length() > aiComp.fov)
								ECSManager.detachComponent(ComponentType.COMPONENT_RANGEATTACKER, ent);
							
							return;
						}
						
						// Consider current (possible) target
						currPosToEnemy = Object.create(Vector2);
						currPosToEnemy.set((enemyPos.x + enemyBox.width/2) - position.x, (enemyPos.y + enemyBox.height/2) - position.y);
						
						if (currPosToEnemy.length() <= aiComp.fov)
						{
							GameEntitySystem.toRangeAttackState(ent, enemy);
							return;
						}
					}
				
					// If Enemy is close.. chase and attack him
					if (gameEntity.meleeWeapon !== null && distToEnemy.length() <= aiComp.fov)
					{
						aiComp.lastPos = Object.create(centerPos);
						GameEntitySystem.toChaseEnemyState(ent, enemy);
					}
				}
			}
		}
		
		if (!ECSManager.hasComponent(ent, ComponentType.COMPONENT_SEEKENTITY) &&
			!ECSManager.hasComponent(ent, ComponentType.COMPONENT_MELEEATTACKER) &&
			!ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOVETOLOCATION))
		{
			var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
			
			// Resume traveling
			var targetPos = Object.create(Vector2);
			targetPos.set(-100, position.y);
			GameEntitySystem.toMoveToLocationState(ent, targetPos);
		}
	},
	
	handleAggressiveAI: function(ent)
	{
		// Don't do anything if entity is attacking
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MELEEATTACKER))
			return;
			
		var aiComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_STANDARDENEMYAI);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
				
				
		// Get Player components
		var playerPos = ECSManager.getComponent(this.player, ComponentType.COMPONENT_POSITION).position;
		var playerBox = ECSManager.getComponent(this.player, ComponentType.COMPONENT_BOX);
			
		// Get center position of the entity
		var centerPos = Object.create(Vector2);
		centerPos.set(position.x + box.width/2, position.y + box.height/2);
				
		// Distance to Player
		var distToPlayer = Object.create(Vector2);
		distToPlayer.set((playerPos.x + playerBox.width/2) - centerPos.x, (playerPos.y + playerBox.height/2) - centerPos.y);
				
		// Stop chasing if Player dies
		if (ECSManager.hasComponent(this.player, ComponentType.COMPONENT_DEAD))
		{
			// Resume traveling
			var targetPos = Object.create(Vector2);
			targetPos.set(-100, position.y);
			GameEntitySystem.toMoveToLocationState(ent, targetPos);
		}
		else // Chase player
		{
			GameEntitySystem.toChaseEnemyState(ent, this.player);
		}
	},
	
	handleElusiveAI: function(ent)
	{
		if (!ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOVETOLOCATION))
		{
			var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
			
			// Resume traveling
			var targetPos = Object.create(Vector2);
			targetPos.set(-100, position.y);
			GameEntitySystem.toMoveToLocationState(ent, targetPos);
		}
	},
	
	checkComponents: function(ent)
	{
		return ECSManager.hasComponent(ent, ComponentType.COMPONENT_GAMEENTITY) &&
			   ECSManager.hasComponent(ent, ComponentType.COMPONENT_POSITION) &&
			   ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOTION) &&
			   ECSManager.hasComponent(ent, ComponentType.COMPONENT_ANIMATION) &&
			   !ECSManager.hasComponent(ent, ComponentType.COMPONENT_DEAD);
	},
	
	areEnemy: function(e1, e2)
	{
		return ((ECSManager.hasComponent(e1, ComponentType.COMPONENT_ALLIED) && ECSManager.hasComponent(e2, ComponentType.COMPONENT_ENEMY)) ||
			   (ECSManager.hasComponent(e2, ComponentType.COMPONENT_ALLIED) && ECSManager.hasComponent(e1, ComponentType.COMPONENT_ENEMY)));
	}
}
