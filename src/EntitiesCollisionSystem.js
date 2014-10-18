// System for collision detection (and solving) among entities
var EntitiesCollisionSystem = 
{
	checked: {},	// Associative array to check for collision pairs
	
	init: function() {},
	
	update: function(dt)
	{
		// Reset collision check array
		this.checked = {};
		this.checked.length = 0;
		
		// Detect collision for each couple of entities
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			var e1 = ECSManager.entities[i];
			
			for (var j = 0; j < ECSManager.entities.length; j++)
			{
				var e2 = ECSManager.entities[j];
				
				if (e1 === e2)	// Avoid self-check
					continue;
				
				// Avoid double checking the same pair
				var hashA = e1.ID + ":" + e2.ID;
				var hashB = e2.ID + ":" + e1.ID;
				
				if (this.checkComponents(e1) && this.checkComponents(e2) && !this.checked[hashA] && !this.checked[hashB])
				{
					this.checked[hashA] = this.checked[hashB] = true;
					
					if (this.detectCollision(e1, e2))
					{
						this.solveCollision(e1, e2);
					}
				}
			}
		}
	},
	
	checkComponents: function(ent)
	{
		return 		ECSManager.hasComponent(ent, ComponentType.COMPONENT_COLLISION) &&
					ECSManager.hasComponent(ent, ComponentType.COMPONENT_POSITION) &&
					ECSManager.hasComponent(ent, ComponentType.COMPONENT_MOTION) &&
					ECSManager.hasComponent(ent, ComponentType.COMPONENT_BOX) &&
					ECSManager.hasComponent(ent, ComponentType.COMPONENT_WARRIOR);
	},
	
	detectCollision: function(e1, e2)
	{
		// Get Components
		var e1Position = ECSManager.getComponent(e1, ComponentType.COMPONENT_POSITION);
		var e1Box = ECSManager.getComponent(e1, ComponentType.COMPONENT_BOX);
		var e2Position = ECSManager.getComponent(e2, ComponentType.COMPONENT_POSITION);
		var e2Box = ECSManager.getComponent(e2, ComponentType.COMPONENT_BOX);
				   
		var outsideBottom = (e1Position.position.y + e1Box.height) < (e2Position.position.y);
		var outsideTop = (e1Position.position.y) > (e2Position.position.y + e2Box.height);
		var outsideLeft = (e1Position.position.x) > (e2Position.position.x + e2Box.width);
		var outsideRight = (e1Position.position.x + e1Box.width) < (e2Position.position.x);

		return !(outsideBottom || outsideTop || outsideLeft || outsideRight);
	},
	
	solveCollision: function(e1, e2)
	{
		// Get Components
		var e1Position = ECSManager.getComponent(e1, ComponentType.COMPONENT_POSITION).position;
		var e1Box = ECSManager.getComponent(e1, ComponentType.COMPONENT_BOX);
		var e1Motion =	ECSManager.getComponent(e1, ComponentType.COMPONENT_MOTION);
		var e2Position = ECSManager.getComponent(e2, ComponentType.COMPONENT_POSITION).position;
		var e2Box = ECSManager.getComponent(e2, ComponentType.COMPONENT_BOX);
		var e2Motion = ECSManager.getComponent(e2, ComponentType.COMPONENT_MOTION);
		
		var pen = Object.create(Vector2);
			
		// Find overlapping x
		var penX;
		if (e1Position.x <= e2Position.x)
		{
			if ((e1Position.x + e1Box.width) - e2Position.x >= 0 &&
				(e2Position.x + e2Box.width) - e1Position.x >= 0)
			{
				penX = Math.min((e1Position.x + e1Box.width), (e2Position.x + e2Box.width)) -
						Math.max(e1Position.x, e2Position.x);
			}
		}
		else
		{
			if ((e2Position.x + e2Box.width) - e1Position.x >= 0 &&
				(e1Position.x + e1Box.width) - e2Position.x >= 0)
			{
				penX = Math.min((e2Position.x + e2Box.width), (e1Position.x + e1Box.width)) -
						Math.max(e2Position.x, e1Position.x);
			}
		}
		
		// Find overlapping y
		var penY;
		if (e1Position.y <= e2Position.y)
		{
			if ((e1Position.y + e1Box.height) - e2Position.y >= 0 &&
				(e2Position.y + e2Box.height) - e1Position.y >= 0)
			{
				penY = Math.min((e1Position.y + e1Box.height), (e2Position.y + e2Box.height)) -
						Math.max(e1Position.y, e2Position.y);
			}
		}
		else
		{
			if ((e2Position.y + e2Box.height) - e1Position.y >= 0 &&
				(e1Position.y + e1Box.height) - e2Position.y >= 0)
			{
				penY = Math.min((e2Position.y + e2Box.height), (e1Position.y + e1Box.height)) -
						Math.max(e2Position.y, e1Position.y);
			}
		}
		
		pen.x = penX;
		pen.y = penY;
		
		if (penY > 0 && penY > penX)
			pen.y = 0;
		
		if (penX > 0 && penX > penY)
			pen.x = 0;
		
		if (e1Position.y > e2Position.y)
			pen.y = -pen.y;
		
		if (e1Position.x > e2Position.x)
			pen.x = -pen.x;
		
		pen.x /= 2;
		pen.y /= 2;
		e1Position.subVector(pen);
		e2Position.addVector(pen);
	}
}