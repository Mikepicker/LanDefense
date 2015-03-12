// Skill System
var SkillSystem = 
{
	init: function()
	{
	},
	
	update: function(dt)
	{
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			var ent = ECSManager.entities[i];
			
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_EARTHSTRIKE))
				this.handleEarthStrike(ent);
				
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MULTIPLEARROWS))
				this.handleMultipleArrowsSkill(ent);
				
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_FROZENRAIN))
				this.handleFrozenRainSkill(ent);
		}
	},
	
	handleEarthStrike: function(ent)
	{
		var impulseMagnitude = CONFIG.earthstrikeImpulse;
		
		var pos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var earthstrikeComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_EARTHSTRIKE);
		var weaponComp = ECSManager.getComponent(gameEntity.meleeWeapon, ComponentType.COMPONENT_WEAPON);
		
		// Wait for last animation frame
		if (anim.currentFrame === anim.currentAnimation.framesCount-1 && !earthstrikeComp.triggered)
		{
			earthstrikeComp.triggered = true;
			
			// Shake screen!
			SFXSystem.shakeScreen(2000,5);
			
			// Apply impulse to nearby units
			var centerPos = Object.create(Vector2);
			centerPos.set(pos.x + box.width/2, pos.y + box.height/2);
			var returnEntities = GameEntitySystem.getEnemiesInRange(ent, centerPos, CONFIG.earthstrikeRange);
			
			for (var i = 0; i < returnEntities.length; i++)
			{
				var enemy = returnEntities[i];
				
				var enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
				var enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
				var enemyMot = ECSManager.getComponent(enemy, ComponentType.COMPONENT_MOTION);
				var enemyGE = ECSManager.getComponent(enemy, ComponentType.COMPONENT_GAMEENTITY);
				
				var impulseComp = Object.create(ImpulseComponent);
				var dir = Object.create(Vector2);
				dir.x = (enemyPos.x + enemyBox.width/2) - centerPos.x;
				dir.y = (enemyPos.y + enemyBox.height/2) - centerPos.y;
				dir.normalize();
				dir.mulScalar(impulseMagnitude);
				
				enemyMot.velocity.set(dir.x, dir.y);
				
				ECSManager.attachComponent(Object.create(ImpulseComponent), enemy);
				
				// Hit enemy
				var hitComp = Object.create(HitComponent);
				hitComp.damage = CONFIG.earthstrikeDamage;
				ECSManager.attachComponent(hitComp, enemy);
			}
		}
		
		// Check for animation ending
		if (!anim.triggered)
		{
			// Detach earthstrike component
			ECSManager.detachComponent(ComponentType.COMPONENT_EARTHSTRIKE, ent);
			AnimationSystem.changeAnimation(ent, anim.animationData["walking_" + gameEntity.orientation], false);
		}
	},
	
	toEarthStrikeState: function(ent)
	{
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
			
		// Detach other behavioral components
		ECSManager.detachComponent(ComponentType.COMPONENT_MELEEATTACKER, ent);
		ECSManager.detachComponent(ComponentType.COMPONENT_RANGEATTACKER, ent);
		ECSManager.detachComponent(ComponentType.COMPONENT_MOVETOLOCATION, ent);
		ECSManager.detachComponent(ComponentType.COMPONENT_SEEKENTITY, ent);
		
		motion.velocity.set(0,0);
		AnimationSystem.changeAnimation(ent, anim.animationData["skill_" + gameEntity.orientation], true);
		ECSManager.attachComponent(Object.create(EarthStrikeComponent), ent);
		
		// Play Sound
		SoundSystem.playSound("earthstrike",0.5,2,0);
	},
	
	// RANGER
	handleMultipleArrowsSkill: function(ent)
	{
		var pos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		var skillComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_MULTIPLEARROWS);
		
		// If it's the last frame..
		if (anim.currentFrame === anim.currentAnimation.framesCount-1 && !skillComp.triggered)
		{
			skillComp.triggered = true;
			
			// Shoot missiles to enemies
			for (var i = 0; i < skillComp.enemies.length; i++)
			{
				var enemy = skillComp.enemies[i];
				var fireArrow = MissileSystem.copyMissile(gameEntity.rangeWeapon);
				// Set fire to arrow!
				var burnComp = Object.create(BurnComponent);
				ECSManager.attachComponent(burnComp, fireArrow);
				
				MissileSystem.shootMissileToEnemy(pos.x + box.width/2, pos.y + box.height/2, fireArrow, ent, enemy);
			}
			
			// Delete fire arrow
			ECSManager.removeEntity(gameEntity.rangeWeapon);
			
			// Reload
			gameEntity.rangeWeapon = gameEntity.quiver;
			gameEntity.quiver = MissileSystem.copyMissile(gameEntity.rangeWeapon);
		}
		
		// Check for animation ending
		if (!anim.triggered)
		{
			// Detach multiple arrows component
			ECSManager.detachComponent(ComponentType.COMPONENT_MULTIPLEARROWS, ent);
			GameEntitySystem.toIdleState(ent);
		}
	},
	
	toMultipleArrowsSkill: function(ent)
	{
		var pos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		
		// collect 10 enemies
		var enemies = [];
			
		// Shoot 10 arrows to nearby units (in the facing direction)
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			if (enemies.length === CONFIG.multiplearrowsSize)
				break;
				
			var enemy = ECSManager.entities[i];
			if (GameEntitySystem.areEnemy(ent, enemy) && !ECSManager.hasComponent(enemy, ComponentType.COMPONENT_DEAD))
			{
				var enemyPos = ECSManager.getComponent(enemy, ComponentType.COMPONENT_POSITION).position;
				var enemyBox = ECSManager.getComponent(enemy, ComponentType.COMPONENT_BOX);
				var dist = Object.create(Vector2);
				dist.set(enemyPos.x + enemyBox.width/2, enemyPos.y + enemyBox.height/2);
				dist.subVector(pos);
				
				if (dist.length() <= CONFIG.multiplearrowsRange &&
					(gameEntity.orientation === "right" && enemyPos.x + enemyBox.width/2 >= pos.x + box.width/2 ||
					gameEntity.orientation === "left" && enemyPos.x + enemyBox.width/2 < pos.x + box.width/2))
				{
					enemies.push(enemy);
				}
			}	
		}
		
		// Shoot if there are enemies
		if (enemies.length > 0)
		{
			ECSManager.removeEntity(gameEntity.rangeWeapon);
			gameEntity.rangeWeapon = EntityFactory.createFireArrow(CONFIG.fireArrowsDamage);
		
			// Define new component
			var skillComp = Object.create(MultipleArrowsComponent);
			skillComp.enemies = enemies;
			
			// Attach Component
			ECSManager.attachComponent(skillComp, ent);
			
			motion.velocity.set(0,0);
			AnimationSystem.changeAnimation(ent, anim.animationData["skill_" + gameEntity.orientation], true);
			
			ECSManager.detachComponent(ComponentType.COMPONENT_RANGEATTACKER, ent);
			ECSManager.detachComponent(ComponentType.COMPONENT_MELEEATTACKER, ent);
			ECSManager.detachComponent(ComponentType.COMPONENT_MOVETOLOCATION, ent);
			ECSManager.detachComponent(ComponentType.COMPONENT_SEEKENTITY, ent);
		}
	},
	
	// WIZARD
	handleFrozenRainSkill: function(ent)
	{
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		var skillComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_FROZENRAIN);
		
		// If it's the last frame..
		if (anim.currentFrame === anim.currentAnimation.framesCount-1 && !skillComp.triggered)
		{
			skillComp.triggered = true;
			
			// Attach Frozen component to ALL enemy units
			for (var i = 0; i < ECSManager.entities.length; i++)
			{
				var enemy = ECSManager.entities[i];
				if (GameEntitySystem.areEnemy(ent, enemy))
				{
					var frozenComp = Object.create(FrozenComponent)
					frozenComp.damageOverTime = 2;
					frozenComp.time = 10000;
					ECSManager.attachComponent(frozenComp, enemy);
					GameEntitySystem.toIdleState(enemy);
				}
			}
			
			// Generate random ice drops
			for (var i = 0; i < 100; i++)
			{
				EntityFactory.createIceDrop();
			}
		}
		
		// Check for animation ending
		if (!anim.triggered)
		{
			// Detach frozen rain component
			ECSManager.detachComponent(ComponentType.COMPONENT_FROZENRAIN, ent);
			GameEntitySystem.toIdleState(ent);
		}
	},
	
	toFrozenRainSkill: function(ent)
	{
		var anim = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		
		AnimationSystem.changeAnimation(ent, anim.animationData["shoot_" + gameEntity.orientation], true);
		
		motion.velocity.set(0,0);
		
		// Attach Frozen Rain Component
		ECSManager.attachComponent(Object.create(FrozenRainComponent), ent);
		
		ECSManager.detachComponent(ComponentType.COMPONENT_RANGEATTACKER, ent);
		ECSManager.detachComponent(ComponentType.COMPONENT_MELEEATTACKER, ent);
		ECSManager.detachComponent(ComponentType.COMPONENT_MOVETOLOCATION, ent);
		ECSManager.detachComponent(ComponentType.COMPONENT_SEEKENTITY, ent);
		
		// Play Sound
		SoundSystem.playSound("frozenrain",0.5,1,0);
	}
}