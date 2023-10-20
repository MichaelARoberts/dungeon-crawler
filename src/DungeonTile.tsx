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
      // backgroundImage: 'url("https://images.unsplash.com/photo-1637325258040-d2f09636ecf6?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1335")',
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
