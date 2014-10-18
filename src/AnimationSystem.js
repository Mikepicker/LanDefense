// Animation system
var AnimationSystem = 
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
			
			if (this.checkAnimComponents(ent) && !ECSManager.hasComponent(ent, ComponentType.COMPONENT_DEAD))
			{
				var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
				var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
				var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
				var animation = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
				
				if (animation.currentAnimation === null)
					console.log("STOP");
				var totalFrames = animation.currentAnimation.framesCount;
				var animData = animation.animationData;
				
				// If animation is active, perform it
				if (animation.triggered)
				{
					if (animation.timer >= animation.currentAnimation.animationTime)
					{
						animation.timer = 0;
						animation.currentFrame = animation.currentFrame+1;
						
						if (animation.currentFrame === totalFrames) // If it's the final frame..
						{
							// Animation turned off if it's not a "looping" one,
							// or if the user is not pressing the button
							animation.currentFrame = 0;
							animation.currentAnimation.loop ? animation.triggered = true : animation.triggered = false;
						}
					}
					else
					{
						animation.timer += dt;
					}
				}
				else
				{
					animation.currentFrame = 0;
				}
			}
		}
	},
	
	changeAnimation: function(ent, anim, isTriggered)
	{
		var animComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
		
		animComp.currentAnimation = anim;
		animComp.currentFrame = 0;
		animComp.timer = 0;
		animComp.triggered = isTriggered;
	},
	
	checkAnimComponents: function(ent)
	{
		return  ECSManager.hasComponent(ent, ComponentType.COMPONENT_GAMEENTITY) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_ANIMATION) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_POSITION) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOTION) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_BOX) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_DISPLAY);
	}
};