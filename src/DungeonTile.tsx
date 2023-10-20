import {useMemo} from 'react';

type DungeonTileProps = {
  x: number;
  y: number;
  size: number;
  children?: React.ReactNode;
  color: string;
}

export default function DungeonTile(props: DungeonTileProps) {
  const tileStyle = useMemo( () => {
    console.log(props);
    return {
      width: props.size,
      height: props.size,
      gridArea: `${props.y + 1} / ${props.x + 1}`,
      backgroundSize: 'cover',
      backgroundColor: props.color,
    }
  }, [props.size, props.x, props.y, props.color]);

  return (
    <div
      className="bg-white rounded-md shadow-md p-4 border border-gray-300"
      style={tileStyle}
    >
      {props.children}
    </div>
  );
}
