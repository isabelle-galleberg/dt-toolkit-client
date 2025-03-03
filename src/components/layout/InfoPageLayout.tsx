interface InfoPageProps {
  header: string;
  text: string;
  headerColor?: string;
}

function InfoPage({
  header,
  text,
  headerColor = 'text-primary',
}: InfoPageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center py-8 max-w-2xl w-full">
        <h1
          className={`text-4xl font-bold ${headerColor}`}
          style={{ fontFamily: 'Roboto Slab' }}
        >
          {header}
        </h1>

        <p
          className="mt-8 text-md text-primary font-light"
          style={{ fontFamily: 'Roboto Slab' }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default InfoPage;
