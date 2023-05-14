type Props = {
  text: string;
  color?: string;
};

function Red({ text, color = "red" }: Props) {
  return (
    <div
      style={{
        backgroundColor: color,
        color: "white",
      }}
      className="p-4 m-4"
    >
      {text}
    </div>
  );
}

export default Red;
