// Display system
var DisplaySystem = 
{
	init: function() {},
	
	update: function(dt)
	{
		// Clear Canvas
		drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
				
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			var ent = ECSManager.entities[i];
			
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_POSITION) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_BOX) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_DISPLAY))
			{
				var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
				var display = this.ecsManager.getComponent(ent, ComponentType.COMPONENT_DISPLAY);
					
				// Draw Entity
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_ANIMATION))
				{
					var animation = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
					var frameData = animation.currentAnimation.frames[animation.currentFrame];
					var spriteSheet = AssetsManager.images[animation.animationData.type];
					
					drawingSurface.drawImage
					(
						spriteSheet,
						frameData.sourceX,
						frameData.sourceY,
						frameData.width,
						frameData.height,
						position.x,
						position.y,
						frameData.width,
						frameData.height
					);
				}
			}
		}
	}
};