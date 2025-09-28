// Using TypeScript to define the "shape" of the data our component expects.
// This is called defining the component's "props".
// The 'source' is optional, so we mark it with a '?'.
type ContentCardProps = {
  text: string;
  source?: string;
};

// Here is our component. It's a function that takes our props and returns JSX.
const ContentCard = ({ text, source }: ContentCardProps) => {
  return (
    // We use Tailwind classes directly in the JSX for styling.
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full min-h-[300px] flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      {/* Main content area for the text */}
      <p className="text-2xl font-light text-slate-700 leading-relaxed">
        {text}
      </p>

      {/* Source area. We only render this part if a 'source' prop is provided. */}
      {source && (
        <footer className="text-right text-slate-400 mt-6">— {source}</footer>
      )}
    </div>
  );
};

export default ContentCard;
