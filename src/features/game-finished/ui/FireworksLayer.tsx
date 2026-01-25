import type { FireworkConfig } from '../model/fireworks';

interface FireworksLayerProps {
  items: FireworkConfig[];
}

const FireworkItem = ({ src, className, style }: FireworkConfig) => (
  <img
    src={src}
    className={className}
    style={style}
    alt="불꽃놀이 이펙트"
    aria-hidden="true"
  />
);

export const FireworksLayer = ({ items }: FireworksLayerProps) => {
  return (
    <>
      {items.map((item) => (
        <FireworkItem key={item.id} {...item} />
      ))}
    </>
  );
};
