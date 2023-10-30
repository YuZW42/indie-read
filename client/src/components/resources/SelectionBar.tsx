
interface SelectionBarProps {
  selectedCategory: string;
  handleCategoryClick: (category: string) => void;
}

const SelectionBar: React.FC<SelectionBarProps> = ({ selectedCategory, handleCategoryClick }) => {
  const resourcesTag = ['All', 'Bookmaking', 'Library', 'Workshop', 'Letterpress', 'RISO', 'Zine'];

  return (
    <div className="selection-bar">
      {resourcesTag.map((tag, index) => (
        <button
          key={index}
          className={selectedCategory === tag ? 'selected' : ''}
          onClick={() => handleCategoryClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default SelectionBar;
