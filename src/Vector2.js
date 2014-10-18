// Vector2
var Vector2 =
{
	x: 0,
	y: 0,
	
	// Set Values
	set: function(x,y)
	{
		this.x = x;
		this.y = y;
	},
	
	// Length
	length: function()
	{
		return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
	},
	
	// Normalize
	normalize: function()
	{
		var length = this.length();
		if (length === 0)
			return;
			
		this.x /= length;
		this.y /= length;
	},
	
	// Vector Operations
	addVector: function(v)
	{
		this.x += v.x;
		this.y += v.y;
		return this;
	},
	
	subVector: function(v)
	{
		this.x -= v.x;
		this.y -= v.y;
		return this;
	},
	
	mulVector: function(v)
	{
		this.x *= v.x;
		this.y *= v.y;
		return this;
	},
	
	divVector: function(v)
	{
		this.x /= v.x;
		this.y /= v.y;
		return this;
	},
	
	// Scalar Operations
	addScalar: function(scalar)
	{
		this.x += scalar;
		this.y += scalar;
		return this;
	},
	
	subScalar: function(scalar)
	{
		this.x -= scalar;
		this.y -= scalar;
		return this;
	},
	
	mulScalar: function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	},
	
	divScalar: function(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		return this;
	},
	
	// Dot product
	dot: function(v)
	{
		return this.x * v.x + this.y * v.y;
	}
}