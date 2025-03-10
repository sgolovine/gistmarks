interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="h-[32px] w-full flex flex-row items-center pb-4">
        <div className="grow flex items-center px-4 sm:px-0">
          <p className="font-bold">Bookmarks</p>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 py-1 px-2 text-sm rounded drop-shadow text-gray-200 font-bold">
          New Bookmark
        </button>
      </div>

      {children}
    </div>
  );
};

export default Layout;
