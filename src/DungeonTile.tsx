import {useMemo} from 'react';

export type Tile = {
    x: number;
    y: number;
    direction?: string;
    nextTile?: Tile | undefined;
    color?: string;
    index?: number;
    borderStyle?: {
      borderTop: number;
      borderRight: number;
      borderBottom: number;
      borderLeft: number;
    }
    size?: number;
  };

type DungeonTileProps = {
  tile: Tile,
  children: React.ReactNode
}

export default function DungeonTile(props: DungeonTileProps) {

  const tileStyle = useMemo( () => {
    return {
      width: props.tile?.size,
      height: props.tile?.size,
      gridArea: `${props.tile.y + 1} / ${props.tile.x + 1}`,
      backgroundSize: 'cover',
      backgroundColor: props.tile?.color,
      borderBottomWidth: props.tile?.borderStyle?.['borderBottom'] || 0,
      borderTopWidth: props.tile?.borderStyle?.['borderTop'] || 0,
      borderLeftWidth: props.tile?.borderStyle?.['borderLeft'] || 0,
      borderRightWidth: props.tile?.borderStyle?.['borderRight'] || 0,

    }
  }, [props.tile.borderStyle, props.tile.color, props.tile.size, props.tile.x, props.tile.y]);

  return (
    <div
      className={'bg-white p-4 dungeon-tile'}
      style={tileStyle}
    >
      {props.children}
    </div>
  );
}
