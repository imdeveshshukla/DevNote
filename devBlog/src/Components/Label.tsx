
interface LabelProps {
  htmlFor: string;
  children:string;
}

export function Label({ htmlFor, children }:LabelProps) {
  return (
    <label htmlFor={htmlFor} className="block text-gray-700 font-bold mb-2">
      {children}
    </label>
  );
};

