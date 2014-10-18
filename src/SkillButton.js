// Skill Button
var SkillButton =
{
	x: 0,
	y: 0,
	image: null,
	imageSelected: null,
	width: 0,
	height: 0,
	cooldownTimer: 0,
	cooldown: 0,			// Time needed to re-activate this button
	selected: false,
	clicked: false,
	visible: false,			// True if it's visible
	active: false,
	
	// N.B. default alignment: center
	init: function(x, y, width, height, image, imageSelected, cooldown, visible)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.image = image;
		this.imageSelected = imageSelected;
		this.cooldown = cooldown;
		this.visible = visible;
		
		this.active = true;
	},
	
	update: function(dt)
	{
		if (!this.active)
		{
			if (this.cooldownTimer >= this.cooldown)
			{
				this.active = true;
				this.cooldownTimer = 0;
			}
			else
			{
				this.cooldownTimer += dt;
				return;
			}
		}
			
		if (!this.visible)
		{
			this.selected = false;
			return;
		}
		
		// Mouse
		if (MOUSE_CLICKED)
		{
			if (MOUSE_X >= this.x &&
				MOUSE_X <= this.x + this.width &&
				MOUSE_Y >= this.y &&
				MOUSE_Y <= this.y + this.height)
			{
				MOUSE_CLICKED = false;
				this.selected = true;
			}
		}
		else if (TOUCH_TAP)
		{
			if (TOUCH_X >= this.x &&
				TOUCH_X <= this.x + this.width &&
				TOUCH_Y >= this.y &&
				TOUCH_Y <= this.y + this.height)
			{
				TOUCH_TAP = false;
				this.selected = true;
			}
		}
	},
	
	draw: function()
	{
		if (!this.visible)
			return;
		
		// Cooldown image
		if (!this.active)
		{
			drawingSurface.globalAlpha = 0.5;
			
			drawingSurface.drawImage
			(
				AssetsManager.images[this.image], 
				0, 0, 
				this.width, this.height,
				Math.floor(this.x), Math.floor(this.y), 
				this.width, this.height
			);
			
			drawingSurface.globalAlpha = 1;
			
			var currWidth = this.width * this.cooldownTimer / this.cooldown;
			if (currWidth > this.width)
				currWidth = this.width;
				
			drawingSurface.drawImage
			(
				AssetsManager.images[this.image], 
				0, 0, 
				currWidth, this.height,
				Math.floor(this.x), Math.floor(this.y), 
				currWidth, this.height
			);
			
			return;
		}
		
		// Draw image 
		if (!this.selected)
		{
			if (this.image)
			{
				drawingSurface.drawImage
				(
					AssetsManager.images[this.image], 
					0, 0, 
					this.width, this.height,
					Math.floor(this.x), Math.floor(this.y), 
					this.width, this.height
				); 
			}
		}
		else
		{
			if (this.imageSelected)
			{
				drawingSurface.drawImage
				(
					AssetsManager.images[this.imageSelected], 
					0, 0, 
					this.width, this.height,
					Math.floor(this.x), Math.floor(this.y), 
					this.width, this.height
				); 
			}
		}
		
		drawingSurface.globalAlpha = 1;
	}
}


