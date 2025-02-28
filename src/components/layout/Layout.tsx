interface LayoutProps {
  leftContent?: React.ReactNode;
  topContentTitle?: string;
  topContentText?: string;
  middleContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

function Layout({
  leftContent,
  topContentTitle,
  topContentText,
  middleContent,
  bottomContent,
  rightContent,
}: LayoutProps) {
  return (
    <div className="flex items-start grid grid-cols-[1fr_3fr_1fr] p-4">
      {/* <div className="mt-20 flex-1 items-start grid grid-cols-[1fr_4fr_1fr] p-4 h-[calc(100vh-4rem)]"> */}
      {/* Left Column */}
      <div className="mt-16 rounded-xl flex justify-center">{leftContent}</div>
      {/* Center Column */}
      <div className="rounded-xl flex flex-col space-y-2">
        {/* Top Section */}
        <div className="flex flex-col bg-base-200 rounded-xl space-y-1 p-3 border border-1">
          <p className="font-bold">{topContentTitle}</p>
          <p>{topContentText}</p>
        </div>
        {/* Middle Section */}
        <div className="rounded-xl py-4">{middleContent}</div>
        {/* Bottom Section */}
        <div className="rounded-xl flex justify-center">{bottomContent}</div>
      </div>
      {/* Right Column */}
      <div className="mt-16 rounded-xl flex justify-center">{rightContent}</div>

      {/* Footer */}
      <div className="mb-24 w-full"></div>
    </div>
  );
}

export default Layout;
