
import { ArrowRight } from "lucide-react";

const News = () => {
  const news = [
    {
      date: "March 15, 2024",
      title: "Preparation for the Clay Court Season",
      excerpt: "Training intensifies as the upcoming tournament season approaches...",
    },
    {
      date: "March 10, 2024",
      title: "New Partnership Announcement",
      excerpt: "Exciting collaboration with leading sports technology company...",
    },
    {
      date: "March 5, 2024",
      title: "Community Youth Program Launch",
      excerpt: "Introducing a new initiative to support young athletes...",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-serif mb-4">Latest News</h2>
          <div className="w-20 h-1 bg-accent" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <article
              key={item.title}
              className="group cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 text-sm text-muted-foreground">
                {item.date}
              </div>
              <h3 className="text-xl font-serif mb-2 group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground mb-4">{item.excerpt}</p>
              <div className="flex items-center text-accent">
                Read More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
