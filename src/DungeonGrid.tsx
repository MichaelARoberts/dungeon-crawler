import {useState, useEffect, useMemo} from 'react';
import DungeonTile, {Tile} from "./DungeonTile";
import './DungeonGrid.scss';
import chroma from "chroma-js";
// import {orderBy} from "lodash";


const DungeonGrid  : React.FC = () => {
  
  const rows : number = 16;
  const columns : number = 16;
  const maxTiles = 23;
  const size = 100;
  const [generatedTiles, setGeneratedTiles] = useState<Tile[]>();

  

  useEffect(() => {
    const tiles : Tile[] = [];
    const determinePossibleTilePlacement = (x: number, y: number) => {
      const directions = {
        right: [x + 1, y], // Right
        left: [x - 1, y], // Left
        up: [x, y - 1], // Up
        down: [x, y + 1], // Down
      }

      let determinedDirections: {[key: string]: number[]} = {};
 
      // is directions.right >  columns - 1? is directions.right in tiles?
      if (directions.right[0] <= columns - 1 && !tiles.some(tile => tile?.x === directions.right[0] && tile.y === directions.right[1])){
        determinedDirections = {...determinedDirections, right: directions.right};
      }

      // is directions.left < 0? is directions.left in tiles?
      if (directions.left[0] >= 0 && !tiles.some(tile => tile?.x === directions.left[0] && tile?.y === directions.left[1])){
        determinedDirections = {...determinedDirections, left: directions.left};
      }

      // is directions.up >  rows - 1? is directions.up in tiles?
      if (directions.down[1] <= rows - 1 && !tiles.some(tile => tile?.x === directions.down[0] && tile?.y === directions.down[1])){
        determinedDirections = {...determinedDirections, down: directions.down};
      }

      // is directions.down < 0? is directions.down in tiles?
      if (directions.up[1] >= 0 && !tiles.some(tile => tile?.x === directions.up[0] && tile?.y === directions.up[1])){
        determinedDirections = {...determinedDirections, up: directions.up};
      }

      // return a random  direction from the determinedDirections
      const keys = Object.keys(determinedDirections);
      const randomDirection = keys[Math.floor(Math.random() * keys.length)];
      
      const randomDirectionCoordinates = determinedDirections[randomDirection];


      return {x: randomDirectionCoordinates?.[0] || 0, y: randomDirectionCoordinates?.[1] || 0, direction: randomDirection};
    }

    const generateTiles = () => {
      const colorScale = chroma.scale(['#fafa6e','#2A4858'])
    .mode('lch').colors(maxTiles)

      let currentTile : Tile = {
        x: 0,
        y: 0,
      }

      // make the above a for loop
      for (let i = 0; i < maxTiles; i++){
        if(i !== 0){
          tiles.push(currentTile);
        } 
        
        currentTile = {
          ...currentTile,
          ...determinePossibleTilePlacement(currentTile.x, currentTile.y)
        }
        currentTile.index = i;
        currentTile.color = colorScale[i];
        currentTile.size = size;
        currentTile.borderStyle = {
          borderTop: 5,
          borderRight: 5,
          borderBottom: 5,
          borderLeft: 5,
        };

        if(currentTile === undefined){
          break;
        }
      }

      return tiles;
    }

    const _tiles = generateTiles();

    const styledTiles = _tiles?.map((tile, index) => {
      const nextTile = _tiles.find((tile) => tile.index === index + 1);
      tile.borderStyle = borderStyle(nextTile, tile);
      return tile;
    });

    setGeneratedTiles(styledTiles);
  }, [])

  const borderStyle = (nextTile: Tile | undefined, tile: Tile) => {
    const styles = {
      borderTop: 5,
      borderRight: 5,
      borderBottom: 5,
      borderLeft: 5,
    };
    
    if(tile.direction === 'up' || nextTile?.direction === 'down') {
      styles.borderBottom = 0;
    }

    if(tile.direction === 'down' || nextTile?.direction === 'up') {
      styles.borderTop = 0;
    }

    if(tile.direction === 'left' || nextTile?.direction === 'right') {
      styles.borderRight = 0;
    }

    if(tile.direction === 'right' || nextTile?.direction === 'left') {
      styles.borderLeft = 0;
    }
    return styles;
  }

  const tileElements = useMemo(() => {
    return generatedTiles?.map((tile) => {
                return (
                <DungeonTile tile={tile} key={tile.index}>
                  <div className="flex justify-center items-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{tile.index}</div>
                      <div className="text-sm">{tile.direction}</div>
                      <div className="text-sm">{tile.x} {tile.y}</div>
                    </div>
                  </div>
                </DungeonTile>
                );
              })
  }, [generatedTiles])


  return (
    <div className="dungeon-grid" style={{
      gridTemplateColumns: `repeat(${columns}, ${size}px)`,
      gridTemplateRows: `repeat(${rows}, ${size}px)`,
    }}>
        <div className="dungeon-background">
          <div className="dungeon-grid">
            {
              tileElements
            }
          </div>
        </div>
    </div>
  )
}

export default DungeonGrid;