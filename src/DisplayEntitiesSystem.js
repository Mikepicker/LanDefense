// Display Entities System
var DisplayEntitiesSystem = 
{
	
	map: null,
	camera: null,
	entityCanvas: null,
	healthBarFG: null,	// Pre-Rendered health bar foreground image (green)
	healthBarBG: null,	// Pre-Rendered health bar background image (red)
	gameState: null,
	
	init: function()
	{
		// Get the map
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
			
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE))
			{
				this.gameState = ECSManager.getComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE);
			}
		}
		
		// Off-Screen Entity Rendering
		this.entityCanvas = document.createElement("canvas");
		
		// Health Bar Pre-Render
		this.healthBarFG = document.createElement('canvas');
		this.healthBarFG.width = 32;
		this.healthBarFG.height = 2;
		this.healthBarFG.getContext('2d').fillStyle = 'rgb(0,255,60)';
		this.healthBarFG.getContext('2d').fillRect(0,0,this.healthBarFG.width, this.healthBarFG.height);
		
		this.healthBarBG = document.createElement('canvas');
		this.healthBarBG.width = 32;
		this.healthBarBG.height = 2;
		this.healthBarBG.getContext('2d').fillStyle = 'red';
		this.healthBarBG.getContext('2d').fillRect(0,0,this.healthBarBG.width, this.healthBarBG.height);
	},
	
	// Render Entities
	update: function(dt)
	{
		var cameraPos = ECSManager.getComponent(this.camera, ComponentType.COMPONENT_POSITION).position;
		var cameraBox = ECSManager.getComponent(this.camera, ComponentType.COMPONENT_BOX);
		var mapComp = ECSManager.getComponent(this.map, ComponentType.COMPONENT_MAP);
		var mapCanvasCtx = mapComp.mapCanvas.getContext('2d');
		
		// Visible tiles
		var topLeftX = Math.floor(cameraPos.x / mapComp.tileSize);
		var topLeftY = Math.floor(cameraPos.y / mapComp.tileSize);
		var BottomRightX = Math.floor((cameraPos.x + cameraBox.width) / mapComp.tileSize);
		var BottomRightY = Math.floor((cameraPos.y + cameraBox.height) / mapComp.tileSize);
		
		// Clamp
		topLeftX = Math.min(Math.max(topLeftX, 0), mapComp.tiles.length);
		topLeftY = Math.min(Math.max(topLeftY, 0), mapComp.tiles[0].length);
		BottomRightX = Math.min(Math.max(BottomRightX, 0), mapComp.tiles.length);
		BottomRightY = Math.min(Math.max(BottomRightY, 0), mapComp.tiles[0].length);
		
		// Order following y axis
		var entitiesToDisplay = ECSManager.entities.slice();
		entitiesToDisplay.sort
		(
			function(e1,e2)
			{
				// Put missiles always in front
				if (ECSManager.hasComponent(e1, ComponentType.COMPONENT_MISSILE))
					return 1;
				
				if (ECSManager.hasComponent(e2, ComponentType.COMPONENT_MISSILE))
					return -1;
					
				var e1PosY = 0;
				var e2PosY = 0;
				var e1Height = 0;
				var e2Height = 0;
				
				if (ECSManager.hasComponent(e1, ComponentType.COMPONENT_POSITION))
					e1PosY = ECSManager.getComponent(e1, ComponentType.COMPONENT_POSITION).position.y;
					
				if (ECSManager.hasComponent(e2, ComponentType.COMPONENT_POSITION))
					e2PosY = ECSManager.getComponent(e2, ComponentType.COMPONENT_POSITION).position.y;
				
				if (ECSManager.hasComponent(e1, ComponentType.COMPONENT_BOX))
					e1Height = ECSManager.getComponent(e1, ComponentType.COMPONENT_BOX).height;
					
				if (ECSManager.hasComponent(e2, ComponentType.COMPONENT_BOX))
					e2Height = ECSManager.getComponent(e2, ComponentType.COMPONENT_BOX).height;
					
				return (e1PosY+e1Height) - (e2PosY+e2Height);
			}
		);
		
		for (var i = 0; i < entitiesToDisplay.length; i++)
		{
			var ent = entitiesToDisplay[i];
			
			// Draw score when enemy has been killed
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_GOLDSCORE))
			{
				var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var display = ECSManager.getComponent(ent, ComponentType.COMPONENT_DISPLAY);
				var scoreBonusComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_GOLDSCORE);
				
				mapCanvasCtx.save();
				mapCanvasCtx.globalAlpha = display.alpha;
				
				mapCanvasCtx.font = "40px gothic";
				mapCanvasCtx.textAlign = "center";
				mapCanvasCtx.fillStyle = 'rgb(255,245,50)';
				
				mapCanvasCtx.fillText(scoreBonusComp.score, position.x, position.y);
				
				mapCanvasCtx.restore();
				
				continue;
			}
			
			// Draw other game elements
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_POSITION) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_BOX) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_DISPLAY))
			{
				var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var display = ECSManager.getComponent(ent, ComponentType.COMPONENT_DISPLAY);
				var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
				var cameraPos = ECSManager.getComponent(this.camera, ComponentType.COMPONENT_POSITION).position;
				var cameraBox = ECSManager.getComponent(this.camera, ComponentType.COMPONENT_BOX);
				var mapBox = ECSManager.getComponent(this.map, ComponentType.COMPONENT_BOX);
				
				// Scene object
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_SCENEOBJECT))
				{
					var sceneObjectComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_SCENEOBJECT);
					
					mapCanvasCtx.save();
					
					mapCanvasCtx.scale(display.scale, display.scale);
					mapCanvasCtx.translate(position.x, position.y);
					mapCanvasCtx.rotate(-Math.PI/4);
					mapCanvasCtx.translate(-position.x, -position.y);
					mapCanvasCtx.drawImage
					(
						AssetsManager.images[sceneObjectComp.img],
						0,
						0,
						box.width,
						box.height,
						position.x | 0,
						position.y | 0,
						box.width,
						box.height
					);
						
					mapCanvasCtx.restore();
					
					continue;
				}

				// Camera Clipping
				if ((position.x + box.width) < cameraPos.x || (position.y + box.height) < cameraPos.y ||
					position.x > cameraPos.x + cameraBox.width || position.y > cameraPos.y + cameraBox.height)
				{
					continue;
				}
				
				// Explosion
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_EXPLOSION))
				{
					var animation = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
					var frameData = animation.currentAnimation.frames[animation.currentFrame];
					var spriteSheet = AssetsManager.images[animation.animationData.type];
					
					if (!animation.triggered)
						continue;
						
					// Draw Entity
					mapCanvasCtx.drawImage
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
				
				// Bonuses
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_LIFEBONUS))
				{
					var lifeBonusComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_LIFEBONUS)
					mapCanvasCtx.drawImage
					(
						AssetsManager.images[lifeBonusComp.img],
						0,
						0,
						32,
						32,
						(position.x + box.width/2) | 0,
						(position.y + box.height/2) | 0,
						32,
						32
					);
					
					mapCanvasCtx.save();
					mapCanvasCtx.globalAlpha = 0.6
				
					// Draw shadow
					mapCanvasCtx.drawImage
					(
						AssetsManager.images["shadow"],
						0,
						0,
						64,
						16,
						position.x | 0,
						(position.y + box.height + 12) | 0,
						64,
						16
					);
					
					mapCanvasCtx.restore();
						
					continue;
				}
				else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_GOLDBONUS))
				{
					var goldBonusComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_GOLDBONUS)
					mapCanvasCtx.drawImage
					(
						AssetsManager.images[goldBonusComp.img],
						0,
						0,
						32,
						32,
						(position.x + box.width/2) | 0,
						(position.y + box.height/2) | 0,
						32,
						32
					);

					mapCanvasCtx.save();
					mapCanvasCtx.globalAlpha = 0.6;
				
					// Draw shadow
					mapCanvasCtx.drawImage
					(
						AssetsManager.images["shadow"],
						0,
						0,
						64,
						16,
						position.x | 0,
						(position.y + box.height + 12) | 0,
						64,
						16
					);
					
					mapCanvasCtx.restore();					
					continue;
				}
				else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_HEALPOTION))
				{
					var healPotComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_HEALPOTION)
					mapCanvasCtx.drawImage
					(
						AssetsManager.images[healPotComp.img],
						0,
						0,
						32,
						32,
						(position.x + box.width/2) | 0,
						(position.y + box.height/2) | 0,
						32,
						32
					);

					mapCanvasCtx.save();
					mapCanvasCtx.globalAlpha = 0.6;
				
					// Draw shadow
					mapCanvasCtx.drawImage
					(
						AssetsManager.images["shadow"],
						0,
						0,
						64,
						16,
						position.x | 0,
						(position.y + box.height + 12) | 0,
						64,
						16
					);
					
					mapCanvasCtx.restore();					
					continue;
				}
				
				// Red Cross
				if (this.isRedCross(ent))
				{
					this.handleRedCross(ent, mapCanvasCtx, dt);
					continue;
				}
				
				if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_GAMEENTITY))		// Game Entities
				{
					var animation = ECSManager.getComponent(ent, ComponentType.COMPONENT_ANIMATION);
					var frameData = animation.currentAnimation.frames[animation.currentFrame];
					var spriteSheet = AssetsManager.images[animation.animationData.type];
					var gameEntity = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
					
					// Apply alpha
					mapCanvasCtx.save();
					mapCanvasCtx.globalAlpha = display.alpha;
					
					// Draw a gravestone if entity is dead
					if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_DEAD))
					{
						// Draw Entity
						mapCanvasCtx.drawImage
						(
							AssetsManager.images["gravestone"],
							0,
							0,
							32,
							32,
							(position.x + box.width/2 - 16) | 0,
							(position.y + box.height/2) | 0,
							32,
							32
						);
					}
					else
					{
						mapCanvasCtx.save();
						mapCanvasCtx.globalAlpha = 0.8;
					
						// Draw shadow
						mapCanvasCtx.drawImage
						(
							AssetsManager.images["shadow"],
							0,
							0,
							64,
							16,
							position.x | 0,
							(position.y + box.height - 4) | 0,
							64,
							16
						);
						
						mapCanvasCtx.restore();
						
						// Draw Circle if this entity has been selected by the user
						if (this.gameState.selectedEntity && this.gameState.selectedEntity.ID === ent.ID)
						{
							mapCanvasCtx.drawImage
							(
								AssetsManager.images["entity_selected_icon"],
								0, 0,
								64, 12,
								(position.x + (box.width/2) - 32) | 0, (position.y + box.height - 4) | 0,
								64, 12
							)
						}
						
						// Offset for flipped-images
						var offset = 0;
						if (animation.currentAnimation.orientation === "left")
							offset = frameData.width - box.width;
						
						// Draw Red mask if entity is hit / Blue if entity is frozen
						if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_HIT) ||
							ECSManager.hasComponent(ent, ComponentType.COMPONENT_FROZEN) ||
							ECSManager.hasComponent(ent, ComponentType.COMPONENT_BURN))
						{
							this.entityCanvas.width = frameData.width;
							this.entityCanvas.height = frameData.height;
							var entityCanvasCtx = this.entityCanvas.getContext("2d");
						
							// Draw Entity
							entityCanvasCtx.drawImage
							(
								spriteSheet,
								frameData.sourceX,
								frameData.sourceY,
								frameData.width,
								frameData.height,
								0,
								0,
								frameData.width,
								frameData.height
							);
							
							entityCanvasCtx.globalCompositeOperation = "source-atop";
							
							if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_HIT))
								entityCanvasCtx.fillStyle = "rgba(255,0,0,0.6)";
							else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_FROZEN))
								entityCanvasCtx.fillStyle = "rgba(0,60,255,0.6)";
							else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_BURN))
								entityCanvasCtx.fillStyle = "rgba(255,136,0,0.6)";
								
							entityCanvasCtx.fillRect(0, 0, this.entityCanvas.width, this.entityCanvas.height);
							
							// Damage effect
							mapCanvasCtx.drawImage(this.entityCanvas, (position.x - offset) | 0, position.y | 0);
						}
						else
						{
							mapCanvasCtx.drawImage
							(
								spriteSheet,
								frameData.sourceX,
								frameData.sourceY,
								frameData.width,
								frameData.height,
								(position.x - offset) | 0,
								position.y | 0,
								frameData.width,
								frameData.height
							);
						}
					}
					
					mapCanvasCtx.restore();
				}
				else if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_MISSILE))		// Missiles
				{
					var missile = ECSManager.getComponent(ent, ComponentType.COMPONENT_MISSILE);
					var motion = ECSManager.getComponent(ent, ComponentType.COMPONENT_MOTION);
					var javImg = AssetsManager.images[missile.img];
					
					mapCanvasCtx.save();
					mapCanvasCtx.globalAlpha = display.alpha;
					mapCanvasCtx.translate(position.x, position.y);
					mapCanvasCtx.rotate(Math.atan2(motion.velocity.y, motion.velocity.x));
					mapCanvasCtx.translate(-(position.x), -(position.y));
				
					mapCanvasCtx.drawImage
					(
						javImg,
						0,
						0,
						box.width,
						box.height,
						(position.x - box.width) | 0,
						(position.y - box.height/2) | 0,
						box.width,
						box.height
					);
					
					mapCanvasCtx.restore();
				}
			}
		}
		
		// Draw Health Bars
		this.drawhealthBarFGs();
		
		// Draw on main Canvas
		drawingSurface.drawImage(mapComp.mapCanvas, -cameraPos.x, -cameraPos.y);
	},
	
	drawhealthBarFGs: function()
	{
		var mapComp = ECSManager.getComponent(this.map, ComponentType.COMPONENT_MAP);
		var mapCanvasCtx = mapComp.mapCanvas.getContext('2d');
		
		var cameraPos = ECSManager.getComponent(this.camera, ComponentType.COMPONENT_POSITION).position;
		var cameraBox = ECSManager.getComponent(this.camera, ComponentType.COMPONENT_BOX);
				
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			var ent = ECSManager.entities[i];
			
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_POSITION) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_BOX) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_DISPLAY) &&
				ECSManager.hasComponent(ent, ComponentType.COMPONENT_GAMEENTITY) &&
				!ECSManager.hasComponent(ent, ComponentType.COMPONENT_DEAD))
			{
				var entPos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var entBox = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
				var gameEntityComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_GAMEENTITY);
				
				// Camera Clipping
				if ((entPos.x + entBox.width) < cameraPos.x || (entPos.y + entBox.height) < cameraPos.y ||
					entPos.x > cameraPos.x + cameraBox.width || entPos.y > cameraPos.y + cameraBox.height)
				{
					continue;
				}
				
				if (gameEntityComp.health > 0)
				{
					mapCanvasCtx.drawImage(this.healthBarBG, 
										   (entPos.x + (entBox.width/2) - 16) | 0, 
										   entPos.y - 5);
										   
					mapCanvasCtx.drawImage(this.healthBarFG, 
										   0, 
										   0,
										   this.healthBarFG.width,
										   this.healthBarFG.height,
										   (entPos.x + (entBox.width/2) - 16) | 0, 
										   entPos.y - 5,
										   gameEntityComp.health * this.healthBarFG.width / gameEntityComp.maxHealth,
										   this.healthBarFG.height);
				}
			}
		}
	},
	
	isRedCross: function(ent)
	{
		return 	ECSManager.hasComponent(ent, ComponentType.COMPONENT_REDCROSS);
	},
	
	handleRedCross: function(ent, mapCanvasCtx, dt)
	{
		var position = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
		var box = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
		var redCrossComp = ECSManager.getComponent(ent, ComponentType.COMPONENT_REDCROSS);
			
		mapCanvasCtx.save();
		switch(redCrossComp.state)
		{
			case "enter":
				if (redCrossComp.timer >= redCrossComp.time)
				{
					redCrossComp.state = "stop";
					redCrossComp.timer = 0;
				}
				else
				{
					mapCanvasCtx.globalAlpha = redCrossComp.timer / redCrossComp.time;
					if (mapCanvasCtx.globalAlpha > 1) 
						mapCanvasCtx.globalAlpha = 1;
						
					/*mapCanvasCtx.scale(redCrossComp.timer / redCrossComp.time,
									   redCrossComp.timer / redCrossComp.time);*/
					
					redCrossComp.timer += dt;
				}
				break;
				
			case "stop":
				if (redCrossComp.timer >= redCrossComp.time)
				{
					redCrossComp.state = "exit";
					redCrossComp.timer = 0;
				}
				else
				{
					redCrossComp.timer += dt;
				}
				break;
			
			case "exit":
				if (redCrossComp.timer >= redCrossComp.time)
				{
					ECSManager.removeEntity(ent);
					return;
				}
				else
				{
					mapCanvasCtx.globalAlpha = (redCrossComp.time-redCrossComp.timer) / redCrossComp.time;
					/*mapCanvasCtx.scale((1-redCrossComp.timer) / redCrossComp.time,
									   (1-redCrossComp.timer) / redCrossComp.time);*/
					
					
					redCrossComp.timer += dt;
				}
				break;
		}
		
		// Draw
		mapCanvasCtx.drawImage
		(
			AssetsManager.images["red_cross"],
			0,
			0,
			32,
			16,
			(position.x - box.width/2) | 0,
			(position.y - box.height/2) | 0,
			32,
			16
		);
		mapCanvasCtx.restore();
	},
};