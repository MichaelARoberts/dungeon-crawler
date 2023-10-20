import {useState, useMemo, useEffect} from 'react';
import DungeonTile from "./DungeonTile";
import './DungeonGrid.scss';
import chroma from "chroma-js";

const DungeonGrid  : React.FC = () => {
  const startTile = {x: 0, y: 0};
  const rows : number = 16;
  const columns : number = 16;
  const maxTiles = 23;
  const [generatedTiles, setGeneratedTiles] = useState<{x: number, y:number}[]>();

  const colorScale = chroma.scale(['#fafa6e','#2A4858'])
    .mode('lch').colors(maxTiles)

  useEffect(() => {
    const tiles : {x: number, y:number}[] = []
    const determinePossibleTilePlacement = (x: number, y: number) => {
      const directions = {
        right: [x + 1, y], // Right
        left: [x - 1, y], // Left
        up: [x, y + 1], // Up
        down: [x, y - 1], // Down
      }

      let determinedDirections: {[key: string]: number[]} = {};

      // is directions.right >  columns - 1? is directions.right in tiles?
      if (directions.right[0] <= columns - 1 && !tiles.some(tile => tile.x === directions.right[0] && tile.y === directions.right[1])){
        determinedDirections = {...determinedDirections, right: directions.right};
      }

      // is directions.left < 0? is directions.left in tiles?
      if (directions.left[0] >= 0 && !tiles.some(tile => tile.x === directions.left[0] && tile.y === directions.left[1])){
        determinedDirections = {...determinedDirections, left: directions.left};
      }

      // is directions.up >  rows - 1? is directions.up in tiles?
      if (directions.up[1] <= rows - 1 && !tiles.some(tile => tile.x === directions.up[0] && tile.y === directions.up[1])){
        determinedDirections = {...determinedDirections, up: directions.up};
      }

      // is directions.down < 0? is directions.down in tiles?
      if (directions.down[1] >= 0 && !tiles.some(tile => tile.x === directions.down[0] && tile.y === directions.down[1])){
        determinedDirections = {...determinedDirections, down: directions.down};
      }

      // return a random  direction from the determinedDirections
      const keys = Object.keys(determinedDirections);
      const randomDirection = keys[Math.floor(Math.random() * keys.length)];
      
      const randomDirectionCoordinates = determinedDirections[randomDirection];

      if(randomDirectionCoordinates === undefined){
        return undefined;
      }
      return {x: randomDirectionCoordinates[0], y: randomDirectionCoordinates[1]};
    }

    const generateTiles = () => {
      let currentTile : {x: number, y:number}|undefined = startTile;
      let i = 0;
      while (i < maxTiles){
        tiles.push(currentTile);
        currentTile = determinePossibleTilePlacement(currentTile.x, currentTile.y);

        if(currentTile === undefined){
          break;
        }
        i++;
      }
      return tiles;
    }

    const _tiles = generateTiles();
    setGeneratedTiles(_tiles);
  }, [])

  const dungeonTiles = useMemo(() => {
    return (generatedTiles || []).map((tile, index) => {
      return <DungeonTile x={tile.x} y={tile.y} size={100} color={colorScale[index]} key={index}> {index} </DungeonTile>
    })
  }, [generatedTiles, colorScale])

  return (
    <div className="dungeon-grid">
        <div className="dungeon-background">
          <div className="dungeon-grid">
            {dungeonTiles}
          </div>
        </div>
    </div>
  )
}

export default DungeonGrid;