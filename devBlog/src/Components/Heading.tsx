interface props{
    level:string,
    children:string
}

const Heading = ({ level, children }:props) => {
  // Define the heading level tag based on the 'level' prop
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className="text-2xl font-bold text-gray-950 mb-4 text-center">
      {children}
    </HeadingTag>
  );
};

export default Heading;
