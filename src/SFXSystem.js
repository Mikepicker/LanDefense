// SFX System
var SFXSystem =
{
	canvasStartingLeft: null,
	canvasStartingTop: null,
	
	// Game State
	gameState: null,
	
	// Shake Screen data
	shakeEnabled: false,
	shakeIntensity: 0,
	shakeTime: 0,
	shakeTimer: 0,
	
	// Color Mask
	colorMaskEnabled: false,
	colorMask: null,	// "rgb(r,g,b)"
	colorMaskTimer: 0,
	colorMaskTime: 0,
	
	// Fade Out
	fadeOutEnabled: false,
	fadeOutComplete: false,
	fadeOutTimer: 0,
	fadeOutTime: 0,
	
	init: function() 
	{
		SFXSystem.canvasStartingLeft = canvas.style.left;
		SFXSystem.canvasStartingTop = canvas.style.top;
		
		// Get game state
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
			
		if (SFXSystem.shakeEnabled)
			this.updateShakeScreen(dt);
			
		if (SFXSystem.shockEnabled)
			this.updateShockScreen(dt);
			
		if (SFXSystem.colorMaskEnabled)
			this.updateColorMask(dt);
			
		if (SFXSystem.fadeOutEnabled)
			this.updateFadeOut(dt);
	},
	
	updateShakeScreen: function(dt)
	{
		if (SFXSystem.shakeTimer >= SFXSystem.shakeTime)
		{
			SFXSystem.shakeEnabled = false;
			SFXSystem.shakeTimer = 0;
			SFXSystem.shakeTime = 0;
			canvas.style.left = SFXSystem.canvasStartingLeft;
			canvas.style.top = SFXSystem.canvasStartingTop;
		}
		else
		{
			// Update Shaking
			var randX = (Math.floor((Math.random() * 1) - 1)) * Math.floor(Math.random() * SFXSystem.shakeIntensity);
			var randY = (Math.floor((Math.random() * 1) - 1)) * Math.floor(Math.random() * SFXSystem.shakeIntensity);
			
			canvas.style.left = canvasPosX + randX + "px";
			canvas.style.top = canvasPosY + randY + "px";
			
			SFXSystem.shakeTimer += dt;
		}
	},
	
	shakeScreen: function(time, intensity)
	{
		SFXSystem.shakeEnabled = true;
		SFXSystem.shakeTime = time;
		SFXSystem.shakeIntensity = intensity;
	},
	
	updateColorMask: function(dt)
	{
		if (SFXSystem.colorMaskTimer >= SFXSystem.colorMaskTime)
		{
			SFXSystem.colorMaskEnabled = false;
			SFXSystem.colorMaskTimer = 0;
			SFXSystem.colorMaskTime = 0;
		}
		else
		{
			drawingSurface.save();
			drawingSurface.fillStyle = SFXSystem.colorMask;
			
			if (SFXSystem.colorMaskTimer <= 1000)	// Fade in
			{
				drawingSurface.globalAlpha = (SFXSystem.colorMaskTimer/1000)/2;
			}
			else if (SFXSystem.colorMaskTimer > SFXSystem.colorMaskTime - 1000) // Fade out
			{
				drawingSurface.globalAlpha = ((SFXSystem.colorMaskTime - SFXSystem.colorMaskTimer) / 1000)/2;
				
				if (drawingSurface.globalAlpha < 0)
					drawingSurface.globalAlpha = 0;
			}
			else
			{
				drawingSurface.globalAlpha = 0.5;
			}
			
			drawingSurface.fillRect(0,0,WIDTH,HEIGHT);
			drawingSurface.restore();
			
			SFXSystem.colorMaskTimer += dt;
		}
	},
	
	enableColorMask: function(rgbColor, time)
	{
		SFXSystem.colorMaskEnabled = true;
		SFXSystem.colorMask = rgbColor;	// "rgb(r,g,b)"
		SFXSystem.colorMaskTime = time;
	},
	
	updateFadeOut: function(dt)
	{
		if (SFXSystem.fadeOutTimer >= SFXSystem.fadeOutTime)
			SFXSystem.fadeOutComplete = true;
			
		drawingSurface.save();
		drawingSurface.fillStyle = "black";
		
		drawingSurface.globalAlpha = SFXSystem.fadeOutTimer / SFXSystem.fadeOutTime;
		
		if (drawingSurface.globalAlpha >= 1)
			drawingSurface.globalAlpha = 1;
			
		drawingSurface.fillRect(0,0,WIDTH,HEIGHT);
		drawingSurface.restore();
		
		SFXSystem.fadeOutTimer += dt;
	},
	
	enableFadeOut: function(time)
	{
		SFXSystem.fadeOutEnabled = true;
		SFXSystem.fadeOutTime = time;
	},
	
	reset: function()
	{
		SFXSystem.shakeEnabled = false;
		SFXSystem.shakeIntensity = 0;
		SFXSystem.shakeTime = 0;
		SFXSystem.shakeTimer = 0;
		SFXSystem.colorMaskEnabled = false;
		SFXSystem.colorMask = null;
		SFXSystem.colorMaskTime = 0;
		SFXSystem.colorMaskTimer = 0;
		SFXSystem.fadeOutEnabled = false;
		SFXSystem.fadeOutComplete = false;
		SFXSystem.fadeOutTime = 0;
		SFXSystem.fadeOutTimer = 0;
	}
}