
import { Link } from "react-router-dom";

interface PanelProps {
  title: string;
  subtitle: string;
  image: string;
  path?: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Panel = ({ title, subtitle, image, path, onMouseEnter, onMouseLeave }: PanelProps) => {
  const content = (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative h-full flex flex-col justify-end p-8 text-white">
        <div className="transition-transform duration-300 transform group-hover:-translate-y-[50px] min-h-[120px] flex flex-col items-start">
          <div className="mt-auto">
            <h2 className="text-2xl font-bold mb-2 break-words">{title}</h2>
            <p className="text-sm opacity-80">{subtitle}</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <article
      className="relative group cursor-pointer border-b md:border-b-0 md:border-r border-white/20 last:border-b-0 md:last:border-r-0 flex-shrink-0 h-[calc(100vh-4rem)] md:h-screen w-full md:w-[calc((100vw-120px)/5)]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={onMouseLeave}
      tabIndex={0}
      role="button"
      aria-label={`${title} - ${subtitle}`}
    >
      {path ? (
        <Link to={path} className="block h-full">
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
};

export default Panel;
