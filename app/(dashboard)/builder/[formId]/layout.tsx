export default function Layout({ children }: { children: React.ReactNode }) {
	return (
      <div className="w-full flex flex-grow mx-auto px-2">
         {children}
      </div>);
}
