
interface BackgroundProps {
  defaultImage: string;
  currentImage: string;
  opacity: number;
}

const Background = ({ defaultImage, currentImage, opacity }: BackgroundProps) => {
  return (
    <div className="absolute inset-0 md:fixed overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${defaultImage})`,
          opacity: opacity === 0 ? 1 : 0,
          transition: 'opacity 0.7s ease-in',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentImage})`,
          opacity: opacity,
          transition: 'opacity 0.7s ease-in',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
    </div>
  );
};

export default Background;
