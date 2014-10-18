// Utils
var Utils =
{
	// Returns true if two (rectangular) entities collide
	rectCollision: function(e1Pos, e2Pos, e1Box, e2Box)
	{
		return !(e2Pos.x > e1Pos.x + e1Box.width || 
				 e2Pos.x + e2Box.width < e1Pos.x || 
				 e2Pos.y > e1Pos.y + e1Box.height ||
				 e2Pos.y + e2Box.height < e1Pos.y);
	},
	
	recContainsPoint: function(entPos, entBox, pointPos)
	{
		return pointPos.x >= entPos.x &&
			   pointPos.y >= entPos.y &&
			   pointPos.x <= entPos.x + entBox.width &&
			   pointPos.y <= entPos.y + entBox.height;
	}
}