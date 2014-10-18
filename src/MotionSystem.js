// Motion System
var MotionSystem = 
{
	gameState: null,
	
	init: function()
	{
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE))
			{
				this.gameState = ECSManager.getComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE);
				break;
			}
		}
	},
	
	update: function(dt)
	{
		if (this.gameState.gamePaused)
			return;
			
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			var ent = ECSManager.entities[i];
			
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_POSITION) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOTION))
			{
				var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
				
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MISSILE))
				{
					this.handleMissiles(ent, dt);
				}
				else
				{
					if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_DEAD))
					{
						motion.velocity.set(0,0);
						continue;
					}
					
					if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_IMPULSE))
						this.handleImpulse(ent);
						
					position.addVector(motion.velocity);
				}
			}
		}
	},
	
	// Handle Missiles
	handleMissiles: function(ent, dt)
	{
		// Missile Parabola
		var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		var missileComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_MISSILE);
		
		motion.velocity.set(missileComp.initVel.x, missileComp.initVel.y + (9.81 * missileComp.time));
		
		if (missileComp.time < missileComp.flyTime)
		{
			position.x = missileComp.startPos.x + (missileComp.initVel.x * missileComp.time);
			position.y = missileComp.startPos.y + (missileComp.initVel.y * missileComp.time) - (0.5 * (-9.81) * Math.pow(missileComp.time,2));
			
			missileComp.time += missileComp.speed;
		}
		else
			missileComp.time = missileComp.flyTime;
	},
	
	// Handle Impulses
	handleImpulse: function(ent)
	{
		var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
		var impulseComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_IMPULSE);
		
		var damping = 1.1;
		
		if (motion.velocity.length() < 0.01)
		{
			motion.velocity.set(0,0);
			ECSManager.detachComponent(ComponentType.COMPONENT_IMPULSE, ent);
		}
		else
			motion.velocity.mulScalar(1/damping);
	}
}