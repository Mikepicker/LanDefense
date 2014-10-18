// Missile System
var MissileSystem =
{
	map: null,
	camera: null,
	gameState: null,
	
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
		}
	},
	
	update: function(dt)
	{
		// Lifetime
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			var ent = ECSManager.entities[i];
			
			if (this.checkComponents(ent))
			{
				var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var display = ECSManager.getComponent(ent, ComponentType.COMPONENT_DISPLAY);
				var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
				var missileComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_MISSILE);
				
				if (missileComp.time >= missileComp.flyTime)	// Arrow arrived to destination
				{
					if (missileComp.decayTimer === 0)
						this.performAttack(ent);
						
					display.alpha = 1 - (missileComp.decayTimer / missileComp.decayTime);
					
					if (display.alpha <= 0)
					{
						display.alpha = 0;
						ECSManager.removeEntity(ent);
					}
					
					missileComp.decayTimer += dt;
				}
			}
		}
	},
	
	performAttack: function(ent)
	{
		var missileComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_MISSILE);
		var weaponComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_WEAPON);
		var pos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var enemy = missileComp.targetEntity;
		
		if (ECSManager.hasComponent(enemy, ComponentType.COMPONENT_POSITION) &&
			ECSManager.hasComponent(enemy, ComponentType.COMPONENT_BOX) &&
			ECSManager.hasComponent(enemy, ComponentType.COMPONENT_GAMEENTITY) &&
			!ECSManager.hasComponent(enemy, ComponentType.COMPONENT_DEAD))
		{
			enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
			enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
			enemyMot = ECSManager.getComponent(enemy, ComponentType.COMPONENT_MOTION);
			enemyGE = ECSManager.getComponent(enemy, ComponentType.COMPONENT_GAMEENTITY);
			enemyAnim = ECSManager.getComponent(enemy, ComponentType.COMPONENT_ANIMATION);
			
			if (Utils.recContainsPoint(enemyPos, enemyBox, missileComp.targetPos))
			{
				if (enemyGE.health <= 0)
					return;
					
				// Attach Hit Component to enemy
				if (ECSManager.hasComponent(enemy, ComponentType.COMPONENT_HIT))
				{
					hitComp = ECSManager.getComponent(enemy, ComponentType.COMPONENT_HIT);
					if (!hitComp.damageApplied)
						hitComp.damage += weaponComp.damage;
					else
						var hitComp = Object.create(HitComponent);
						hitComp.attacker = ent;
						hitComp.hitEntity = enemy;
						hitComp.damage = weaponComp.damage;
						ECSManager.attachComponent(hitComp, enemy);
				}
				else
				{
					var hitComp = Object.create(HitComponent);
					hitComp.attacker = ent;
					hitComp.hitEntity = enemy;
					hitComp.damage = weaponComp.damage;
					ECSManager.attachComponent(hitComp, enemy);
				}
				
				// Handle fire arrows
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_BURN))
				{
					var burnComp = Object.create(BurnComponent);
					burnComp.damageOverTime = CONFIG.fireArrowsDamageOverTime;
					burnComp.time = CONFIG.fireArrowsBurningTime;
					ECSManager.attachComponent(burnComp, enemy);
				}
				
				// Remove Arrow
				ECSManager.removeEntity(ent);
			}
		}
	},
	
	checkComponents: function(ent)
	{
		return ECSManager.hasComponent(ent, ComponentType.COMPONENT_MISSILE) &&
			   ECSManager.hasComponent(ent, ComponentType.COMPONENT_POSITION) &&
			   ECSManager.hasComponent(ent, ComponentType.COMPONENT_DISPLAY) &&
			   ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOTION);
	},
	
	shootMissileToEnemy: function(startX, startY, missile, owner, enemy)
	{
		if (!enemy || !missile || !ECSManager.hasComponent(missile, ComponentType.COMPONENT_MISSILE))
			return;
			
		var missileComp = ECSManager.getComponent(missile, ComponentType.COMPONENT_MISSILE);
		missileComp.startPos = Object.create(Vector2);
		missileComp.startPos.set(startX, startY);
		missileComp.targetEntity = enemy;
		missileComp.owner = owner;
		
		// Enemy components
		var enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
		var enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
		var enemyMot = ECSManager.getComponent(enemy, ComponentType.COMPONENT_MOTION);
		
		// Position Component
		var missilePos = Object.create(PositionComponent);	
		missilePos.position = Object.create(Vector2);
		missilePos.position.x = startX;
		missilePos.position.y = startY;
		
		// Display Component
		var missileDisp = Object.create(DisplayComponent);
		
		// Motion Component
		var missileMot = Object.create(MotionComponent);
		missileMot.velocity = Object.create(Vector2);
		
		// Distance between shooting position and current enemy position
		var dist = Object.create(Vector2);
		dist.set(enemyPos.x - startX, enemyPos.y - startY);
		
		missileComp.flyTime = dist.length()/45;		// Fly Time proportional to target distance
		
		// Shoot to predicted enemy position
		var targetPos = Object.create(Vector2);
		targetPos.x = (enemyPos.x + enemyBox.width/2) + (enemyMot.velocity.x * (missileComp.flyTime/missileComp.speed));
		targetPos.y = (enemyPos.y + enemyBox.height/2) + (enemyMot.velocity.y * (missileComp.flyTime/missileComp.speed));
		missileComp.targetPos = targetPos;			// Store it into javelin component
		
		// Compute initial velocity
		var dx = targetPos.x - startX;
		var dy = targetPos.y - startY;
		
		missileComp.initVel = Object.create(Vector2);
		missileComp.initVel.x = dx / missileComp.flyTime;
		missileComp.initVel.y = (dy + (0.5 * (-9.81) * Math.pow(missileComp.flyTime,2))) / missileComp.flyTime;
		
		ECSManager.attachComponent(missilePos, missile);
		ECSManager.attachComponent(missileDisp, missile);
		ECSManager.attachComponent(missileMot, missile);
	},
	
	copyMissile: function(missile)
	{
		var newMissile = ECSManager.createEntity();
		
		// Weapon Component
		var weaponComp = Object.create(WeaponComponent);
		weaponComp.name = ECSManager.getComponent(missile, ComponentType.COMPONENT_WEAPON).name;
		weaponComp.damage = ECSManager.getComponent(missile, ComponentType.COMPONENT_WEAPON).damage;
		
		// Missile Component
		var missileComp = Object.create(MissileComponent);
		missileComp.speed = ECSManager.getComponent(missile, ComponentType.COMPONENT_MISSILE).speed;
		missileComp.damage = ECSManager.getComponent(missile, ComponentType.COMPONENT_MISSILE).damage;
		missileComp.img = ECSManager.getComponent(missile, ComponentType.COMPONENT_MISSILE).img;
		
		// Box Component
		var missileBox = Object.create(BoxComponent);
		missileBox.width = ECSManager.getComponent(missile, ComponentType.COMPONENT_BOX).width;
		missileBox.height = ECSManager.getComponent(missile, ComponentType.COMPONENT_BOX).height;
		
		ECSManager.attachComponent(weaponComp, newMissile);
		ECSManager.attachComponent(missileComp, newMissile);
		ECSManager.attachComponent(missileBox, newMissile);
		
		return newMissile;
	}
};