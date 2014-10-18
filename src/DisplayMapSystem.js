// TileSet object
var TileSet =
{
	image: null,
	name: null,
	width: 0,
	height: 0,
	tileWidth: 0,
	tileHeight: 0,
	firstGid: 0,
	lastGid: 0
};

var Tile =
{
	gid: 0,
	entities: null		// Entities that it contains
};

// Display Map system
var DisplayMapSystem = 
{
	map: null,
	camera: null,
	
	init: function()
	{
		// Get the map
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_MAP))
			{
				this.map = ECSManager.getComponent(ECSManager.entities[i], ComponentType.COMPONENT_MAP);
			}
			
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_CAMERA))
			{
				this.camera = ECSManager.entities[i];
			}
		}
	},
	
	// Render Map
	update: function(dt)
	{
		var tiles = this.map.tiles;
		var tileSets = this.map.tileSets;
		
		// Update entities position for each tile
		this.updateEntitiesPosition();
		
		// Already drawn entities buffer
		var buffer = new Array();
		
		var cameraPos = ECSManager.getComponent(this.camera, ComponentType.COMPONENT_POSITION).position;
		var cameraBox = ECSManager.getComponent(this.camera, ComponentType.COMPONENT_BOX);
		
		// Visible tiles
		var topLeftX = Math.floor(cameraPos.x / this.map.tileSize);
		var topLeftY = Math.floor(cameraPos.y / this.map.tileSize);
		var bottomRightX = Math.floor((cameraPos.x + cameraBox.width) / this.map.tileSize) + 1;
		var bottomRightY = Math.floor((cameraPos.y + cameraBox.height) / this.map.tileSize) + 1;
		
		// Clamp
		topLeftX = Math.min(Math.max(topLeftX, 0), this.map.tiles.length);
		topLeftY = Math.min(Math.max(topLeftY, 0), this.map.tiles[0].length);
		bottomRightX = Math.min(Math.max(bottomRightX, 0), this.map.tiles.length);
		bottomRightY = Math.min(Math.max(bottomRightY, 0), this.map.tiles[0].length);
		
		// Draw all tiles
		for (var col = topLeftX; col < bottomRightX; col++)
		{
			for (var row = topLeftY; row < bottomRightY; row++)
			{
				var tileGid = tiles[col][row].gid;
				
				// Check the TileSet
				for (var tileSet = 0; tileSet < tileSets.length; tileSet++)
				{
					var ts = tileSets[tileSet];
					
					// If this is not the right tileset..
					if (tileGid < ts.firstGid || 
						tileGid > ts.lastGid)
					{
						continue;
					}
					
					// If this is the right tileset draw the tile
					tileGid -= ts.firstGid - 1;
					var tileAmountX = ts.width / ts.tileWidth;
					var tileAmountY = ts.height / ts.tileHeight;
					var srcY = (Math.ceil(tileGid / tileAmountX) - 1) * ts.tileHeight;
					var srcX = ((tileGid - 1) % tileAmountX) * ts.tileWidth;
					
					var dstX = Math.ceil(col * ts.tileWidth);
					var dstY = Math.ceil(row * ts.tileHeight);
					
					this.map.mapCanvas.getContext('2d').drawImage
					(
						ts.image,
						srcX,
						srcY,
						ts.tileWidth,
						ts.tileHeight,
						dstX,
						dstY,
						ts.tileWidth,
						ts.tileHeight
					);
				}
			}
		}
		
		// Draw on main Canvas
		//drawingSurface.drawImage(this.map.mapCanvas, -cameraPos.x, -cameraPos.y);
	},
	
	updateEntitiesPosition: function()
	{
		// Refresh entities array in each tile
		for (var col = 0; col < this.map.tiles.length; col++)
		{
			for (var row = 0; row < this.map.tiles[col].length; row++)
			{
				this.map.tiles[col][row].entities = new Array();
			}
		}
		
		// For each entity, find the tiles that they are occupying
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			var ent = ECSManager.entities[i];
			
			if (ECSManager.hasComponent(ent, ComponentType.COMPONENT_GAMEENTITY))
			{
				var entPos = ECSManager.getComponent(ent, ComponentType.COMPONENT_POSITION).position;
				var entBox = ECSManager.getComponent(ent, ComponentType.COMPONENT_BOX);
				
				// Top-Left Corner
				var tlCol = Math.floor(entPos.y / this.map.tileSize);
				var tlRow = Math.floor(entPos.x / this.map.tileSize);

				// Bottom-Right Corner
				var brCol = Math.floor((entPos.y + entBox.height) / this.map.tileSize);
				var brRow = Math.floor((entPos.x + entBox.width) / this.map.tileSize);
				
				// Clamp
				tlRow = Math.min(Math.max(tlRow, 0), this.map.tiles.length-1);
				tlCol = Math.min(Math.max(tlCol, 0), this.map.tiles[0].length-1);
				brRow = Math.min(Math.max(brRow, 0), this.map.tiles.length-1);
				brCol = Math.min(Math.max(brCol, 0), this.map.tiles[0].length-1);
		
				for (var col = tlRow; col <= brRow; col++)
				{
					for (var row = tlCol; row <= brCol; row++)
					{
						this.map.tiles[col][row].entities.push(ent);
					}
				}
			}
		}
	}
};