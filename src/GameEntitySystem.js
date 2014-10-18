// Logic for game entities
var GameEntitySystem = 
{
	map: null,
	camera: null,
	gameState: null,
	player: null,
	
	init: function()
	{
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
			
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_PLAYER))
			{
				this.player = ECSManager.entities[i];
			}
		}
	},
	
	// Implementing Player Finite State Machine
	update: function(dt)
	{
		if (this.gameState.gamePaused)
			return;
			
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			var ent = ECSManager.entities[i];
			
			if (!this.checkComponents(ent))
				continue;
				
			var pos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
			var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
			var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
			var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
			var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
			
			// Handle player regeneration
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_PLAYER) &&
				!ECSManager.hasComponent(ent, ComponentType.COMPONENT_DEAD))
			{
				var playerComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_PLAYER);
				
				if (playerComp.regenTimer >= playerComp.regenTime)
				{
					gameEntity.health += CONFIG.playerRegenRate;
					if (gameEntity.health >= gameEntity.maxHealth)
						gameEntity.health = gameEntity.maxHealth;
					
					playerComp.regenTimer = 0;
				}
				else
					playerComp.regenTimer += dt;
			}
			
			// Handle entities who have been hit
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_HIT))
			{
				this.handleHitEntity(ent, dt);
			}
			
			// Handle entities who are dying
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_DEAD))
			{
				this.handleDeadEntity(ent, dt);
				continue;
			}
			
			// Skip if entity received an impulse
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_IMPULSE))
			{
				AnimationSystem.changeAnimation(ent, anim.animationData["walking_" + gameEntity.orientation], false);
				continue;
			}
			
			// Skip if entity is FROZEN
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_FROZEN))
			{
				motion.velocity.set(0,0);
				var frozenComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_FROZEN);
				if (frozenComp.timer >= frozenComp.time)
					ECSManager.detachComponent(ComponentType.COMPONENT_FROZEN, ent);
				else
				{
					if (frozenComp.timer >= frozenComp.damageStep * 1000)
					{
						var hitComp = Object.create(HitComponent);
						hitComp.damage = frozenComp.damageOverTime;
						ECSManager.attachComponent(hitComp, ent);
						frozenComp.damageStep++;
					}
					
					frozenComp.timer += dt;
					continue;
				}
			}
			
			// Skip if entity is burning
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_BURN))
			{
				this.handleBurningEntity(ent, dt);
			}
			
			// Handle Player Respawn
			if (this.isPlayer(ent) && ECSManager.hasComponent(ent, ComponentType.COMPONENT_RESPAWN) &&
				!ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOVETOLOCATION))
			{
				var targetPos = Object.create(Vector2);
				targetPos.set(100, pos.y + box.width/2);
				this.toMoveToLocationState(ent, targetPos);
			}
			
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_RANGEATTACKER))		// Entity has to shoot
			{
				this.rangeAttack(ent);
			}
			
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MELEEATTACKER))
			{
				this.meleeAttack(ent);
			}
			
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_SEEKENTITY))
			{
				this.seekEntity(ent);
			}
			
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOVETOLOCATION))	// Entity has to move
			{
				this.moveToLocation(ent);
			}
			
			// Shooting Cooldown
			if (gameEntity.shootingTimer <= 0)
			{
				gameEntity.shootingTimer = 0;
			}
			else
				gameEntity.shootingTimer -= dt;
				
			// Reinforcement always look to the right
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_REINFORCEMENT))
				gameEntity.orientation = "right";
		}
	},
	
	handleDeadEntity: function(ent, dt)
	{
		var pos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var display = ECSManager.getComponent(ent, ComponentType.COMPONENT_DISPLAY);
		var deadComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_DEAD);
				
		display.alpha = 1 - (deadComp.fadeTimer / deadComp.fadeTime);
			
		if (display.alpha <= 0)
		{
			display.alpha = 0;
			
			// Respawn player if dead
			if (this.isPlayer(ent))
			{
				ECSManager.attachComponent(Object.create(RespawnComponent), ent);
				gameEntity.health = gameEntity.maxHealth;
				display.alpha = 1;
				pos.set(-box.width, 320);
				ECSManager.detachComponent(ComponentType.COMPONENT_DEAD, ent);
				ECSManager.detachComponent(ComponentType.COMPONENT_SEEKENTITY, ent);
				ECSManager.detachComponent(ComponentType.COMPONENT_MELEEATTACKER, ent);
				ECSManager.detachComponent(ComponentType.COMPONENT_RANGEATTACKER, ent);
				ECSManager.detachComponent(ComponentType.COMPONENT_MOVETOLOCATION, ent);
			}
			else
			{
				// Spawn random bonus
				if (Math.random() >= 0.9)
				{
					if (Math.random() >= 0.7)
					{
						if (this.gameState.lives < this.gameState.maxLives)
							EntityFactory.createLifeBonus(pos.x + box.width/2, pos.y + box.height);
					}
					else
						EntityFactory.createGoldBonus(pos.x + box.width/2, pos.y + box.height);
				}
				
				ECSManager.removeEntity(ent);
			}
			
			return;
		}
		
		deadComp.fadeTimer += dt;
	},
	
	handleHitEntity: function(ent, dt)
	{
		var hitComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_HIT);
		if (hitComp.timer >= hitComp.time)
			ECSManager.detachComponent(ComponentType.COMPONENT_HIT, ent);
		else
			hitComp.timer += dt;
			
		// Apply damage
		if (!hitComp.damageApplied)
		{
			hitComp.damageApplied = true;
			
			var entGE = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
			entGE.health -= hitComp.damage;
			
			if (entGE.health <= 0)
			{
				var deadComp = Object.create(DeadComponent);
				ECSManager.attachComponent(deadComp, ent);
				
				// Increase golds if it's an enemy
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_ENEMY))
				{
					var entPos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
					var entBox = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
					enemyComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_ENEMY);
					
					this.gameState.golds += enemyComp.golds;
					this.gameState.enemiesAlive--;
					
					// Show score
					EntityFactory.createScoreBonus(entPos.x + entBox.width/2 + 16, entPos.y + entBox.height/2, enemyComp.golds);
				}
				
				// Spawn zombie if the attacker is infected ;)
				if (ECSManager.hasComponent(hitComp.attacker, ComponentType.COMPONENT_VIRUST))
				{
					var entPos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
					var entBox = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
					EntityFactory.createZombie(entPos.x + entBox.width/2, entPos.y + entBox.height/2, "enemy");
					this.gameState.enemiesAlive++;
				}
			}
		}
	},
	
	handleBurningEntity: function(ent, dt)
	{
		var burnComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_BURN);
		if (burnComp.timer >= burnComp.time)
			ECSManager.detachComponent(ComponentType.COMPONENT_BURN, ent);
		else
		{
			if (burnComp.timer >= burnComp.damageStep * 1000)
			{
				var hitComp = Object.create(HitComponent);
				hitComp.damage = burnComp.damageOverTime;
				ECSManager.attachComponent(hitComp, ent);
				burnComp.damageStep++;
			}
			
			burnComp.timer += dt;
		}
		
		// Burn nearby entities
		var entPos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var entBox = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		
		// Top-Left Corner
		var tlCol = Math.floor(entPos.y / this.map.tileSize);
		var tlRow = Math.floor(entPos.x / this.map.tileSize);

		// Bottom-Right Corner
		var brCol = Math.floor((entPos.y + entBox.height) / this.map.tileSize);
		var brRow = Math.floor((entPos.x + entBox.width) / this.map.tileSize);
		
		// Clamp
		tlRow = Math.min(Math.max(tlRow, 0), this.map.tiles.length-1);
		tlCol = Math.min(Math.max(tlCol, 0), this.map.tiles[0].length-1);
		brRow = Math.min(Math.max(brRow, 0), this.map.tiles.length-1);
		brCol = Math.min(Math.max(brCol, 0), this.map.tiles[0].length-1);

		for (var col = tlRow; col <= brRow; col++)
		{
			for (var row = tlCol; row <= brCol; row++)
			{
				var entitiesInTile = this.map.tiles[col][row].entities;
				for (var i = 0; i < entitiesInTile.length; i++)
				{ 
					if (entitiesInTile[i] !== ent && 
						ECSManager.hasComponent(entitiesInTile[i], ComponentType.COMPONENT_GAMEENTITY) &&
						!ECSManager.hasComponent(entitiesInTile[i], ComponentType.COMPONENT_DEAD) &&
						!ECSManager.hasComponent(entitiesInTile[i], ComponentType.COMPONENT_BURN) &&
						!(ECSManager.hasComponent(ent, ComponentType.COMPONENT_ALLIED) &&
						ECSManager.hasComponent(entitiesInTile[i], ComponentType.COMPONENT_ALLIED)))
					{
						var enemyPos = ECSManager.getComponent(entitiesInTile[i], ComponentType.COMPONENT_POSITION).position;
						var enemyBox = ECSManager.getComponent(entitiesInTile[i], ComponentType.COMPONENT_BOX);
						
						if (Utils.rectCollision(entPos, enemyPos, entBox, enemyBox))
						{
							var newBurnComp = Object.create(BurnComponent);
							newBurnComp.damageOverTime = burnComp.damageOverTime;
							newBurnComp.time = burnComp.time;
							ECSManager.attachComponent(newBurnComp, entitiesInTile[i]);
						}
					}
				}
			}
		}
	},
	
	rangeAttack: function(ent)
	{
		var enemy = ECSManager.getComponent(ent, ComponentType.COMPONENT_RANGEATTACKER).targetEntity;
		
		var pos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		var rangeComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_RANGEATTACKER);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		
			
		// Detach component if enemy is dead
		if (ECSManager.hasComponent(enemy, ComponentType.COMPONENT_GAMEENTITY) &&
			ECSManager.hasComponent(enemy, ComponentType.COMPONENT_POSITION) &&
			ECSManager.hasComponent(enemy, ComponentType.COMPONENT_BOX))
		{
			var enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
			var enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
			var enemyGE = ECSManager.getComponent(enemy, ComponentType.COMPONENT_GAMEENTITY);
			
			// Heading
			if (enemyPos.x + enemyBox.width/2 < pos.x + box.width/2)
			{
				gameEntity.orientation = "left";
			}
			else
				gameEntity.orientation = "right";
			
			// If enemy is close, attack him
			if (Utils.rectCollision(pos, enemyPos, box, enemyBox))
			{
				motion.velocity.set(0,0);
				
				// Check for weapon
				if (gameEntity.meleeWeapon && ECSManager.hasComponent(gameEntity.meleeWeapon, ComponentType.COMPONENT_WEAPON))
				{
					// Attach melee attack component
					var attackComp = Object.create(MeleeAttackerComponent);
					attackComp.targetEntity = enemy;
					
					ECSManager.attachComponent(attackComp, ent);
					ECSManager.detachComponent(ComponentType.COMPONENT_RANGEATTACKER, ent);
					AnimationSystem.changeAnimation(ent, anim.animationData["attack_" + gameEntity.orientation], true);
					return;
				}
			}
				
			// If it's the last frame..
			if (anim.currentFrame === anim.currentAnimation.framesCount-1)
			{
				// Check for enemy killed
				if (ECSManager.hasComponent(enemy, ComponentType.COMPONENT_DEAD))
				{
					ECSManager.detachComponent(ComponentType.COMPONENT_RANGEATTACKER, ent);
					AnimationSystem.changeAnimation(ent, anim.animationData["walking_" + gameEntity.orientation], false);
					return;
				}
				else	// Shoot Missile
				{
					if (gameEntity.shootingTimer <= 0)
					{
						// Shoot ready missile
						MissileSystem.shootMissileToEnemy(pos.x + box.width/2, pos.y + box.height/2, gameEntity.rangeWeapon, ent, enemy);
						// Take weapon from quiver
						gameEntity.rangeWeapon = gameEntity.quiver;
						// Add new missile to the quiver
						gameEntity.quiver = MissileSystem.copyMissile(gameEntity.rangeWeapon);
						
						gameEntity.shootingTimer = gameEntity.shootingCooldown;
					}
				}
			}
			
			if (!anim.triggered && gameEntity.shootingTimer <= 0)
				AnimationSystem.changeAnimation(ent, anim.animationData["shoot_" + gameEntity.orientation], true);
		}
		else
		{
			GameEntitySystem.toIdleState(ent);
		}
	},
	
	meleeAttack: function(ent)
	{
		var attackComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_MELEEATTACKER);
		var player = ECSManager.getComponent(ent, ComponentType.COMPONENT_PLAYER);
		var pos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		
		var meleeWeapon = ECSManager.getComponent(gameEntity.meleeWeapon, ComponentType.COMPONENT_WEAPON);
		
		var enemy = attackComp.targetEntity;
		
		// Check for animation ending
		if (anim.currentFrame === anim.currentAnimation.framesCount-1 && !attackComp.attackDelivered)
		{
			attackComp.attackDelivered = true;
			
			// Check if the enemy has the game entity component
			// (If not, it can either be an invalid entity or it can be dead)
			if (enemy && ECSManager.hasComponent(enemy, ComponentType.COMPONENT_GAMEENTITY) &&
				!ECSManager.hasComponent(enemy, ComponentType.COMPONENT_DEAD))
			{
				var enemyGE = ECSManager.getComponent(enemy, ComponentType.COMPONENT_GAMEENTITY);
				
				// If entity is already dead go back to idle state
				if (enemyGE.health <= 0)
				{
					// Back to idle animation
					GameEntitySystem.toIdleState(ent);
					return;
				}
				
				// Attach Hit Component to enemy
				if (ECSManager.hasComponent(enemy, ComponentType.COMPONENT_HIT))
				{
					hitComp = ECSManager.getComponent(enemy, ComponentType.COMPONENT_HIT);
					if (!hitComp.damageApplied)
					{
						hitComp.damage += meleeWeapon.damage;
					}
					else
						var hitComp = Object.create(HitComponent);
						hitComp.attacker = ent;
						hitComp.hitEntity = enemy;
						hitComp.damage = meleeWeapon.damage;
						ECSManager.attachComponent(hitComp, enemy);
				}
				else
				{
					var hitComp = Object.create(HitComponent);
					hitComp.attacker = ent;
					hitComp.hitEntity = enemy;
					hitComp.damage = meleeWeapon.damage;
					ECSManager.attachComponent(hitComp, enemy);
				}
				
				// Increase health if entity has lifestealing (vampires..)
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_LIFESTEALING))
				{
					gameEntity.health += meleeWeapon.damage;
					if (gameEntity.health > gameEntity.maxHealth)
						gameEntity.health = gameEntity.maxHealth;
				}
			}
		}
		
		// Check for animation ending
		if (!anim.triggered)
		{
			attackComp.attackDelivered = false;
			
			if (ECSManager.hasComponent(enemy, ComponentType.COMPONENT_GAMEENTITY) &&
				!ECSManager.hasComponent(enemy, ComponentType.COMPONENT_DEAD))
			{
				var enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
				var enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
			
				// Player Heading
				if (enemyPos.x + enemyBox.width/2 < pos.x + box.width/2)
				{
					gameEntity.orientation = "left";
				}
				else
					gameEntity.orientation = "right";
					
				AnimationSystem.changeAnimation(ent, anim.animationData["attack_" + gameEntity.orientation], true);
				
				// Check if enemy is still in range, otherwise chase him
				if (!Utils.rectCollision(pos, enemyPos, box, enemyBox))
				{
					var seekComp = Object.create(SeekEntityComponent);			// Start chasing
					seekComp.targetEntity = enemy;
					ECSManager.attachComponent(seekComp, ent);
					ECSManager.detachComponent(ComponentType.COMPONENT_MELEEATTACKER, ent);
					return;
				}
			}
			else
			{
				// Back to idle animation
				GameEntitySystem.toIdleState(ent);
			}
		}
	},
	
	seekEntity: function(ent)
	{
		var pos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		
		var seekEntityComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_SEEKENTITY);
		var enemy = seekEntityComp.targetEntity;
		
		// Stop chasing if target entity is dead
		if (!ECSManager.hasComponent(enemy, ComponentType.COMPONENT_POSITION) ||
			ECSManager.hasComponent(enemy, ComponentType.COMPONENT_DEAD))
		{
			ECSManager.detachComponent(ComponentType.COMPONENT_SEEKENTITY, ent);
			motion.velocity.set(0,0);
			
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_REINFORCEMENT))
			{
				var reinf = ECSManager.getComponent(ent, ComponentType.COMPONENT_REINFORCEMENT);
				GameEntitySystem.toMoveToLocationState(ent, reinf.position);
			}
		}
		else	// Keep follow enemy
		{
			var enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
			var enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
			
			// Heading
			if (enemyPos.x + enemyBox.width/2 < pos.x + box.width/2)
			{
				gameEntity.orientation = "left";
			}
			else
				gameEntity.orientation = "right";
			
			// If enemy is close, attack him
			if (Utils.rectCollision(pos, enemyPos, box, enemyBox))
			{
				motion.velocity.set(0,0);
				
				// Check for weapon
				if (gameEntity.meleeWeapon && ECSManager.hasComponent(gameEntity.meleeWeapon, ComponentType.COMPONENT_WEAPON))
				{
					// Attach melee attack component
					var attackComp = Object.create(MeleeAttackerComponent);
					attackComp.targetEntity = enemy;
					
					ECSManager.attachComponent(attackComp, ent);
					ECSManager.detachComponent(ComponentType.COMPONENT_SEEKENTITY, ent);
					AnimationSystem.changeAnimation(ent, anim.animationData["attack_" + gameEntity.orientation], true);
					return;
				}
			}
			else
			{
				// Set velocity
				var moveVec = Object.create(Vector2);
				moveVec.set((enemyPos.x + enemyBox.width/2) - (pos.x + (box.width/2)), (enemyPos.y + enemyBox.height/2) - (pos.y + (box.height/2)));
				moveVec.normalize();
				moveVec.mulScalar(motion.speed);
				motion.velocity = moveVec;
			}
		}
			
		// Walking animation
		anim.currentAnimation = anim.animationData["walking_" + gameEntity.orientation];
		(motion.velocity.length() > 0) ? anim.triggered = true : anim.triggered = false;
	},
	
	moveToLocation: function(ent)
	{
		var pos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		
		var moveComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOVETOLOCATION);
					
		// Check if player arrived to destination
		var centerPos = Object.create(Vector2);
		centerPos.set(pos.x + (box.width/2), pos.y + (box.height/2));
		var diff = Object.create(Vector2);
		diff.set(centerPos.x - moveComp.targetPos.x, centerPos.y - moveComp.targetPos.y);
		
		if (motion.velocity.dot(diff) >= 0)
		{
			// Detach component when arrived
			ECSManager.detachComponent(ComponentType.COMPONENT_MOVETOLOCATION, ent);
			motion.velocity.set(0,0);
			
			// Detach Respawn Component (if applicable)
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_RESPAWN))
				ECSManager.detachComponent(ComponentType.COMPONENT_RESPAWN, ent);
		} // Else.. Keep Moving
		
		// Walking animation
		anim.currentAnimation = anim.animationData["walking_" + gameEntity.orientation];
		(motion.velocity.length() > 0) ? anim.triggered = true : anim.triggered = false;
	},
	
	// Get all the enemies which are in the same tiles occupied by the entity
	getCloseEnemies: function(ent)
	{	
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var entPos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var entBox = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		
		// Close enemies
		var closeEnemies = [];
		
		// Top-Left Corner
		var tlCol = Math.floor(entPos.y / this.map.tileSize);
		var tlRow = Math.floor(entPos.x / this.map.tileSize);

		// Bottom-Right Corner
		var brCol = Math.floor((entPos.y + entBox.height) / this.map.tileSize);
		var brRow = Math.floor((entPos.x + entBox.width) / this.map.tileSize);
		
		// Clamp
		tlRow = Math.min(Math.max(tlRow, 0), this.map.tiles.length-1);
		tlCol = Math.min(Math.max(tlCol, 0), this.map.tiles[0].length-1);
		brRow = Math.min(Math.max(brRow, 0), this.map.tiles.length-1);
		brCol = Math.min(Math.max(brCol, 0), this.map.tiles[0].length-1);
		
		// For each occupied tile -> check for colliding enemies and attack
		var entities, enemy, enemyPos, enemyBox;
		for (var col = tlRow; col <= brRow; col++)
		{
			for (var row = tlCol; row <= brCol; row++)
			{
				entities = this.map.tiles[col][row].entities;
				for (var i = 0; i < entities.length; i++)
				{
					enemy = entities[i];
					
					if (!ECSManager.hasComponent(enemy, ComponentType.COMPONENT_POSITION) ||
						!ECSManager.hasComponent(enemy, ComponentType.COMPONENT_BOX)) continue;
						
					enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
					enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
					
					if (entities[i] != ent && Utils.rectCollision(colPos, enemyPos, colBox, enemyBox))
						closeEnemies.push(enemy);
				}
			}
		}
		
		return closeEnemies;
	},
	
	//------------------------------------------------------------//
	//----------------------ENTITY BEHAVIORS----------------------//
	//------------------------------------------------------------//
	toMoveToLocationState: function(ent, targetPos)
	{
		var pos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		
		// Set velocity
		var moveVec = Object.create(Vector2);
		moveVec.set(targetPos.x - (pos.x + (box.width/2)), targetPos.y - (pos.y + (box.height/2)));
		moveVec.normalize();
		moveVec.mulScalar(motion.speed);
		motion.velocity = moveVec;

		// Define new component
		var moveComponent = Object.create(MoveToLocationComponent);
		moveComponent.targetPos = targetPos;
		
		// Attach Component
		ECSManager.attachComponent(moveComponent, ent);
		
		// Heading
		if (moveComponent.targetPos.x < pos.x + box.width/2)
		{
			gameEntity.orientation = "left";
		}
		else
			gameEntity.orientation = "right";
		
		anim.currentAnimation = anim.animationData["walking_" + gameEntity.orientation];
		
		// Detach conflictual components
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_SEEKENTITY))
			ECSManager.detachComponent(ComponentType.COMPONENT_SEEKENTITY, ent);
		
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_RANGEATTACKER))
			ECSManager.detachComponent(ComponentType.COMPONENT_RANGEATTACKER, ent);
			
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MELEEATTACKER))
			ECSManager.detachComponent(ComponentType.COMPONENT_MELEEATTACKER, ent);
	},
	
	toRangeAttackState: function(ent, enemy)
	{
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		
		// Define new component
		var rangeAttComp = Object.create(RangeAttackerComponent);
		rangeAttComp.targetEntity = enemy;
		
		// Attach Component
		ECSManager.attachComponent(rangeAttComp, ent);
		
		motion.velocity.set(0,0);
		AnimationSystem.changeAnimation(ent, anim.animationData["shoot_" + gameEntity.orientation], false);
		
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MELEEATTACKER))
			ECSManager.detachComponent(ComponentType.COMPONENT_MELEEATTACKER, ent);
		
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOVETOLOCATION))
			ECSManager.detachComponent(ComponentType.COMPONENT_MOVETOLOCATION, ent);
			
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_SEEKENTITY))
			ECSManager.detachComponent(ComponentType.COMPONENT_SEEKENTITY, ent);
	},
	
	toChaseEnemyState: function(ent, enemy)
	{
		var seekComp = Object.create(SeekEntityComponent);			// Start chasing
		seekComp.targetEntity = enemy;
		ECSManager.attachComponent(seekComp, ent);
		
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOVETOLOCATION))
			ECSManager.detachComponent(ComponentType.COMPONENT_MOVETOLOCATION, ent);
			
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MELEEATTACKER))
			ECSManager.detachComponent(ComponentType.COMPONENT_MELEEATTACKER, ent);
			
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_RANGEATTACKER))
			ECSManager.detachComponent(ComponentType.COMPONENT_RANGEATTACKER, ent);
	},
	
	toIdleState: function(ent)
	{
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		
		motion.velocity.set(0,0);
		AnimationSystem.changeAnimation(ent, anim.animationData["walking_" + gameEntity.orientation], false);
		ECSManager.detachComponent(ComponentType.COMPONENT_MELEEATTACKER, ent);
		ECSManager.detachComponent(ComponentType.COMPONENT_RANGEATTACKER, ent);
		ECSManager.detachComponent(ComponentType.COMPONENT_SEEKENTITY, ent);
		
		if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_REINFORCEMENT))
		{
			var reinf = ECSManager.getComponent(ent, ComponentType.COMPONENT_REINFORCEMENT);
			GameEntitySystem.toMoveToLocationState(ent, reinf.position);
		}
	},
	
	getEnemyInPosition: function(targetPos, map)
	{
		// Tile
		var tlCol = Math.floor(targetPos.y / map.tileSize);
		var tlRow = Math.floor(targetPos.x / map.tileSize);
		
		// Check for errors
		if (tlCol < 0 || tlRow < 0 || tlCol > map.tiles[0].length-1 || tlRow > map.tiles.length-1)
			return;
			
		entitiesInTile = map.tiles[tlRow][tlCol].entities;
		
		for (var i = 0; i < entitiesInTile.length; i++)
		{
			enemy = entitiesInTile[i];
			
			if (!ECSManager.hasComponent(enemy, ComponentType.COMPONENT_POSITION) ||
				!ECSManager.hasComponent(enemy, ComponentType.COMPONENT_BOX) ||
				!ECSManager.hasComponent(enemy, ComponentType.COMPONENT_GAMEENTITY) ||
				ECSManager.hasComponent(enemy, ComponentType.COMPONENT_DEAD) ||
				ECSManager.hasComponent(enemy, ComponentType.COMPONENT_ALLIED)) continue;
				
			enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
			enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
			
			if (entitiesInTile[i] != this.player && Utils.recContainsPoint(enemyPos, enemyBox, targetPos))
				return enemy;
		}
		
		return null;
	},
	
	getEnemiesInRange: function(ent, targetPos, range)
	{
		var returnEntities = [];
		
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			enemy = ECSManager.entities[i];
			
			if (enemy == ent)
				continue;
				
			if (!ECSManager.hasComponent(enemy, ComponentType.COMPONENT_POSITION) ||
				!ECSManager.hasComponent(enemy, ComponentType.COMPONENT_BOX) ||
				!ECSManager.hasComponent(enemy, ComponentType.COMPONENT_GAMEENTITY) ||
				ECSManager.hasComponent(enemy, ComponentType.COMPONENT_DEAD) ||
				(ECSManager.hasComponent(ent, ComponentType.COMPONENT_ALLIED) && ECSManager.hasComponent(enemy, ComponentType.COMPONENT_ALLIED)) ||
				(ECSManager.hasComponent(ent, ComponentType.COMPONENT_ENEMY) && ECSManager.hasComponent(enemy, ComponentType.COMPONENT_ENEMY))) 
				continue;
				
			enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
			enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
			
			var dist = Object.create(Vector2);
			dist.set(enemyPos.x + enemyBox.width/2, enemyPos.y + enemyBox.height/2);
			dist.x -= targetPos.x;
			dist.y -= targetPos.y;
			
			if (dist.length() <= range)
				returnEntities.push(enemy);
		}
		
		return returnEntities;
	},
	
	checkComponents: function(ent)
	{
		return ECSManager.hasComponent(ent, ComponentType.COMPONENT_GAMEENTITY) &&
			   ECSManager.hasComponent(ent, ComponentType.COMPONENT_POSITION) &&
			   ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOTION) &&
			   ECSManager.hasComponent(ent, ComponentType.COMPONENT_BOX) &&
			   ECSManager.hasComponent(ent, ComponentType.COMPONENT_ANIMATION);
	},
	
	isPlayer: function(ent)
	{
		return ECSManager.hasComponent(ent, ComponentType.COMPONENT_PLAYER);
	},
	
	areEnemy: function(e1, e2)
	{
		return (ECSManager.hasComponent(e1, ComponentType.COMPONENT_ALLIED) && ECSManager.hasComponent(e2, ComponentType.COMPONENT_ENEMY)) ||
			   (ECSManager.hasComponent(e2, ComponentType.COMPONENT_ALLIED) && ECSManager.hasComponent(e1, ComponentType.COMPONENT_ENEMY));
	}
}