interface ActivityPageProps {
  header?: string;
  phase?: string;
  phaseColor?: string;
  text?: JSX.Element;
  activity?: JSX.Element;
  centerContent?: boolean;
}

function ActivityPageLayout({
  header,
  phase,
  phaseColor,
  text,
  activity,
  centerContent = false,
}: ActivityPageProps) {
  return (
    <div className="relative min-h-screen flex justify-center px-4">
      <div
        className={`max-w-4xl w-full py-8 ${
          centerContent
            ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            : 'm-2'
        }`}
      >
        {header && (
          <h1
            className="text-4xl font-bold text-primary"
            style={{ fontFamily: 'Roboto Slab' }}
          >
            {header}
          </h1>
        )}

        {phase && (
          <div
            className={`text-md font-regular ${phaseColor}`}
            style={{ fontFamily: 'Roboto Slab' }}
          >
            {phase}
          </div>
        )}

        {text && (
          <p
            className="mt-4 text-md text-primary font-light"
            style={{ fontFamily: 'Roboto Slab' }}
          >
            {text}
          </p>
        )}

        <div className="flex flex-wrap justify-center space-x-4 mt-4">
          {activity}
        </div>
      </div>
    </div>
  );
}

export default ActivityPageLayout;
