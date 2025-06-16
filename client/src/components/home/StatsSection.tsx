const stats = [
  { number: "50,000+", label: "Properties Listed" },
  { number: "25,000+", label: "Happy Customers" },
  { number: "500+", label: "Real Estate Agents" },
  { number: "15+", label: "Years Experience" }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 