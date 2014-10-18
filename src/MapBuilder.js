// Parse map data from tiled
var MapBuilder =
{
	loadTileSets: function(mapData)
	{
		var tileSets = new Array();	// Init Tilesets array
		var data = mapData.tilesets;
		
		for (var i = 0; i < data.length; i++)
		{
			var tileSet = Object.create(TileSet);
			
			// Load image
			tileSet.image = new Image();
			tileSet.image.src = data[i].image;
			
			// Properties
			tileSet.name = data[i].name;
			tileSet.width = data[i].imagewidth;
			tileSet.height = data[i].imageheight;
			tileSet.firstGid = data[i].firstgid;
			tileSet.tileWidth = data[i].tilewidth;
			tileSet.tileHeight = data[i].tileheight;
			
			// Calculate lastGid
			tileSet.lastGid = tileSet.firstGid + (data[i].imagewidth / data[i].tilewidth) * (data[i].imageheight / data[i].tileheight) - 1;
			
			// Add TileSet
			tileSets.push(tileSet);
		}
		
		return tileSets;
	},
	
	loadTiles: function(mapData)
	{
		var data = mapData.layers;
		var mapWidth = mapData.width;
		var mapHeight = mapData.height;
		
		// Initialize 2D Array
		tiles = new Array(mapWidth);
		for (var i = 0; i < mapHeight; i++)
		{
			tiles[i] = new Array(mapHeight);
		}
		
		var tilesArray = new Array(mapWidth * mapHeight);
		for (var i = 0; i < data.length; i++)	// Layers
		{
			var layer = data[i];
			var tileCount = 0;
			
			if (layer.name === 'background')
			{
				for (var j = 0; j < layer.data.length; j++)	// Tiles
				{
					var gid = layer.data[j];
					
					if (gid > 0)
					{
						tilesArray[tileCount] = gid;
					}
					
					tileCount++;
				}
			}
		}
		
		// Copy tiles data into 2D array
		for (var tileX = 0; tileX < mapWidth; tileX++)
		{
			tiles[tileX] = new Array(mapHeight);
			
			for (var tileY = 0; tileY < mapHeight; tileY++)
			{
				tiles[tileX][tileY] = Object.create(Tile);	// Check "DisplayMapSystem.js" for "Tile" object
				tiles[tileX][tileY].gid = tilesArray[(tileX + (tileY * mapWidth))];
				tiles[tileX][tileY].entities = new Array(); // Entities that this tile contains
			}
		}
		
		return tiles;
	}
}