// Image Button
var ImageButton =
{
	x: 0,
	y: 0,
	image: null,
	imageSelected: null,
	width: 0,
	height: 0,
	selected: false,
	clicked: false,
	visible: false,
	alpha: 1,
	
	// N.B. default alignment: center
	init: function(x, y, width, height, image, imageSelected, visible)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.image = image;
		this.imageSelected = imageSelected;
		this.visible = visible;
		
	},
	
	update: function(dt)
	{
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
				this.selected = true;
			}
		}
		else
		{
			if (this.clicked)
				this.clicked = false;
				
			if (this.selected)
				this.clicked = true;
				
			this.selected = false;
		}	
	},
	
	draw: function()
	{
		if (!this.visible)
			return;
		
		// Set alpha
		drawingSurface.globalAlpha = this.alpha;
		
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
	}
}


