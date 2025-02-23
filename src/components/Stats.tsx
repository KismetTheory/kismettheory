
const stats = [
  { label: "Grand Slams", value: "22" },
  { label: "Career Titles", value: "92" },
  { label: "Match Wins", value: "1068" },
  { label: "Win Rate", value: "83%" },
];

const Stats = () => {
  return (
    <div className="py-24 bg-muted">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-serif text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
