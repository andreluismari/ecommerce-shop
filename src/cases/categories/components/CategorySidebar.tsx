import { useCategories } from "@/cases/categories/hooks/use-categories";

type Props = {
  selected: string | null;
  onSelect: (id: string | null) => void;
};

export function CategorySidebar({ selected, onSelect }: Props) {
  const { data: categories = [] } = useCategories();

  return (
    <aside className="w-64 border-r p-4">
      <h3 className="font-bold mb-4">Categorias</h3>

      <button
        className={`block mb-2 ${
          selected === null ? "font-bold" : ""
        }`}
        onClick={() => onSelect(null)}
      >
        Todas
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`block mb-2 ${
            selected === cat.id ? "font-bold" : ""
          }`}
          onClick={() => onSelect(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </aside>
  );
}
