import ContentCard from '../components/ContentCard'; // Note the path change '../'

const sampleQuote = {
  text: "The journey of a thousand miles begins with a single step.",
  source: "Lao Tzu"
};

const ContentPage = () => {
  return (
    // This container div will center the card on its specific page
    <div className="w-full flex-grow flex items-center justify-center p-4">
      <ContentCard 
        text={sampleQuote.text} 
        source={sampleQuote.source} 
      />
    </div>
  );
};

export default ContentPage;