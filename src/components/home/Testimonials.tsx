import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 't1',
      name: 'Samantha Reed',
      location: 'Downtown City Centre',
      service: 'Water Pipe Leakage',
      rating: 5,
      comment: 'Woke up at 6:30 AM to a gushing pipe under the bathroom washbasin. Found Arun Kumar on QuickFix and he arrived in just 22 minutes with new brass fittings. Saved my apartment from flooding!',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'
    },
    {
      id: 't2',
      name: 'Kunal Singhania',
      location: 'Green Valley',
      service: 'Tyre Puncture Service',
      rating: 5,
      comment: 'Got a puncture on the highway ring road on the way to an urgent airport drop. QuickFix connected me to David Miller in 2 minutes. Quick roadside fix, transparent ₹180 charge. Superb platform!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
    },
    {
      id: 't3',
      name: 'Dr. Rebecca Holmes',
      location: 'Riverside Heights',
      service: 'Electrical Short Circuit',
      rating: 5,
      comment: 'Our entire kitchen circuit tripped with sparks behind the refrigerator. Vikram Singh arrived with a circuit tester, traced the melted neutral wire, and rewired it safely in under 40 minutes.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Thousands in Real Emergencies
          </h2>
          <p className="text-slate-600 text-sm">
            Hear from genuine customers who resolved critical problems with QuickFix professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:border-brand-200 transition-all flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-brand-200 absolute top-4 right-4" />

              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                    <CheckCircle className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500">{item.location}</p>
                  <span className="inline-block mt-0.5 px-1.5 py-0.2 text-[10px] bg-brand-100 text-brand-700 rounded font-medium">
                    {item.service}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
