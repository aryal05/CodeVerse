export const metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950">
      {children}
    </div>
  );
}
