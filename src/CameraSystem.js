// Camera System
var CameraSystem = 
{
	map: null,
	camera: null,
	player: null,
	
	init: function()
	{
		// Get camera, map and player
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_MAP))
			{
				this.map = ECSManager.entities[i];
			}
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_CAMERA))
			{
				this.camera = ECSManager.entities[i];
			}
			
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_PLAYER))
			{
				this.player = ECSManager.entities[i];
			}
		}
	},
	
	// Render Entities
	update: function(dt)
	{
			var cameraPos = ECSManager.getComponent(this.camera, ComponentType.COMPONENT_POSITION).position;
			var cameraBox = ECSManager.getComponent(this.camera, ComponentType.COMPONENT_BOX);
			var playerPos = ECSManager.getComponent(this.player, ComponentType.COMPONENT_POSITION).position;
			var playerBox = ECSManager.getComponent(this.player, ComponentType.COMPONENT_BOX);
			var mapBox = ECSManager.getComponent(this.map, ComponentType.COMPONENT_BOX);
			
			// Center on player
			var playerCenterX = playerPos.x + (playerBox.width/2);
			var playerCenterY = playerPos.y + (playerBox.height/2);
			cameraPos.set(playerCenterX - (cameraBox.width/2), playerCenterY - (cameraBox.height/2));
			
			// Check Bounds
			if (cameraPos.x < 0)
				cameraPos.x = 0;
			if (cameraPos.x + cameraBox.width > mapBox.width)
				cameraPos.x = mapBox.width - cameraBox.width;
				
			if (cameraPos.y < 0)
				cameraPos.y = 0;
			if (cameraPos.y + cameraBox.height > mapBox.height)
				cameraPos.y = mapBox.height - cameraBox.height;
	}
};