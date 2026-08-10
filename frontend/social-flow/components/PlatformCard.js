import Link from 'next/link';

export default function PlatformCard({ name, icon: Icon, href, color }) {
  const colorClasses = {
    purple: 'from-purple-600 to-pink-600',
    black: 'from-gray-900 to-gray-700',
    blue: 'from-blue-600 to-blue-700',
    red: 'from-red-600 to-red-700',
    sky: 'from-sky-500 to-blue-600',
    rose: 'from-rose-500 to-pink-600'
  };

  return (
    <Link href={href}>
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer group">
        <div className={`bg-gradient-to-r ${colorClasses[color]} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
          <Icon className="text-white" size={32} />
        </div>
        <h3 className="font-semibold text-xl group-hover:text-indigo-600 transition">{name}</h3>
      </div>
    </Link>
  );
}